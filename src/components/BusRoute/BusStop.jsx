import React, { useEffect, useState } from 'react';
import { Popup, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';
// import busStopIconUrl from './busStopIcon.png';  // Import the bus stop icon image

const BusStop = () => {
  const busStops = [
    { position: [27.61582, 84.54965], popupText: 'Jyamire Bus Stop' },
    { position: [27.62146, 84.51585], popupText: 'Tandi Bus Stop' },
    { position: [27.62273, 84.51230], popupText: 'Sauraha Bus Stop' },
    { position: [27.61210, 84.57001], popupText: 'Parsa Bus Stop' },
    { position: [27.67063, 84.43938], popupText: 'Bharatpur Bus Stop' },
  ];

  const map = useMap();
  const [showBusStops, setShowBusStops] = useState(false);

  useEffect(() => {
    const handleZoom = () => {
      setShowBusStops(map.getZoom() > 12);
    };
    map.on('zoomend', handleZoom);
    handleZoom();

    return () => {
      map.off('zoomend', handleZoom);
    };
  }, [map]);

  // Create a custom bus stop icon
  const busStopIcon = L.icon({
    iconUrl: '../bus-stop.png', 
    iconSize: [25, 25],  
    // iconAnchor: [15, 30],     
    popupAnchor: [0, -10],  
  });

  return (
    <>
      {showBusStops &&
        busStops.map((stop, index) => (
          <Marker
            key={`marker-${index}`}
            position={stop.position}
            icon={busStopIcon}
          >
            <Popup>
              <span>{stop.popupText}</span>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default BusStop;
