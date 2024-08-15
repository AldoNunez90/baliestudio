"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { es, tr } from "date-fns/locale";

function SetDuoReserve() {
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
  const [isCalendarReady, setIsCalendarReady] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("");
  const [shouldAutoFocus, setShouldAutoFocus] = useState("name");
  const [finishBooking, setFinishBooking] = useState(null)
  const [responseOk, setResponseOk] = useState(true)
  const [isDisabled, setIsDisabled] = useState(true)
  const [alertHours, setAlertHours] = useState(false)

  const router = useRouter();
  const [authStatus, setAuthStatus] = useState(null);

 
    

  useEffect(() => {
    if (calendarId) {
      fetchDayStatus();
    }
    
  }, [calendarId]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const authStatus = query.get('auth');
    if (authStatus === 'success') {
      // Ejecuta setCalendarId o cualquier otra lógica
      setCalendarId(idCalendarSetDuo)
        } else if (authStatus === 'error') {
      // Muestra un mensaje de error
      alert('Hubo un error durante la autenticación.');
    }
  }, [authStatus]);


  const idCalendarSetDuo = process.env.CALENDAR_ID_SET_DUO;

  const handleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  // const handleCalendarId = async () => {
  //   setCalendarId(idCalendarSetDuo);
  // };
  
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

    for (let hour = 8; hour <= 22; hour++) {
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

  const options = Array.from({ length: 7 }, (_, i) => `${i + 2}` + ` hs`);

  const handleSelect = (option) => {
    setIsOpen(!isOpen);
    setHours(option);
    setValue(option);
    if(option === 'Horarios especiales'){
      setStart(null)
      setEnd(null)
      setIsDisabled(true)
    }
  };

  const handleClick = (hour) => {
    if (occupiedHours.includes(hour)) {
      return; // No permite hacer clic en horas ocupadas
    }

    if (start === null || (start !== null && end !== null)) {
      setStart(hour);
      setEnd(null);
      setIsDisabled(true)
      setAlertHours(false)
    } else if (start === hour) {
      setStart(null);
      setEnd(null);
      setIsDisabled(true)
      setAlertHours(false)
    } else if (hour < start) {
      setStart(hour);
    } else if (isValidSelection(start, hour)) {
      const selectedDuration = hour - start;
      const allowedDuration = parseInt(hours.split(" ")[0]);

      if (selectedDuration === allowedDuration) {
        setEnd(hour);
        setIsDisabled(false)
        setAlertHours(false)
      } else {
        setAlertHours(true)
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
      setAlertHours(false)
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

  const HoursComponent = ()=>{
    if (parseInt(hours) > 1 && parseInt(hours) < 9 ) {
     return( <div className="hoursBtnContainer">
      { alertHours && <p style={{color: "red", textAlign: "center"}}>{`Deberías seleccionar ${hours} horas`}</p>}
      <div>{renderTimeButtons()}</div>
      <button
        onClick={() => setEventContent(true)}
        disabled={isDisabled}
        style={isDisabled ? {cursor: "not-allowed", backgroundColor: "gray"} : {cursor: "pointer"}}
        className="nextBookingBtn"
        
      >
        Siguiente
      </button>
    </div>
    )}else if ( hours === 'Horarios especiales') {
      return(<div className="specialHours">
        <p style={{color: "white", fontSize: "larger"}}>{`Si los horarios que necesitas no figuran entre las\nopciones o tienes algún requerimiento especial:`}</p>
        <a href="https://wa.me/+5491154171668?text=Hola! Necesito acordar un horario especial para el Set DUO" style={{textDecoration: 'unset', textAlign: "center", fontSize: "inherit"}} target="_blank" className="cancelBookingBtn">Contáctanos</a>
        </div>
    )} else {
     return <div></div>
    }
  }

  const Modal = ()=>{
    return(
      
        <div className="dialogHero">
          <div className="dialogContainer">
      { responseOk ? ( 
        <>
        <div className="dialogReserveDetails">
        <div className="dialogReserveContent"><Image src={'https://res.cloudinary.com/dsdzvhfhh/image/upload/v1722902344/logoOk_wxvkgt.png'} alt="ok" fill className="recervedOk"/></div>
        <div className="dialogReserveContent">
        <div>
        <p className="dialogTitle">{`Tu reserva se ha completado\ncorrectamente`}</p>
        <p className="dialogSubTitle">Gracias por elegirnos!</p>
        </div>
        <p className="summaryTitle">SET DUO</p>
        <p className="summaryDate">{screenDate && screenDate}</p>
        <p className="summaryDate">
        {start && `${start}:00`}
        {end && ` - ${end}:00`}
        </p>
        </div>
        </div>
        <p className="finePrint"><small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, beatae et aspernatur autem nisi commodi soluta quia ab voluptates, labore omnis quod ut at eaque dolore dicta earum! Fugiat, quam!</small> </p>
        <button onClick={()=>clearBooking()} className="confirmBtn" style={{alignSelf: "center"}}>Genial!</button>
        </>
      ) : (
        <div className="custom-loader" style={{alignSelf: "center"}}></div>
      )
    }
      </div> 
    </div>  
    
    )
  }
  
  const FormContact = ()=>{
    return(
      <div className="booking-form">
          <form onSubmit={createReserve}>
              <div className="form-group">
                <label htmlFor="name">NOMBRE Y APELLIDO:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  required
                  className="inputForm"
                  onFocus={()=>setShouldAutoFocus('name')}
                  autoFocus={shouldAutoFocus === 'name' ? true : undefined} 
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
                  autoFocus={shouldAutoFocus === 'email' ? true : undefined} 
                  onFocus={()=>setShouldAutoFocus('email')}

                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">TELEFONO:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
                  required
                  className="inputForm"
                  autoFocus={shouldAutoFocus === 'phone' ? true : undefined} 
                  onFocus={()=>setShouldAutoFocus('phone')}

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
          
        </div>
    )
  }

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
                  <div className="option" onClick={() => handleSelect("Horarios especiales")} > Horarios especiales </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <HoursComponent />
          </div>
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
    setIsCalendarReady(false);
    setName("");
    setEmail("");
    setPhone("");
    setEventType("");
    setScreenDate(null);
    setIsOpen(false);
    setDateInfo({});
    setOccupiedHours([]);
    setDate(null);
    setHoveredHour(null);
    setShouldAutoFocus("name");
    setFinishBooking(null);
    setResponseOk(null);
    setIsDisabled(true)
  };

  const createReserve = async (e) => {
    e.preventDefault();
    setFinishBooking(true)
    setResponseOk(false);
    const formData = {
      calendarIdSelected: calendarId,
      summary: `${eventType} - ${name}`,
      location: "Av. Sta. Fe 911, C1059ABD Cdad. Autónoma de Buenos Aires",
      description: `Tiempo estimado: ${hours}\nContacto: ${phone}`,
      start: `${date}T${start}:00:00-03:00`,
      end: `${date}T${end}:00:00-03:00`,
      attendees: [{email}],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ]
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
        setResponseOk(true)
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } 
  };

  return (
    <div>
      {finishBooking ? <Modal /> : 
      <div className="bookingSetPalaceContainer">
        {selectedDate === null ? (
          <div className="bookingSetPalaceContainer">
            <div className="setPalaceDetailsContent setPalaceImg setDuoImgContainer">
              <Image
                src={
                  "https://res.cloudinary.com/dsdzvhfhh/image/upload/v1723523644/SET_DUO_RESERVAS_nnil25.png"
                }
                alt="setPalace"
                fill
                className="setDuoImg"
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
                favor <a href="https://wa.me/+5491154171668?text=Hola! Tengo una consulta sobre el Set DUO" style={{color: 'blue', textDecoration: 'unset'}} target="_blank">consúltenos</a> 
              </p>
              <p className="setPalaceAzulTxt">
                Tiempo mínimo de reserva: 2 hs.
              </p>
              <div className="setPalaceBtns">
                {calendarId === false ? (
                  <button
                    onClick={() => handleLogin()}
                    className="startBookingBtn"
                    >
                    Reservar
                  </button>
                ) : (<>
                  <button onClick={clearBooking} className="cancelBookingBtn">
                    Cancelar
                  </button>  
                </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="setPalaceDetails">
            <p className="summaryTitle">SET DUO </p>
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
         {eventContent ? <FormContact /> : <Reserva />}
        </div>
        </div>
}
        </div>

  );
}
export default SetDuoReserve;
