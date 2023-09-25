import React, { useState } from 'react';
import './TypeButton.css';

function TypeButton({ icon, label, onClick }) {
  // Define isActive as a state variable
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // Toggle the isActive state
    setIsActive(!isActive);
    onClick();
  };

  return (
    <button
      className={`h-full w-full transition-all duration-300 ${
        isActive ? 'type-button active' : 'type-button'
      }`}
      onClick={handleClick}
    >
      {icon}
      <div>{label}</div>
      {/* Check Icon */}
      <div
        className={`${
          isActive ? 'check check-active' : 'check'
        } trasition-all duration-300`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M15 3C8.373 3 3 8.373 3 15C3 21.627 8.373 27 15 27C21.627 27 27 21.627 27 15C27 8.373 21.627 3 15 3ZM21.707 12.707L14.147 20.267C13.959 20.455 13.705 20.56 13.44 20.56C13.175 20.56 12.92 20.455 12.733 20.267L9.28 16.814C8.889 16.423 8.889 15.791 9.28 15.4C9.671 15.009 10.303 15.009 10.694 15.4L13.44 18.146L20.293 11.293C20.684 10.902 21.316 10.902 21.707 11.293C22.098 11.684 22.098 12.316 21.707 12.707Z"
            fill="white"
          />
        </svg>
      </div>
    </button>
  );
}

export default TypeButton;
