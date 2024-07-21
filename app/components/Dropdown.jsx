
'use client'
import React, { useState } from 'react';
const Dropdown = ({setHours}) => {
  const [selectedOption, setSelectedOption] = useState('Seleccionar opción');
  const [isOpen, setIsOpen] = useState(false);

 
  const options = Array.from({ length: 11,}, (_, i) => `${i + 2} hs`);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="selectedOption" onClick={() => setIsOpen(!isOpen)} onChange={setHours}>
        {selectedOption}
      </div>
     {isOpen && (
        <div className="options"><div
        className="option"
      >
        
      </div>
          {options.map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={() => handleOptionClick(option)}
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


