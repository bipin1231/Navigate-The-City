import React, { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";

const RoutingMachine = () => {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);
  const [isRoutingEnabled, setIsRoutingEnabled] = useState(false);

  useEffect(() => {
    if (map && isRoutingEnabled) {
      // Add routing control to the map
      const control = L.Routing.control({
        waypoints: [],
        routeWhileDragging: true,
        draggableWaypoints: true,
        removeWaypoints: true,
        geocoder: L.Control.Geocoder.nominatim(),
      }).addTo(map);

      setRoutingControl(control);
      return () => {
        // Cleanup control when component unmounts or isRoutingEnabled changes
        if (map && control) {
          map.removeControl(control);
        }
      };
    } else if (routingControl) {
      // Remove routing control from the map
      map.removeControl(routingControl);
      setRoutingControl(null);
    }
  }, [map, isRoutingEnabled, routingControl]);

  const toggleRouting = () => {
    setIsRoutingEnabled((prevState) => !prevState);
  };

  return (
    <button 
      className="absolute top-[70px] right-[30%] z-[1300] m-1" 
      onClick={toggleRouting}
    >
      <img src="../route-icon.png" className='w-15 h-8' alt="Routing Icon" />
    </button>
  );
};

export default RoutingMachine;
