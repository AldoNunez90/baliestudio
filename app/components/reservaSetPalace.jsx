"use client";
import Image from "next/image";
import { useState , useEffect} from "react";
import Link from "next/link";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, set } from 'date-fns'
import { es } from 'date-fns/locale';

export default function BookingSetPalace() {
  const [booking, setBooking] = useState(false);
  const [date, setDate] = useState(null);
  const [screenDate, setScreenDate] = useState(null)
  const [hours, setHours] = useState(null)
  const [blockedTimes, setBlockedTimes] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [value, setValue] = useState('Seleccionar opción');
  const [isOpen, setIsOpen] = useState(false);
  const [eventContent, setEventContent] = useState(false)

  useEffect(() => {
    const getBlockedTimes = async () => {
      try {
        const response = await fetch('/blockedTimes.json'); // Ruta relativa al archivo en la carpeta public
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlockedTimes(data.blockedTimes); // Asumiendo que el JSON tiene una estructura { "blockedTimes": [10, 11, 14] }
    } catch (error) {
        console.error("Error fetching blocked times:", error);
    }
};
getBlockedTimes();
}, []);

const time = Array.from({ length: 15 }, (_, i) => 8 + i);
  
const isBlocked = (hour) => blockedTimes.includes(hour);
const isSelected = (hour) => hour === start || hour === end || (start && end && hour > start && hour < end);

const handleClick = (hour) => {
  if (isBlocked(hour)) return;

  if (start === null || (start !== null && end !== null)) {
    setStart(hour);
    setEnd(null);
    

  } else if(start === hour){
   setStart(null)   
   setEnd(null)
  } else if (hour < start) {
    setStart(hour);
  } else if (isValidSelection(start, hour)) {
    setEnd(hour);
  } };

  const isValidSelection = (start, end) => {
    if (start === null || end === null) return true;
    for (let i = start + 1; i < end; i++) {
      if (isBlocked(i)) return false;
    }
    return true;
  };



  const formatToDate = (e)=>{
    const formattedDate = format(e, 'yyyy-MM-dd')
    const dateToScreen = format(e, 'PPP', { locale: es } )
      setDate(formattedDate)
      setScreenDate(dateToScreen)
   }

  const tileDisabled = ({ date, view }) => {
    // Este bloquea
    if (view === 'month') {
      if (date.getDay() === 0 || date.getDay() === 2) {
        return true;
        }} 
  };

  const tileClassName = ({ date, view }) => {
  if (view === 'month') {
    // Añadir clase a fines de semana
    // Este cambia el color
    if (date.getDay() === 0 || date.getDay() === 2) {
      return 'react-calendar__tile--disabled';
    }
  }

  const specialDates = [new Date(2024, 7, 22)];

  if (specialDates.some(specialDate =>
    date.getFullYear() === specialDate.getFullYear() &&
    date.getMonth() === specialDate.getMonth() &&
    date.getDate() === specialDate.getDate()
  )) {
  }
  return 'custom-day';
}

const options = Array.from({ length: 11,}, (_, i) => `${i + 2}`+ ` hs`);
  
const handleSelect = (option)=>{
  setIsOpen(!isOpen)
  setHours(option)
  setValue(option)
}

  const Reserva = ()=>{
    if(booking === true && date=== null){
      return <Calendar
      locale="es"
      onChange={(e)=>formatToDate(e)}
      value={date}
      tileDisabled={tileDisabled}
      tileClassName={tileClassName}
    />
    } else if (date != null){
     return (
     <div className="selectHoursHero">
      <div className="selectHoursContainer">
      <p className="selectHours">{`¿Cuánto tiempo te llevará\nobtener el resultado que\ndeseas?`}</p>
      <div className="dropdown">
      <div className="selectedOption" onClick={() =>setIsOpen(!isOpen)}   >
        {value}
      </div>
     {isOpen && (
        <div className="options">
          <div className="option">
        </div>
          {options.map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={()=>handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
      </div>
      <div>
      { hours && <div>
      {time.map((hour) => (
        <button
          key={hour}
          onClick={() => handleClick(hour)}
          className="hourBoxBtn"
          style={{
            backgroundColor: isBlocked(hour) ? 'grey' : isSelected(hour) ? 'cyan' : 'white',
            color: isBlocked(hour) ? 'white' : 'black'
          }}
          disabled={isBlocked(hour)}
        >
          {hour}:00
        </button>
      ))}
      <button  style={{display: end === null && "none"} } >Siguiente</button>
    </div> }
      </div>
     </div>
    )} else if (eventContent) {
      console.log("Reserva");
    //   <div className="booking-form">
    //   <h2>SET PALACE</h2>
    //   <h3>31 DE JULIO 2024</h3>
    //   <h3>14:00 - 16:00</h3>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="name">NOMBRE Y APELLIDO:</label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="email">MAIL:</label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="phone">TELEFONO:</label>
    //       <input
    //         type="tel"
    //         id="phone"
    //         name="phone"
    //         value={formData.phone}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="eventType">
    //         Qué tipo de contenido quieres generar en nuestros espacios?:
    //       </label>
    //       <select
    //         id="eventType"
    //         name="eventType"
    //         value={formData.eventType}
    //         onChange={handleChange}
    //         required
    //       >
    //         <option value="">Seleccionar...</option>
    //         <option value="photo-session">Photo session</option>
    //         <option value="video-shoot">Video Shoot</option>
    //         <option value="workshop">Workshop</option>
    //         <option value="event">Event</option>
    //         <option value="other">Other</option>
    //       </select>
    //     </div>
    //     <button type="submit">CONFIRMAR RESERVA</button>
    //   </form>
    // </div>
    }
  }
  
  const clearBooking = ()=>{
    setBooking(false)
    setDate(null)
    setHours("")
    setStart(null)
    setEnd(null)
    setValue('Seleccionar opción')
  }

  return (
    <div className="bookingSetPalaceContainer">
   
      {date === null ? 
      <div className="bookingSetPalaceContainer">

      <div className="setPalaceDetailsContent setPalaceImg">
      <Image src={"/estudio1.png"} alt="setPalace" width={300} height={300} />
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
        {booking === false ? <button onClick={() => setBooking(true)} className="startBookingBtn">
          Reservar
        </button> : <button
            onClick={() => clearBooking()}
            className="cancelBookingBtn"
            >
            Cancelar
          </button> }
      </div>
    </div>
              </div>
    :
    <div className="setPalaceDetails">
        <p className="summaryTitle">SET PALACE</p>
        <p className="summaryDate">{screenDate && screenDate}</p>
        <p className="summaryDate">{hours && hours}</p>
        <p className="summaryDate">{start && `${start}:00`}</p>
        <p className="summaryDate">{end && `${end}:00`}</p>
        <button onClick={() => clearBooking()} className="cancelBookingBtn"> Cancelar</button> 
       
      </div>
  }
      
      <div className="setPalaceDetailsContent bookingCalendarContainer">
       <Reserva />
      </div>
    
  
  </div>
  );
}
