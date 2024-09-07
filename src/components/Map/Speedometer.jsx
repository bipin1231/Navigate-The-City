import React from "react";

const Speedometer = ({ speed }) => {
  const displaySpeed = (speed != null) ? speed.toFixed(2) : 0;

  return (
    <div className="flex items-center w-[100px]">
      <img src="../speedometer-icon.png" className="w-10 h-10 -mt-2"/>
      <span>Speed: {displaySpeed} km/h</span>
    </div>
  );
};

export default Speedometer;
