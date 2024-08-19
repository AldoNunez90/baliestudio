"use client";
import { useState } from "react";
import Image from "next/image";

export default function Contacto() {
  const [requisition, setRequisition] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSending, setisSending] = useState(null);
  const [isOpen, setIsOpen] = useState(false)

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const refreshPage = ()=>{

    window.location.reload()
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (Object.values(formValues).every((value) => value.trim() !== "")) {
      setRequisition(false);
      setisSending(true)
      setIsOpen(true)
      try {
        const response = await fetch("/api/sendMail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        const result = await response.json();
        if (response.ok) {
          setisSending(false)
          setSuccess(result.message);
        } else {
          setisSending(false)
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    } else {
      setRequisition(true);
    }
  };
  const getInputStyle = (field) => {
    return isSubmitted && !formValues[field].trim()
      ? { outlinecolor: "red !important", border: "2px solid #b24646" }
      : {};
  };
  const getInputClass = (field) => {
    return isSubmitted && !formValues[field].trim() ? "error" : "inputContact";
  };
  const getTextAreaClass = (field) => {
    return isSubmitted && !formValues[field].trim() ? "error" : "messageLabel";
  };


  const FormContactResponse = ()=>{
     if(isSending){
    return  <div className="custom-loader"></div>
    } else if(success){
    return ( <><div className="successMessage">
      <Image src={"https://res.cloudinary.com/dsdzvhfhh/image/upload/v1722902344/logoOk_wxvkgt.png"} alt={"Send Ok"} fill className="sendMessageOk" />
      <div className="messageTxt">
      <p className="mesaggeTxtTitle">{`Tu mensaje ha sido enviado\nexitosamente.`}</p>
      <p className="messageTxtSubtitle">En breve nos estaremos comunicando con vos!</p>
      </div>
      </div>
      <div>
      <button onClick={()=>refreshPage()} className="startBookingBtn">Genial! </button>
    </div></>)
    } else if (error) {
    return  (<><div className="successMessage">
    <Image src={"https://res.cloudinary.com/dsdzvhfhh/image/upload/v1722902345/logoError_r0lo1t.png"} alt={"Send error"} fill className="sendMessageOk" />
    <div className="messageTxt">
    <p className="mesaggeTxtTitle">{`Ocurrió en error al enviar\ntu mensaje.`}</p>
    <p className="messageTxtSubtitle">Por favor, intenta de nuevo o escríbenos por nuestras redes.</p>
    </div>
    </div>
    <div>
    <button onClick={()=>refreshPage()} className="startBookingBtn">Volver </button>
  </div></>)
    } 
  }

  return (
    <div className="contactContainer">
      {/* misma intro que Reservas */}
      <div className="reservasIntroContainer">
        <p className="reservasIntroTitle">{`La familia\nBali Estudio\nte espera!`}</p>
        <p className="reservasIntroTxt">{`La creatividad se encuentra en el encanto\nde Buenos Aires! En nuestros 110 metros\ncuadrados, fusionamos la elegancia del estilo\nfrancés con el minimalismo moderno, ofreciendo\n3 sets diferentes para que tus ideas cobren vida.`}</p>
        <p className="contactTxtBold">{`Nos encantaría saber de vos :)`}</p>
      </div>
      <div className="formContact">
      {isOpen && <div className="overlayDialog"></div> }
      {isOpen && ( <dialog open className="dialogContactForm">
        <FormContactResponse />
        </dialog>)} 
        <form onSubmit={handleSubmit} className="formContactComponent">
          <p
            style={{
              color: "red",
              alignSelf: "center",
              transform: "translatey(-20px)",
              opacity: requisition ? 1 : 0,
            }}
          >
            Por favor, completa todos los datos
          </p>
          <label htmlFor="name"></label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre"
            className={getInputClass("name")}
            value={formValues.name}
            onChange={handleChange}
            style={getInputStyle("name")}
          />

          <label htmlFor="email"></label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Correo electrónico"
            className={getInputClass("name")}
            value={formValues.email}
            onChange={handleChange}
            style={getInputStyle("email")}
          />

          <label htmlFor="phone"></label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Teléfono"
            className={getInputClass("name")}
            value={formValues.phone}
            onChange={handleChange}
            style={getInputStyle("phone")}
          />

          <label htmlFor="message" className={getTextAreaClass("name")}>
            Mensaje
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            className="txtAreaFormContact"
            value={formValues.message}
            onChange={handleChange}
            style={getInputStyle("message")}
          />

          <button type="submit" className="btnStyle submitBtn">
            Enviar
          </button>
        </form>
      </div>
      <div className="imgFormContact">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.3597505282964!2d-58.38017529999999!3d-34.5950635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccab652bcfe57%3A0x48b0bf0cbd252c00!2sAv.%20Sta.%20Fe%20911%2C%20C1059ABD%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1723169951804!5m2!1ses-419!2sar"
          className="googleMap"
        ></iframe>
      </div>
    </div>
  );
}
