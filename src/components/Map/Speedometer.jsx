import React from "react";

const Speedometer = ({ speed }) => {
  const displaySpeed = (speed != null) ? speed.toFixed(2) : 0;

  return (
    <div className="flex items-center justify-center w-[120px]">
      <img src="../speedometer-icon.png" className="w-10 h-10 -mt-2"/>
      <span>{displaySpeed} km/h</span>
    </div>
  );
};

export default Speedometer;
