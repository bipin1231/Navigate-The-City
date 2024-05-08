import React, { useState, useEffect } from "react";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

const RoutingMachine = ({ map }) => {
  const [routingControl, setRoutingControl] = useState(null);
  const [isRoutingEnabled, setIsRoutingEnabled] = useState(false);

  useEffect(() => {
    if (isRoutingEnabled) {
      // Add routing control to the map
      const control = L.Routing.control({
        waypoints: [],
        routeWhileDragging: true,
        draggableWaypoints: false,
        removeWaypoints: false,
        altLineOptions: {
          styles: [
            { color: "black", opacity: 0.15, weight: 9 },
            { color: "white", opacity: 0.8, weight: 6 },
            { color: "blue", opacity: 0.5, weight: 2 },
          ],
        },
        geocoder: L.Control.Geocoder.nominatim(),
      }).addTo(map);

      setRoutingControl(control);
    } else {
      // Remove routing control from the map
      if (routingControl) {
        map.removeControl(routingControl);
        setRoutingControl(null);
      }
    }
  }, [isRoutingEnabled]);

  const toggleRouting = () => {
    setIsRoutingEnabled((prevState) => !prevState);
  };

  return (
    <button className="absolute top-20 z-[1100] m-1" onClick={toggleRouting}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        />
      </svg>
    </button>
  );
};

export default RoutingMachine;
