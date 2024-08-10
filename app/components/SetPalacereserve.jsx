"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import Image from "next/image";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function SetPalaceReserve() {
  const [screenDate, setScreenDate] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [value, setValue] = useState("Seleccionar opción");
  const [hours, setHours] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [eventContent, setEventContent] = useState(false);
  const [events, setEvents] = useState([]);
  const [dateInfo, setDateInfo] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [occupiedHours, setOccupiedHours] = useState([]);
  const [date, setDate] = useState(null);
  const [hoveredHour, setHoveredHour] = useState(null);
  const [calendarId, setCalendarId] = useState(false);
  const [creating, setCreating] = useState(false);
  const [isCalendarReady, setIsCalendarReady] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("");

  useEffect(() => {
    if (calendarId) {
      fetchDayStatus();
    }
  }, [calendarId]);

  const idCalendarSetPalace = process.env.CALENDAR_ID_SET_PALACE;

  const handleCalendarId = async () => {
    setCalendarId(idCalendarSetPalace);
  };

  // Maneja los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "eventType":
        setEventType(value);
        break;
      default:
        break;
    }
  };

  const fetchDayStatus = async () => {
    const params = new URLSearchParams({
      calendarId,
    });
    try {
      const response = await fetch(`/api/events?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error fetching day status");
      const events = await response.json();
      setEvents(events);
      processEvents(events);
    } catch (error) {
      console.error("Failed to fetch day status:", error);
    } finally {
      setIsCalendarReady(true);
    }
  };

  function processEvents(events) {
    const dateInfo = {};

    events.forEach((event) => {
      const date = event.start.dateTime.split("T")[0];

      if (!dateInfo[date]) {
        dateInfo[date] = {
          occupiedHours: new Set(),
          totalEvents: 0,
          fullyOccupied: false,
        };
      }

      const startHour = new Date(event.start.dateTime).getHours();
      const endHour = new Date(event.end.dateTime).getHours();

      for (let hour = startHour; hour < endHour; hour++) {
        dateInfo[date].occupiedHours.add(hour);
      }

      dateInfo[date].totalEvents++;
    });

    Object.keys(dateInfo).forEach((date) => {
      const occupiedHours = dateInfo[date].occupiedHours;
      const requiredHours = new Set(
        [...Array(22 - 8).keys()].map((h) => h + 8)
      );
      dateInfo[date].fullyOccupied = [...requiredHours].every((hour) =>
        occupiedHours.has(hour)
      );
    });

    setDateInfo(dateInfo);
  }

  function tileClassName({ date, view }) {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const today = new Date().toISOString().split("T")[0];

      if (dateString < today) {
        return "past-day";
      }

      if (dateInfo[dateString]) {
        if (dateInfo[dateString].fullyOccupied) {
          return "completely-occupied";
        } else if (dateInfo[dateString].totalEvents > 0) {
          return "partially-occupied";
        }
      }
    }

    return "completely-free";
  }

  const tileDisabled = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    const today = new Date().toISOString().split("T")[0];

    return dateInfo[dateString]?.fullyOccupied || dateString < today;
  };

  const handleDateClick = (date) => {
    const dateString = format(date, "yyyy-MM-dd");
    setSelectedDate(date);
    setOccupiedHours(Array.from(dateInfo[dateString]?.occupiedHours || []));
    setDate(dateString);
  };

  const renderTimeButtons = () => {
    const buttons = [];

    for (let hour = 8; hour < 22; hour++) {
      const isHovered = start !== null && end === null && hour === hoveredHour;
      const isSelected =
        start !== null && end !== null && hour >= start && hour <= end;
      const isIntermediate = hour >= start && hour <= end;
      const isOccupied = occupiedHours.includes(hour);
      const isStart = hour === start; // Verifica si la hora es el inicio

      buttons.push(
        <button
          key={hour}
          disabled={isOccupied}
          onClick={() => handleClick(hour)}
          onMouseEnter={() => setHoveredHour(hour)}
          onMouseLeave={() => setHoveredHour(null)}
          className={`hourBoxBtn ${isStart ? "start" : ""} ${
            isSelected ? "selected" : ""
          } ${isIntermediate ? "intermediate" : ""} ${
            isHovered ? "hovered" : ""
          }`}
          style={{
            backgroundColor: isOccupied ? "#d3d3d3" : "",
            color: isSelected ? "#fff" : "",
          }}
        >
          {hour}:00
        </button>
      );
    }

    return buttons;
  };

  const formatToDate = (e) => {
    const formattedDate = format(e, "yyyy-MM-dd");
    const dateToScreen = format(e, "PPP", { locale: es });
    setDate(formattedDate);
    setScreenDate(dateToScreen);
  };

  const options = Array.from({ length: 11 }, (_, i) => `${i + 2}` + ` hs`);

  const handleSelect = (option) => {
    setIsOpen(!isOpen);
    setHours(option);
    setValue(option);
  };

  const handleClick = (hour) => {
    if (occupiedHours.includes(hour)) {
      return; // No permite hacer clic en horas ocupadas
    }

    if (start === null || (start !== null && end !== null)) {
      setStart(hour);
      setEnd(null);
    } else if (start === hour) {
      setStart(null);
      setEnd(null);
    } else if (hour < start) {
      setStart(hour);
    } else if (isValidSelection(start, hour)) {
      const selectedDuration = hour - start;
      const allowedDuration = parseInt(hours.split(" ")[0]);

      if (selectedDuration === allowedDuration) {
        setEnd(hour);
      } else {
        alert(`Debes seleccionar un rango de ${hours}`);
      }
    } else {
      // Si la selección no es válida, ajusta `start` para permitir nueva selección
      setStart(hour);
      setEnd(null);
    }

    // Colorea los botones inmediatamente
    if (start !== null && end === null) {
      setHoveredHour(hour);
    } else {
      setHoveredHour(null);
    }
  };

  const isValidSelection = (start, end) => {
    if (start === null || end === null) return true;

    for (let i = start + 1; i < end; i++) {
      if (occupiedHours.includes(i)) return false;
    }

    return true;
  };

  const Reserva = () => {
    if (calendarId !== false && selectedDate === null) {
      return (
        <>
          {isCalendarReady ? (
            <Calendar
              locale="es"
              onChange={formatToDate}
              onClickDay={handleDateClick}
              value={selectedDate}
              tileDisabled={tileDisabled}
              tileClassName={tileClassName}
            />
          ) : (
            <div className="custom-loader"></div>
          )}
        </>
      );
    } else if (selectedDate != null && eventContent === false) {
      return (
        <div className="selectHoursHero">
          <div className="selectHoursContainer">
            <p className="selectHours">{`¿Cuánto tiempo te llevará\nobtener el resultado que\ndeseas?`}</p>
            <div className="dropdown">
              <div
                className="selectedOption"
                onClick={() => setIsOpen(!isOpen)}
              >
                {value}
              </div>
              {isOpen && (
                <div className="options">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="option"
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            {hours && (
              <div className="hoursBtnContainer">
                <div>{renderTimeButtons()}</div>
                <button
                  onClick={() => setEventContent(true)}
                  style={{ display: end === null ? "none" : "block" }}
                  className="nextBookingBtn"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      );
    } else if (eventContent) {
      return (
        <div className="booking-form">
          {creating ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={createReserve}>
              <div className="form-group">
                <label htmlFor="name">NOMBRE Y APELLIDO:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder="Nombre"
                  required
                  className="inputForm"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">MAIL:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="inputForm"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">TELEFONO:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
                  required
                  className="inputForm"
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventType">
                  ¿Qué tipo de contenido quieres generar en nuestros espacios?
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={eventType}
                  onChange={handleInputChange}
                  required
                  className="inputForm"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Producción audiovisual">
                    Producción audiovisual
                  </option>
                  <option value="Sesión de fotos">Sesión de fotos</option>
                  <option value="Master Class">Master Class</option>
                  <option value="Encuentros">Encuentros</option>
                  <option value="Seminarios">Seminarios</option>
                  <option value="Eventos empresariales">
                    Eventos empresariales
                  </option>
                </select>
              </div>
              <button type="submit" className="confirmBtn">
                CONFIRMAR RESERVA
              </button>
            </form>
          )}
        </div>
      );
    }
  };

  const clearBooking = () => {
    setCalendarId(false);
    setSelectedDate(null);
    setHours("");
    setStart(null);
    setEnd(null);
    setValue("Seleccionar opción");
    setEventContent(false);
    setEvents([]);
    setCreating(false);
    setIsCalendarReady(false);
    setName("");
    setEmail("");
    setPhone("");
    setEventType("");
  };

  const createReserve = async (e) => {
    e.preventDefault();
    setCreating(true);
    const formData = {
      calendarIdSelected: calendarId,
      summary: `${eventType} - ${name}`,
      location: "Av. Sta. Fe 911, C1059ABD Cdad. Autónoma de Buenos Aires",
      description: `Tiempo estimado: ${hours}`,
      start: `${date}T${start}:00:00-03:00`,
      end: `${date}T${end}:00:00-03:00`,
      attendees: `${email}`,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    try {
      const response = await fetch("/api/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${errorData.error || "Desconocido"}`
        );
      }

      const data = await response.json();
      console.log("Evento creado:", data.status);
      if (data.status === "confirmed") {
        alert("Tu reserva fue exitosa!");

        clearBooking();
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <div className="bookingSetPalaceContainer">
        {selectedDate === null ? (
          <div className="bookingSetPalaceContainer">
            <div className="setPalaceDetailsContent setPalaceImg">
              <Image
                src={
                  "https://res.cloudinary.com/dsdzvhfhh/image/upload/v1722902346/setPalaceAzul_upli64.png"
                }
                alt="setPalace"
                fill
                className="setPalaceAzulImg"
              />
            </div>
            <div className="setPalaceDetailsContent setPalaceText">
              <h4 className="setPalaceTitle setPalaceAzulTxt">
                Ideal para fotos | entrevistas | videos | podcasts
              </h4>
              <p className="setPalaceAzulTxt">{`El valor del alquiler incluye:`}</p>
              <p className="setPalaceAzulTxt">{`• Bajada de infinito color blanco, verde o gris.\n• Uso del espacio especificado en la reserva\n• 3 flashes con accesorios`}</p>
              <p className="setPalaceSmall setPalaceAzulTxt">
                Otros accesorios/espacios pueden tener costo adicional, por
                favor <Link href={"/contacto"}>consúltenos</Link>
              </p>
              <p className="setPalaceAzulTxt">
                Tiempo mínimo de reserva: 2 hs.
              </p>
              <div className="setPalaceBtns">
                {calendarId === false ? (
                  <button
                    onClick={() => handleCalendarId()}
                    className="startBookingBtn"
                  >
                    Reservar
                  </button>
                ) : (
                  <button onClick={clearBooking} className="cancelBookingBtn">
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="setPalaceDetails">
            <p className="summaryTitle">SET PALACE / AZUL</p>
            <p className="summaryDate">{screenDate && screenDate}</p>
            <p className="summaryDate">{hours && hours}</p>
            <p className="summaryDate">
              {start && `${start}:00`}
              {end && ` - ${end}:00`}
            </p>

            <button onClick={clearBooking} className="cancelBookingBtn">
              {" "}
              Cancelar
            </button>
          </div>
        )}

        <div className="setPalaceDetailsContent bookingCalendarContainer">
          <Reserva />
        </div>
      </div>
    </div>
  );
}

export default SetPalaceReserve;
