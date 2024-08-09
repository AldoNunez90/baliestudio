"use client";
import React, { useEffect, useState } from "react";
import env from "dotenv";
import process from "process";
import Calendar from "react-calendar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function SetPalaceReserve() {
  // const [booking, setBooking] = useState(false);
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
  const [date, setDate] = useState(null)
  const [hoveredHour, setHoveredHour] = useState(null);
  const [calendarId, setCalendarId] = useState(false)


  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((response) => {
        setEvents(response.data);
        processEvents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error.message);
      });

  
  }, []);

  const idCalendarSetPalace = process.env.CALENDAR_ID_SET_PALACE


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
      const requiredHours = new Set([...Array(22 - 8).keys()].map((h) => h + 8));
      dateInfo[date].fullyOccupied = [...requiredHours].every((hour) => occupiedHours.has(hour));
    });

    setDateInfo(dateInfo);
  }

  function tileClassName({ date, view }) {
    if (view === "month") {
      const dateString = date.toISOString().split("T")[0];
      const today = new Date().toISOString().split('T')[0];

      if (dateString < today) {
        return 'past-day';
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
    const dateString = date.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    
    // Deshabilita los días ocupados y los días anteriores a hoy
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
      buttons.push(
        <button 
        key={hour}
        disabled={occupiedHours.includes(hour)}
        onClick={() => handleClick(hour)}
        className={`hourBoxBtn ${start !== null && end !== null && hour >= start && hour <= end ? 'selected' : ''} ${hour >= start && hour <= end ? 'intermediate' : ''}`}
        style={{ 
          backgroundColor: occupiedHours.includes(hour) ? '#d3d3d3' : '',
          color: start !== null && end !== null && hour >= start && hour <= end ? '#fff' : ''
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

  const validateSelection = (start, end, allowedHours) => {
    if (start === null || end === null) return;
  
    const duration = end - start;
    setEnd(start + allowedHours)
    // Si la duración excede el límite de horas permitidas, ajusta la selección
    if (duration > allowedHours) {
      // Ajusta el `end` para que esté dentro del rango permitido
      setEnd(start + allowedHours);
    }
  };

  const handleClick = (hour) => {
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
      validateSelection(start, hour, parseInt(hours));
    }

     // Colorea los botones inmediatamente
  if (start !== null && end === null) {
    // Colorea todos los botones entre `start` y el botón clicado
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
console.log(calendarId);

  const Reserva = () => {
    if (calendarId !== false && selectedDate === null) {
      return (
        <Calendar
          locale="es"
          onChange={formatToDate}
          onClickDay={handleDateClick}
          value={selectedDate}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
        />
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
              <div>
                {renderTimeButtons()}
                </div>
                <button
                  onClick={() => setEventContent(true)}
                  style={{ display: end === null && "none" }}
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
          <form onSubmit={(e)=>createReserve(e)}>
            <div className="form-group">
              <label htmlFor="name">NOMBRE Y APELLIDO:</label>
              <input type="text" id="name" name="name" required  className="inputForm"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">MAIL:</label>
              <input type="email" id="email" name="email" required  className="inputForm"/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">TELEFONO:</label>
              <input type="tel" id="phone" name="phone" required  className="inputForm"/>
            </div>
            <div className="form-group">
              <label htmlFor="eventType">
                ¿Qué tipo de contenido quieres generar en nuestros espacios?
              </label>
              <select id="eventType" name="eventType" required className="inputForm">
                <option value="">Seleccionar...</option>
                <option value="Prosuccion audiovisual">Producción audiovisual</option>
                <option value="Sesión de fotos">Sesión de fotos</option>
                <option value="Master Class">Master Class</option>
                <option value="Encuentros">Encuentros</option>
                <option value="Seminarios">Seminarios</option>
                <option value="Eventos empresariales">Eventos empresariales</option>
              </select>
            </div>
            <button type="submit">CONFIRMAR RESERVA</button>
          </form>
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
  };

  const formData = {
      calendarIdSelected: calendarId,  
      summary: 'Reunión en Set Palace',
      start: '2024-08-25T10:00:00-03:00',
      end:   '2024-08-25T11:00:00-03:00',
  }

  const createReserve = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.error || 'Desconocido'}`);
      }
  
      const data = await response.json();
      console.log('Evento creado:', data.status);
      if(data.status === 'confirmed'){
        clearBooking();
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  return (
    <div>
      <div className="reservasIntroContainer">
        <p className="reservasIntroTitle">{`La familia\nBali Estudio`}</p>
        <p className="reservasIntroTitleBold">{`te espera!`}</p>
        <p className="reservasIntroTxt">{`Bienvenidos a nuestro programador de sesiones automático.\nAquí podrás reservar el tiempo que necesites para realizar tus\nproyectos en nuestros espacios.`}</p>
        <p className="reservasIntroSmall">{`Letra chica de la reserva: Lorem ipsum dolor sit amet consectetur adipisicing elit.\nQuam veritatis praesentium labore? Magni alias veniam pariatur ullam minus placeat voluptates officiis,\nmolestias harum dolores porro vel fugit libero fugiat facere.\nLorem ipsum dolor sit amet consectetur adipisicing elit.\nQuam veritatis praesentium labore? Magni alias veniam pariatur ullam minus placeat voluptates officiis,\nmolestias harum dolores porro vel fugit libero fugiat facere.\nLorem ipsum dolor sit amet consectetur adipisicing elit.\nQuam veritatis praesentium labore? Magni alias veniam pariatur ullam minus placeat voluptates officiis,\nmolestias harum dolores porro vel fugit libero fugiat facere.`}  </p>
      </div>

    <div className="bookingSetPalaceContainer">
      {selectedDate === null ? (
        <div className="bookingSetPalaceContainer">
          <div className="setPalaceDetailsContent setPalaceImg">
            <Image
              src={"https://res.cloudinary.com/dsdzvhfhh/image/upload/v1722902346/setPalaceAzul_upli64.png"}
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
              Otros accesorios/espacios pueden tener costo adicional, por favor{" "}
              <Link href={"/contacto"}>consúltenos</Link>
            </p>
            <p className="setPalaceAzulTxt">Tiempo mínimo de reserva: 2 hs.</p>
            <div className="setPalaceBtns">
              {calendarId === false ? (
                <button
                onClick={() => setCalendarId(idCalendarSetPalace)}
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
          <p className="summaryTitle">SET PALACE / AZUL</p>
          <p className="summaryDate">{screenDate && screenDate}</p>
          <p className="summaryDate">{hours && hours}</p>
          <p className="summaryDate">{start && `${start}:00`}{end && ` - ${end}:00`}</p>
          
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
      </div>
  );
}

export default SetPalaceReserve;
