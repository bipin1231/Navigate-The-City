import React from "react";

const Speedometer = ({ speed }) => {
  return (
    <div className="flex items-center">
      <img src="../speedometer-icon.png" className="w-10 h-10"/>
      <p className="py-2">{speed.toFixed(2)} km/h</p>
    </div>
  );
};

export default Speedometer;
