'use client'

import SetDuoReserve from "../components/setDuoReserve";
import SetPalaceReserve from "../components/SetPalacereserve";


export default function Reservas () {

    return  (
        <div>  
             <div className="reservasIntroContainer">
        <p className="reservasIntroTitle">{`La familia\nBali Estudio\nte espera!`}</p>
        <p className="reservasIntroTxt">{`Bienvenidos a nuestro programador de sesiones automático.\nAquí podrás reservar el tiempo que necesites para realizar tus\nproyectos en nuestros espacios.`}</p>
        <p className="reservasIntroSmall">{`Letra chica de la reserva: Lorem ipsum dolor sit amet consectetur adipisicing elit.\nQuam veritatis praesentium labore? Magni alias veniam pariatur ullam minus placeat voluptates officiis,\nmolestias harum dolores porro vel fugit libero fugiat facere.\nLorem ipsum dolor sit amet consectetur adipisicing elit.\nQuam veritatis praesentium labore? Magni alias veniam pariatur ullam minus placeat voluptates officiis,\nmolestias harum dolores porro vel fugit libero fugiat facere.\nLorem ipsum dolor sit amet consectetur adipisicing elit.\nQuam veritatis praesentium labore? Magni alias veniam pariatur ullam minus placeat voluptates officiis,\nmolestias harum dolores porro vel fugit libero fugiat facere.`}  </p>
      </div>         
        <SetPalaceReserve/>
        <SetDuoReserve />
        </div>
    )
}