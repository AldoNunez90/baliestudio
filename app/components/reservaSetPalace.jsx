"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, set } from 'date-fns'
import { es } from 'date-fns/locale';
import Dropdown from "./Dropdown";
import HoursBox from "./HoursBox";

export default function BookingSetPalace() {
  const [booking, setBooking] = useState(false);
  const [date, setDate] = useState(null);
  const [screenDate, setScreenDate] = useState(null)
  const [hours, setHours] = useState(null)
  const [screenStartTime, setScreenStartTime] = useState(null)
  const [screenEndTime, setScreenEndTime] = useState(null)
 // console.log("día: ", date);
 //console.log("hora: ", hours)
  //console.log("screenStartTime: ", screenStartTime)
  //console.log("screenEndTime: ", screenEndTime)
    
  const formatToDate = (e)=>{
    const formattedDate = format(e, 'yyyy-MM-dd')
    const dateToScreen = format(e, 'PPP', { locale: es } )
      setDate(formattedDate)
      setScreenDate(dateToScreen)
   }
    
    const hoursSelected = (value) => {
      setHours(value);
    };

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

const handleTimeSelection = (time) => {
  if (!screenStartTime || (screenStartTime && screenEndTime)) {
    setScreenStartTime(time);
    setScreenEndTime(null);
  } else {
    setScreenEndTime(time);
  }
};

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
      <Dropdown onSelectChange={hoursSelected} />
      </div>
      <div>
      { hours && <HoursBox onClick={handleTimeSelection} /> }
      </div>
     </div>
    )}
  }
  
  

  const clearBooking = ()=>{
    setBooking(false)
    setDate(null)
    setHours("")
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
      <p className="summaryDate">{screenStartTime && screenStartTime}</p>
      <p className="summaryDate">{screenEndTime && screenEndTime}</p>
    </div>
    
  }
      
      <div className="setPalaceDetailsContent bookingCalendarContainer">
       <Reserva />
      </div>
    
  
  </div>
  );
}
