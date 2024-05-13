import React from "react";

const Speedometer = ({ speed }) => {
  return (
    <div className="absolute bottom-10 z-[1200]">
      <h3>Current Speed</h3>
      <p>{speed.toFixed(2)} km/h</p>
    </div>
  );
};

export default Speedometer;
