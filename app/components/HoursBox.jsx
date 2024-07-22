import { useState } from "react";


export default function HoursBox ({onClick}) {

    const options = Array.from({ length: 15,}, (_, i) => `${i + 8}`+ `:00`);
    const [selectedHours, setSelectedHours] = useState([])
    // const handleClick = (e)=>{
    //    onClick(e.target.textContent)
    // }
    const handleClick = (hour) => {
        const selectedIndex = selectedHours.indexOf(hour);
        if (selectedIndex === -1) {
            setSelectedHours([...selectedHours, Number(hour)]); // Agregamos el horario seleccionado al array
        } else {
            setSelectedHours(selectedHours.filter((h) => h !== hour)); // Removemos el horario seleccionado del array
        }
        console.log(typeof(hour))
        // onClick(hour); // Llamamos a la función onClick con el array de horarios seleccionados
    };
    
      const isSelected = (hour) => {
        return selectedHours.includes(hour);
      };
    
      const isBetweenSelectedHours = (hour) => {
        const minHour = Math.min(...selectedHours);
        const maxHour = Math.max(...selectedHours);
        return hour >= minHour && hour <= maxHour;
      };
    

    return(
        <div className="hoursBoxHero">
            <div className="hoursBoxContainer">
                <p className="hourBoxesText">Selecciona por favor la franja horaria que desees</p>
                <div className="hoursBoxes">
                {options.map((option, index) => (
                    <div value={option} key={index} className={`hourBoxBtn ${isSelected(option) || isBetweenSelectedHours(option) ? 'selected' : ''}`} onClick={() => handleClick(option)}>
                        {option}
                    </div>))}
                </div>
            </div>
        </div>

    )
}