import React from "react";

const Speedometer = ({ speed }) => {
  return (
    <div className="absolute bottom-10 z-[1200] flex bg-white">
      <img src="../speedometer-icon.png" className="w-10 h-10 mt-[-11px]"/>
      <p>{speed.toFixed(2)} km/h</p>
    </div>
  );
};

export default Speedometer;
