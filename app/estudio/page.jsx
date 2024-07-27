'use client'

import { useState } from "react"
import Sets from "../components/Sets"
import Equipos from "../components/Equipos"
import { Video } from "../components/Video"
import Image from "next/image"


export default function Estudio () {
    const [displayEstudio, setDisplayStudio] = useState('set')
    
    return (
        <div>
        <div className="videoContainer">
        <Video url="estudio.mp4" />
      </div>
      <div className="handleClickSetEstudioContainer">
        <button onClick={()=>setDisplayStudio('set')} className="setEstudioBtn" style={displayEstudio === 'set' ? {backgroundColor: "black", color: "white"} : {backgroundColor: 'white', color: "black"}}>SET</button>
        <Image src={"/camara_icon.png"} alt="camera" width={30} height={43.5} className="cameraImg" />
        <button onClick={()=>setDisplayStudio('equipos')} className="setEstudioBtn" style={displayEstudio === 'equipos' ? {backgroundColor: "black", color: "white"} : {backgroundColor: 'white', color: "black"}}>EQUIPOS</button>
      </div>
        {displayEstudio === 'set' ? 
                <Sets /> :
                <Equipos /> }
        </div>




    )
}
