// src/components/ToggleStatus.js
import React, { useState } from 'react';

const ToggleStatus = ({ onToggle }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
    onToggle(!isActive); // Call the function passed as a prop to handle toggle
  };

  return (
    <div
      onClick={handleToggle}
      className={`relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-all duration-300 ${
        isActive ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute left-0 top-0 bottom-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isActive ? 'translate-x-6' : ''
        }`}
      />
    </div>
  );
};

export default ToggleStatus;
