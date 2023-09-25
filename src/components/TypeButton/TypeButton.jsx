import React, { useState } from "react";
import './TypeButton.css';

function TypeButton({ icon, label }) {
  // Define isActive as a state variable
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // Toggle the isActive state
    setIsActive(!isActive);
  };

  return (
    <button 
      className={isActive ? "type-button active" : "type-button"}
      onClick={handleClick}
    >
      {icon}
      <div>{label}</div>
    </button>
  );
}

export default TypeButton;
