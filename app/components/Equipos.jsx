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
            <p className="equipoTitle">ILUMINACIÓN</p>
            <p>
              {`•  2 FLASH VISICO 1000W\n•  EMISOR DISPARADOR RADIO P/FLASH VISICO\n•  FLASH GODOX SK 300 II\n•  FLASH GODOX SK 400 II\n•  CONTROL REMOTO INALÁMBRICO Y DISPARADOR GODOX\n•  LUZ CONTINUA LED BI COLOR GODOX 150 W\n•  3 PANELES LED VISICO 50W\n•  2 PANELES LED PHOPIK 10W\n•  JIRAFA GODOX 1.80 MTS\n•  JIRAFA DE ACERO INOX C/BRAZO 3 MTS\n•  2 SOPORTE PORTA FONDO PROFESIONAL 3 MTS\n•  2 SOPORTE PORTA FONDO EN “T”\n•  2 SOPORTE PANTALLA REFLECTORA EXTENSIBLE`}
            </p>
            <a href="/iluminacion.pdf" download="Iluminacion.pdf">
              <button onClick={downloadPdf} className="downloadBtn">
                DESCARGAR LISTADO
              </button>
            </a>
          </div>
        </div>
        <div className="iluminacionVideoContainer">
          <Video url="/iluminacionVideo.mp4" width={1080} />
        </div>
      </section>
      <section className="modificadoresContainer">
        <div className="modificadoresVideoContainer">
        <Video url={"/modificadoresVideo.mp4"} width={1080} />
        </div>
        <div className="modificadoresTxtContainer">
          <div className="modificadoresTxt">
          <p className="equipoTitle">MODIFICADORES</p>
          <p>{`•  SOFT BOX STRIP VISICO 35X140 CM\n•  SOFT BOX STRIP VISICO 20X90 CM\n•  2 SOFT BOX 70X100 CM\n•  SOFT BOX OCTO BOX 95 CM CON GRILLA\n•  SOFT BOX OCTO BOX 170 CM CON GRILLA\n•  EYELIGTHER 180*60 CM\n•  5 EN 1 DE 110 CM\n•  BARNDOOR CON FILTROS DE COLOR\n•  3 SNOOT CON FILTROS DE COLORES\n•  SOMBRILLA GODOX TRANSLÚCIDOS 84 CM\n•  SOMBRILLA PLATEADA GODOX 101 CM\n•  SNOOT OPTICO C/ LENTE INCORPORADO`}</p>
          <p><small> {`   15 FORMAS Y 5 GELES DE COLORES`}</small></p>
          <a href="/modificadores.pdf" download="Modificadores.pdf">
              <button onClick={downloadPdf} className="downloadBtn">
                DESCARGAR LISTADO
              </button>
            </a>
          </div>
        </div>
      </section>
      <section className="fondosContainer">
        <div className="fondosTxtContainer">
          <div className="fondosTxt">
            <p className="equipoTitle">FONDOS INFINITOS</p>
            <p>{`•  BLANCO\n•  NEGRO\n•  GRIS \n•  VERDE / CHROMA KEY`} </p>
            <a href="/fondos.pdf" download="Fondos.pdf">
              <button onClick={downloadPdf} className="downloadBtn">
                DESCARGAR LISTADO
              </button>
            </a>
          </div>
        </div>
        <div className="iluminacionVideoContainer">
          <Video url="/iluminacionVideo.mp4" width={1080} />
        </div>
      </section>
      <section className="complementariosContainer">
      <div className="complementariosVideoContainer">
          <Video url="/complementariosVideo.mp4" width={1080} />
        </div>
        <div className="complementariosTxtContainer">
          <div className="complementariosTxt">
            <p className="equipoTitle">COMPLEMENTARIOS</p>     
            <p>{`•  BASE 360 DE 70 CM DE DIÁMETRO\n•  PROYECTOR LED 7000 L FULL HD 4K\n•  MONITOR DE 32" SOPORTE FIJO \n•  MONITOR DE 32" SOPORTE MÓVIL`} </p>
            <a href="/complementarios.pdf" download="complementarios.pdf">
              <button onClick={downloadPdf} className="downloadBtn">
                DESCARGAR LISTADO
              </button>
            </a>
          </div>
        </div>
      </section>
      <section className="utileriaContainer">
        <div className="utileriaTxtContainer">
          <div className="utileriaTxt">
            <p className="equipoTitle">{`UTILERÍA\n& ESCENOGRAFÍA`}</p>
            <p>{`•  ARCADA 3D\n•  VENTILADOR\n•  PAPEL MYLAR\n•  TELGOPOR BLANCO 2 MTS X 1 MTS\n•  TELA BLACK OUT\n•  SILLAS\n•  SILLONES\n•  FLOREROS\n•  ENREDADERAS ARTIFICIALES\n•  CUADROS\n•  LUCES\n•  FONDO INFINITO`}</p><p>(BLANCO, NEGRO, GRIS & CHROMA KEY)</p>
            <a href="/utileria.pdf" download="utileria.pdf">
              <button onClick={downloadPdf} className="downloadBtn">
                DESCARGAR LISTADO
              </button>
            </a>
          </div>
        </div>
        <div className="iluminacionVideoContainer">
          <Video url="/utileriaVideo.mp4" width={1080} />
        </div>
      </section>
    </div>
  );
}
