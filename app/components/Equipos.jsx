"use client";

import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Video } from "./Video";

export default function Equipos() {
  const sectionRef = useRef();

  const downloadPdf = () => {
    const section = sectionRef.current;
    html2canvas(section).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="equiposContainer">
        <section className="iluminacionContainer">
      <div className="iluminacionTxtContainer">
        <div className="iluminacionTxt">
        <h3>ILUMINACIÓN</h3>
        <p>
          {`•  2 FLASH VISICO 1000W\n•  EMISOR DISPARADOR RADIO P/FLASH VISICO\n•  FLASH GODOX SK 300 II\n•  FLASH GODOX SK 400 II\n•  CONTROL REMOTO INALÁMBRICO Y DISPARADOR GODOX\n•  LUZ CONTINUA LED BI COLOR GODOX 150 W\n•  3 PANELES LED VISICO 50W\n•  2 PANELES LED PHOPIK 10W\n•  JIRAFA GODOX 1.80 MTS\n•  JIRAFA DE ACERO INOX C/BRAZO 3 MTS\n•  2 SOPORTE PORTA FONDO PROFESIONAL 3 MTS\n•  2 SOPORTE PORTA FONDO EN “T”\n•  2 SOPORTE PANTALLA REFLECTORA EXTENSIBLE`}
        </p>
        <a href="/iluminacion.pdf" download="Iluminacion.pdf">
          <button onClick={downloadPdf}>DESCARGAR LISTADO</button>
        </a>
        </div>
      </div>
      <div className="iluminacionVideoContainer">
        <Video url="/iluminacionVideo.mp4" width={1080} />
      </div>
        </section>

        <section className="modificadoresContainer"></section>
    </div>
  );
}
