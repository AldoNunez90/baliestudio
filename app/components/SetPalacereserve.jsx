"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import { format, set } from "date-fns";
import { es } from "date-fns/locale";

function SetPalaceReserve() {
  const [booking, setBooking] = useState(false); //Habilita el calendario
  const [screenDate, setScreenDate] = useState(null); //Fecha que se muestra en pantalla
  const [start, setStart] = useState(null);  //horas que se muestran en pantalla
  const [date, setDate] = useState(null); //Nivel de ocupación de un día
  const [end, setEnd] = useState(null); //horas que se muestran en pantalla
  const [value, setValue] = useState("Seleccionar opción"); // Menu desplegable
  const [hours, setHours] = useState(null); //Cantidad de horas necesarias en el proyecto
  const [isOpen, setIsOpen] = useState(false); //Estado para el menu desplegable
  const [eventContent, setEventContent] = useState(false); //Detalles del evento en horas
  const [events, setEvents] = useState([]); //Lista de eventos que vienen del back
  const [dateInfo, setDateInfo] = useState({}); //Día seleccionado
  const [selectedDate, setSelectedDate] = useState(null); //Día seleccionado
  const [occupiedHours, setOccupiedHours] = useState([]); //Horas ocupadas del día

  useEffect(() => {
    axios
      .get("https://back-bali-aldos-projects-f6edb5af.vercel.app/api/getEvents")
      .then((response) => {
        setEvents(response.data);
        processEvents(response.data);})
        .catch(error => {
          console.error('Error fetching events:', error.message);
      });
  }, []);
  console.log(events);

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

      // Marcar las horas ocupadas por este evento
      for (let hour = startHour; hour < endHour; hour++) {
        dateInfo[date].occupiedHours.add(hour);
      }

      dateInfo[date].totalEvents++;
    });

    // Determinar si el día está completamente ocupado
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

      if (dateInfo[dateString]) {
        if (dateInfo[dateString].fullyOccupied) {
          return "completely-occupied";
        } else if (
          dateInfo[dateString].totalEvents > 0 &&
          dateInfo[dateString].fullyOccupied === false
        ) {
          return "partially-occupied";
        }
      }
    }

    return "completely-free";
  }


  const handleDateClick = date => {
    setSelectedDate(date);
    setOccupiedHours(Array.from(dateInfo[date].occupiedHours || []));

  };

console.log(occupiedHours);


  const renderTimeButtons = () => {
    const buttons = [];
    for (let hour = 8; hour < 22; hour++) {
      buttons.push(
        <button 
        key={hour} 
        disabled={occupiedHours.includes(hour)}
        onClick={() => handleClick(hour)}
        className="hourBoxBtn"
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
    // if (isBlocked(hour)) return;

    if (start === null || (start !== null && end !== null)) {
      setStart(hour);
      setEnd(null);
    } else if (start === hour) {
      setStart(null);
      setEnd(null);
    } else if (hour < start) {
      setStart(hour);
    } else if (isValidSelection(start, hour)) {
      setEnd(hour);
    }
  };

  const isValidSelection = (start, end) => {
    if (start === null || end === null) return true;
    for (let i = start + 1; i < end; i++) {
      // if (isBlocked(i)) return false;
    }
    return true;
  };

  const Reserva = () => {
    if (booking === true && date === null) {
      return (
        <Calendar
          locale="es"
          onChange={(e) => formatToDate(e)}
          onClickDay={(date)=>handleDateClick(date)}
          value={date}
          // tileDisabled={tileDisabled}
          tileClassName={tileClassName}
        />
      );
    } else if (date != null && eventContent === false) {
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
                  <div className="option"></div>
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
              <div>{hours && (
                <div>
                  <h2>Time Slots for {selectedDate}</h2>
                  {renderTimeButtons()}
                </div>
              )}
                <div>
    </div>
                <button
                  onClick={() => setEventContent(true)}
                  style={{ display: end === null && "none" }}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      );
    } else if (eventContent) {
      console.log("Reserva");
      <div className="booking-form">
        <h2>SET PALACE</h2>
        <h3>31 DE JULIO 2024</h3>
        <h3>14:00 - 16:00</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">NOMBRE Y APELLIDO:</label>
            <input
              type="text"
              id="name"
              name="name"
              // value={formData.name}
              // onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">MAIL:</label>
            <input
              type="email"
              id="email"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">TELEFONO:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              // value={formData.phone}
              // onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventType">
              Qué tipo de contenido quieres generar en nuestros espacios?:
            </label>
            <select
              id="eventType"
              name="eventType"
              // value={formData.eventType}
              // onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="photo-session">Photo session</option>
              <option value="video-shoot">Video Shoot</option>
              <option value="workshop">Workshop</option>
              <option value="event">Event</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit">CONFIRMAR RESERVA</button>
        </form>
      </div>;
    }
  };

  const clearBooking = () => {
    setBooking(false);
    setDate(null);
    setHours("");
    setStart(null);
    setEnd(null);
    setValue("Seleccionar opción");
  };

  return (
    <div className="bookingSetPalaceContainer">
      {date === null ? (
        <div className="bookingSetPalaceContainer">
          <div className="setPalaceDetailsContent setPalaceImg">
            <Image
              src={"/estudio1.png"}
              alt="setPalace"
              width={300}
              height={300}
            />
          </div>
          <div className="setPalaceDetailsContent setPalaceText">
            <h4 className="setPalaceTitle">
              Ideal para fotos | entrevistas | videos | podcasts
            </h4>
            <p>{`El valor del alquiler incluye:`}</p>
            <p>{`• Bajada de infinito color blanco, verde o gris.\n• Uso del espacio especificado en la reserva\n• 3 flashes con accesorios`}</p>
            <p className="setPalaceSmall">
              Otros accesorios/espacios pueden tener costo adicional, por favor{" "}
              <Link href={"/contacto"}>consúltenos</Link>
            </p>
            <p>Tiempo mínimo de reserva: 2HS</p>
            <div className="setPalaceBtns">
              {booking === false ? (
                <button
                  onClick={() => setBooking(true)}
                  className="startBookingBtn"
                >
                  Reservar
                </button>
              ) : (
                <button
                  onClick={() => clearBooking()}
                  className="cancelBookingBtn"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="setPalaceDetails">
          <p className="summaryTitle">SET PALACE</p>
          <p className="summaryDate">{screenDate && screenDate}</p>
          <p className="summaryDate">{hours && hours}</p>
          <p className="summaryDate">{start && `${start}:00`}</p>
          <p className="summaryDate">{end && `${end}:00`}</p>
          <button onClick={() => clearBooking()} className="cancelBookingBtn">
            {" "}
            Cancelar
          </button>
        </div>
      )}

      <div className="setPalaceDetailsContent bookingCalendarContainer">
        <Reserva />
      </div>
    </div>
  );
}

export default SetPalaceReserve;
