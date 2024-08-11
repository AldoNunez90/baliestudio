import { useState } from "react";


export default function FormContact(createReserve){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("");

console.log(name);

    return(
        <form onSubmit={createReserve}>
        <div className="form-group">
          <label htmlFor="name">NOMBRE Y APELLIDO:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Nombre"
            required
            className="inputForm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">MAIL:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="inputForm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">TELEFONO:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            required
            className="inputForm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventType">
            ¿Qué tipo de contenido quieres generar en nuestros espacios?
          </label>
          <select
            id="eventType"
            name="eventType"
            value={eventType}
            onChange={(e)=>setEventType(e.target.value)}
            required
            className="inputForm"
          >
            <option value="">Seleccionar...</option>
            <option value="Producción audiovisual">
              Producción audiovisual
            </option>
            <option value="Sesión de fotos">Sesión de fotos</option>
            <option value="Master Class">Master Class</option>
            <option value="Encuentros">Encuentros</option>
            <option value="Seminarios">Seminarios</option>
            <option value="Eventos empresariales">
              Eventos empresariales
            </option>
          </select>
        </div>
        <button type="submit" className="confirmBtn">
          CONFIRMAR RESERVA
        </button>
      </form>
    )
}