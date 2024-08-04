"use client";

import { useState } from "react";
import Sets from "../components/Sets";
import Equipos from "../components/Equipos";
import Image from "next/image";

export default function Estudio() {
  const [displayEstudio, setDisplayStudio] = useState("set");

  return (
    <div>
      <div className="imgContainer">
        <Image
          src={"/estudios/estudiosImg4.jpg"}
          alt="Estudio"
          fill
          className="estudioImg"
        />
      </div>
      <div className="handleClickSetEstudioContainer">
        <div
          onClick={() => setDisplayStudio("set")}
          className="setEstudioBtn"
          style={
            displayEstudio === "set"
              ? { backgroundColor: "white", color: "black" }
              : { backgroundColor: "#232021", color: "white" }
          }
        >
          <p className="switchBtnEstudios">SET</p>
        </div>
          <div className="miniCamSet">
          <Image
              src={"/minicam.png"}
              alt="camera"
              className="cameraImg"
              width={30}
              height={43.5} 
            />
          </div>
        <div
          onClick={() => setDisplayStudio("equipos")}
          className="setEstudioBtn"
          style={
            displayEstudio === "equipos"
              ? { backgroundColor: "white", color: "black" }
              : { backgroundColor: "#232021", color: "white" }
          }
        >
          <p className="switchBtnEstudios">EQUIPOS</p>
        </div>
      </div>
      {displayEstudio === "set" ? <Sets /> : <Equipos />}
    </div>
  );
}
