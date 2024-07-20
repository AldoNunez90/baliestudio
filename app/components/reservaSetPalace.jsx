"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function BookingSetPalace() {
  const [booking, setBooking] = useState(false);

  return (
    <div className="bookingSetPalaceContainer">
      <div className="setPalaceDetails">
        <div>
          <Image
            src={"/estudio1.png"}
            alt="setPalace"
            width={300}
            height={300}
          />
        </div>
        <div>
            <h4>Ideal para fotos | entrevistas | videos | podcasts</h4>
            <p>{`el valor del allquiler incluye:\n• Bajada de infinito color blanco, verde o gris.\n• Uso del espacio especificado en la reserva\n• 3 flashes con accesorios`}</p>
            <p>Otros accesorios/espacios pueden tener costo adicional, por favor <Link href={"/contacto"}>consúltenos</Link></p>
          <p>Acá reservas el set palace</p>
        <button onClick={() => setBooking(true)}>Reservar</button>
        {booking && <button onClick={() => setBooking(false)}>Cancelar</button>}
        </div>
      </div>
      <div className="bookingCalendarContainer">
        {booking && <div>Reserva exitosa</div>}
      </div>
    </div>
  );
}
