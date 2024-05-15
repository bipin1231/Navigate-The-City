import React from "react";

const Speedometer = ({ speed }) => {
  return (
    <div className="flex text-white">
      <img src="../speedometer-icon.png" className="w-10 h-10 mt-[-11px]"/>
      <p>{speed.toFixed(2)} km/h</p>
    </div>
  );
};

export default Speedometer;
