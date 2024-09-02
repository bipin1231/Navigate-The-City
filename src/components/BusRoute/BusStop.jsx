// BusStop.js
import React, { useEffect, useState } from 'react';
import { Circle, Popup, useMap } from 'react-leaflet';

const BusStop = () => {
  // Array of bus stop coordinates and popup text
  const busStops = [
    { position: [27.61582, 84.54965], popupText: 'Jyamire Bus Stop' },
    { position: [27.62146, 84.51585], popupText: 'Tandi Bus Stop' },
    { position: [27.62273, 84.51230], popupText: 'Sauraha Bus Stop' },
    { position: [27.62953, 84.55358], popupText: 'temp Bus Stop' },
  ];

  const map = useMap(); // Access the map instance
  const [showBusStops, setShowBusStops] = useState(false); // State to control visibility of bus stops

  useEffect(() => {
    const handleZoom = () => {
      setShowBusStops(map.getZoom() > 12); // Show bus stops only if zoom level is below 12
    };

    map.on('zoomend', handleZoom); // Add zoom event listener

    // Set initial visibility based on current zoom level
    handleZoom();

    // Cleanup function to remove the event listener
    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map]);

  return (
    <>
      {showBusStops && // Render circles only if showBusStops is true
        busStops.map((stop, index) => (
          <Circle
            key={index}
            center={stop.position}
            radius={5} // Radius in meters
            color="blue" // Circle border color
            fillColor="blue" // Circle fill color
            fillOpacity={0.5} // Circle fill opacity
          >
            <Popup>
              <span>{stop.popupText}</span>
            </Popup>
          </Circle>
        ))
      }
    </>
  );
};

export default BusStop;
