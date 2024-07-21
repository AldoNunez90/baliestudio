"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from 'date-fns'

export default function BookingSetPalace() {
  const [booking, setBooking] = useState(false);
  const [date, setDate] = useState(null);
  const [hours, setHours] = useState(0)
  console.log(date);
  console.log(typeof(hours))
  
  
  // const dateSelected = ()=>{
    //   setFormattedDate(format(date, 'yyyy-MM-dd'))
    //   console.log(formattedDate);
    
    // }
    
    const hoursSelected = (e)=>{
      setHours(Number(e.target.value))
  }
  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return true;
    }}

   
    
  };

  const tileClassName = ({ date, view }) => {
  if (view === 'month') {
    // Añadir clase a fines de semana
    if (date.getDay() === 0 || date.getDay() === 6) {
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

  const Reserva = ()=>{
    if(booking === true && date=== null){
      return <Calendar
      locale="es"
      onChange={setDate}
      value={date}
      tileDisabled={tileDisabled}
      tileClassName={tileClassName}
    />
    } else if (date != null){
     return (
     <div>
      <p>¿Cuánto tiemo te llevará obtener el resultado que deseas?</p> 
      <select onChange={hoursSelected} name="hours" id="hours-select" value={`${hours}`} >
        <option value="">--Please choose an option--</option>
        <option value={2}>2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
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
      <div className="setPalaceDetailsContent bookingCalendarContainer">
       <Reserva />
      </div>
    </div>
  );
}
