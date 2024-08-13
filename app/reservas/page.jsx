'use client'

import SetDuoReserve from "../components/setDuoReserve";
import SetPalaceReserve from "../components/SetPalacereserve";


export default function Reservas () {

    return  (
        <div>  
             <div className="reservasIntroContainer">
        <p className="reservasIntroTitle">{`La familia\nBali Estudio\nte espera!`}</p>
        <p className="reservasIntroTxt">{`Bienvenidos a nuestro programador de sesiones automático.\nAquí podrás reservar el tiempo que necesites para realizar tus\nproyectos en nuestros espacios.`}</p>
        <p className="reservasIntroSmall" style={{width: "30vw", textWrap: "wrap"}}>Reserva: Para que puedas asegurar el uso del espacio deberás cancelar el 50% del costo total de la misma dentro de las próximas 8 horas. Los medios de pago disponibles son: efectivo o transferencia bancaria. El resto del monto deberá ser pagado al finalizar la producción. Capacidad máxima de personas por Sala: Está permitido el acceso de 8 personas a los espacios reservados. En caso de superar la capacidad indicada se deben consignar un adicional de ARS$ 500 por persona. Política de cancelaciones: podrá existir una única cancelación o modificación sin cargo siempre y cuando las mismas sean notificadas con 48 horas de anticipación. Pasado ese tiempo NO se efectúa reembolso de la reserva y en caso de modificación se cobrará el equivalente a una hora de servicio. Bali Estudio se reserva el derecho a modificar turnos, ofreciendo días y horarios alternativos según disponibilidad de los espacios.</p>
      </div>         
        <SetPalaceReserve/>
        <SetDuoReserve />
        </div>
    )
}