"use client";

import { useState } from "react";

export default function Faqs() {
  const options = [
    { id: 0, answer: "BALI Estudio" },
    { id: 1, answer: "2 horas" },
    { id: 2, answer: "Tienes 2 opciones:\n• Lo puedes hacer por el enlace en nuestra página o perfil\n• ¡Escríbenos! Cuéntanos cuándo nos quieres visitar y, con el\n50% de anticipo, ¡te lo reservamos!\n Un día antes te mandamos un mensaje de confirmación ¡y listo!\n¡Nos vemos pronto!",},
    { id: 3, answer: "Si, siempre y cuando no estén en uso o reservados" },
    { id: 4, answer: "Sí. Podemos armarte todo lo que necesites" },
    { id: 5, answer: "Cuando lo desees te podemos ayudar con el armado del Estilismo, la puesta en escena,\nmanejo de los equipos de iluminación, contratación de fotógrafos, maquilladores,\nfilmakers y cualquier otro requerimiento que tengas",},
    { id: 6, answer: "Nuestro horario es 24 horas." },
    { id: 7, answer: "¡Claro!!!! Puedes ingresar a nuestras instalaciones con 15 min de anticipación.\nAl set si puedes ingresar sólo en el horario reservado.\nAsí que te esperamos y nos tomamos un café.",},
    { id: 8, answer:"• Set seleccionado por ti\n• Flashes\n• Bajada de infinito (colores seleccionados)\n• Mobiliario\n• Accesorios de iluminación\n• Nuestra ayuda si la necesitas",},
  ];
  const [optionSelected, setOptionSelected] = useState(0);

  const Answer = ({ option }) => (
    <p className="answerOption">
      {options.map((opt) => option === opt.id && opt.answer )}</p>
  );


  return (
    <div className="faqContainer">
      <div className="questions">
        <div className="questionList">
          <h3 onClick={() => setOptionSelected(1)} className={`faqAnswer ${optionSelected === 1 ? 'selected' : ''}`}>
            ¿CUÁL ES EL TIEMPO MÍNIMO PARA ALQUILAR EL ESTUDIO?
          </h3>
          <h3 onClick={() => setOptionSelected(2)} className={`faqAnswer ${optionSelected === 2 ? 'selected' : ''}`} >
            ¿CUÁL ES EL PROCEDIMIENTO PARA REALIZAR UNA RESERVA?
          </h3>
          <h3 onClick={() => setOptionSelected(3)} className={`faqAnswer ${optionSelected === 3 ? 'selected' : ''}`}>
            ¿PUEDO UTILIZAR LOS ESPACIOS DE OTROS SETS?
          </h3>
          <h3 onClick={() => setOptionSelected(4)}className={`faqAnswer ${optionSelected === 4 ? 'selected' : ''}`} >¿ARMAN SETS A MEDIDA?</h3>
          <h3 onClick={() => setOptionSelected(5)} className={`faqAnswer ${optionSelected === 5 ? 'selected' : ''}`}>
            ¿CUÁNTO ES EL VALOR DE SU ASESORÍA EN LAS PRODUCCIONES?
          </h3>
          <h3 onClick={() => setOptionSelected(6)} className={`faqAnswer ${optionSelected === 6 ? 'selected' : ''}`}>
            ¿CUÁL ES EL HORARIO DEL ESTUDIO?
          </h3>
          <h3 onClick={() => setOptionSelected(7)} className={`faqAnswer ${optionSelected === 7 ? 'selected' : ''}`}>
            ¿SE PODRÍA CHUSMEAR EL ESTUDIO ANTES DE LA HORA RESERVADA?
          </h3>
          <h3 onClick={() => setOptionSelected(8)} className={`faqAnswer ${optionSelected === 8 ? 'selected' : ''}`}>¿QUÉ INCLUYE LA RESERVA?</h3>
        </div>
      </div>
      <div className="answers">
          <Answer option={optionSelected} />
      </div>
    </div>
  );
}
