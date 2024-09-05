import React from "react";

const Speedometer = ({ speed }) => {
  return (
    <div className="flex items-center">
      <img src="../speedometer-icon.png" className="w-10 h-10 -mt-2"/>
      <span>{speed.toFixed(2)} km/h</span>
    </div>
  );
};

export default Speedometer;
