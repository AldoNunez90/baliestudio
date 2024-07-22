
'use client'
import React, { useState,  } from 'react';
const Dropdown = ({ onSelectChange }) => {
  const [value, setValue] = useState('Seleccionar opción');
  const [isOpen, setIsOpen] = useState(false);
  
 
  const options = Array.from({ length: 11,}, (_, i) => `${i + 2}`+ ` hs`);
 
  const handleSelect = (option)=>{
    setValue(option)
    onSelectChange(option)
    setIsOpen(!isOpen)
    }

  return (
    <div className="dropdown">
      <div className="selectedOption" onClick={() => setIsOpen(!isOpen)}  >
        {value}
      </div>
     {isOpen && (
        <div className="options">
          <div className="option">
        </div>
          {options.map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={()=>handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>

    
  );
};

export default Dropdown;


