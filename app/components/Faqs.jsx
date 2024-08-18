"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";


export default function Faqs() {
  const options = [
    { id: 1, answer: "2 horas" },
    { id: 2, answer: "Tienes dos opciones:\n\n• Lo puedes hacer desde nuestra web en RESERVAS\n• ¡Escríbenos! Cuéntanos cuándo nos quieres visitar y,\n   con el 50% de anticipo, ¡te lo reservamos! Un día antes\n   te mandamos un mensaje de confirmación ¡y listo!\n\n  ¡Nos vemos pronto!"},
    { id: 3, answer: "Si, siempre y cuando no estén en uso o reservados" },
    { id: 4, answer: "Sí. Podemos armarte todo lo que necesites" },
    { id: 5, answer: "Cuando lo desees te podemos ayudar con el armado del\nEstilismo, la puesta en escena, manejo de los equipos de\niluminación,contratación de fotógrafos, maquilladores,\nfilmakers y cualquier otro requerimiento que tengas"},
    { id: 6, answer: "Nuestro horario es 24 horas." },
    { id: 7, answer: "¡Claro!!!! Puedes ingresar a nuestras instalaciones\ncon 15 min de anticipación. Al set si puedes ingresar\nsólo en el horario reservado.\n\nAsí que te esperamos y nos tomamos un café."},
    { id: 8, answer:"• Set seleccionado por ti\n• Flashes\n• Bajada de infinito (colores seleccionados)\n• Mobiliario\n• Accesorios de iluminación\n• Nuestra asistencia para la manipulación de los equipos"},
    { id: 9, answer:"Si, contamos con fondo infinito de cartulina en diversos colores"},
    { id: 10, answer:"Es un SI total y te ayudamos a que te quede genial"}
  ];
  const [optionSelected, setOptionSelected] = useState(0);
  const answerRef = useRef({});
  
  useEffect(()=>{
    if (answersRef.current) {
      answersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
      
      }, [optionSelected]);
      


  const handleClick = (id)=>{
    setOptionSelected(id)
     
  }

  const Answer = ({ option }) => (
    option === 0 ? <Image src={"/baliLogoWhite.png"} alt="logo Bali" width={503} height={142} className="baliLogoFaqs" /> : <p className="answerOption">{options.map((opt) => option === opt.id && opt.answer )}</p>
  );


  return (
    <div className="faqContainer">
      <div className="questions">
        <div className="questionList">
          <h3 onClick={() => handleClick(4)}className={`faqAnswer ${optionSelected === 4 ? 'selected' : ''}`} >¿ARMAN SETS A MEDIDA?</h3>
          <h3 onClick={() => handleClick(8)} className={`faqAnswer ${optionSelected === 8 ? 'selected' : ''}`}>¿QUÉ INCLUYE LA RESERVA?</h3>
          <h3 onClick={() => handleClick(9)} className={`faqAnswer ${optionSelected === 9 ? 'selected' : ''}`}>¿CONTAMOS CON FONDO INFINITO?</h3>
          <h3 onClick={() => handleClick(6)} className={`faqAnswer ${optionSelected === 6 ? 'selected' : ''}`}>
            ¿CUÁL ES EL HORARIO DEL ESTUDIO?
          </h3>
          <h3 onClick={() => handleClick(3)} className={`faqAnswer ${optionSelected === 3 ? 'selected' : ''}`}>
            ¿PUEDO UTILIZAR LOS ESPACIOS DE OTROS SETS?
          </h3>
          <h3 onClick={() => handleClick(10)} className={`faqAnswer ${optionSelected === 10 ? 'selected' : ''}`}>¿PUEDO REALIZAR CONTENIDO CON MI TELÉFONO?</h3>
          <h3 onClick={() => handleClick(1)} className={`faqAnswer ${optionSelected === 1 ? 'selected' : ''}`}>
            ¿CUÁL ES EL TIEMPO MÍNIMO PARA ALQUILAR EL ESTUDIO?
          </h3>
          <h3 onClick={() => handleClick(5)} className={`faqAnswer ${optionSelected === 5 ? 'selected' : ''}`}>
          ¿PUEDEN ENCARGARSE DE LA PRODUCCION DE MIS FOTOS?
          </h3>
          <h3 onClick={() => handleClick(2)} className={`faqAnswer ${optionSelected === 2 ? 'selected' : ''}`} >
            ¿CUÁL ES EL PROCEDIMIENTO PARA REALIZAR UNA RESERVA?
          </h3>
          <h3 onClick={() => handleClick(7)} className={`faqAnswer ${optionSelected === 7 ? 'selected' : ''}`}>
            ¿SE PODRÍA CHUSMEAR EL ESTUDIO ANTES DE LA HORA RESERVADA?
          </h3>
        </div>
      </div>
      <div className="answers" ref={answerRef}>
          <Answer option={optionSelected} />
      </div>
    </div>
  );
}
