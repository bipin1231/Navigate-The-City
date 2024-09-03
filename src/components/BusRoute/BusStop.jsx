// BusStop.js
import React, { useEffect, useState, useRef } from 'react';
import { Circle, Popup, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';

const BusStop = ({ busPositions }) => {
  const busStops = [
    { position: [27.61582, 84.54965], popupText: 'Jyamire Bus Stop' },
    { position: [27.62146, 84.51585], popupText: 'Tandi Bus Stop' },
    { position: [27.62273, 84.51230], popupText: 'Sauraha Bus Stop' },
    // { position: [27.62953, 84.55358], popupText: 'temp Bus Stop' },
    { position: [27.62974, 84.55343], popupText: 'temp Bus Stop' },
    { position: [27.62962, 84.55348], popupText: 'temp Bus Stop' },
    { position: [27.62962, 84.55332], popupText: 'temp Bus Stop' },
    { position: [27.65048, 84.53134], popupText: 'temp Bus Stop' },
  ];

  const map = useMap();
  const [showBusStops, setShowBusStops] = useState(false);
  const [timers, setTimers] = useState({}); // Timers for each bus stop
  const countdownRefs = useRef({}); // Refs to handle countdowns

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

  // Detect if bus enters or leaves the circle
  useEffect(() => {
    const currentCountdowns = { ...countdownRefs.current };

    busStops.forEach((stop, index) => {
      let busInCircle = false;

      busPositions.forEach((busPos) => {
        const distance = map.distance(stop.position, busPos);
        console.log('Bus Positions:', busPositions);
console.log('Distance:', distance);

        if (distance <= 12) { // Bus enters the circle
          busInCircle = true;
          if (!timers[index] && !currentCountdowns[index]) { // No active countdown
            currentCountdowns[index] = setTimeout(() => {
              startCountdown(index);
            }, 5000); // Start countdown if bus stays for 5 seconds
          }
        }
      });

      if (!busInCircle) { // Bus leaves the circle
        if (currentCountdowns[index]) { // Clear pending timeout if bus leaves before 5 seconds
          clearTimeout(currentCountdowns[index]);
          delete currentCountdowns[index];
        }
        if (timers[index]) {
          resetCountdown(index);
        }
      }
    });

    countdownRefs.current = currentCountdowns;

    return () => {
      Object.values(countdownRefs.current).forEach(clearTimeout);
    };
  }, [busPositions, timers, map]);

  const startCountdown = (index) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [index]: 180 // 3 minutes in seconds
    }));

    const countdownInterval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTime = prevTimers[index] - 1;
        if (newTime <= 0) {
          clearInterval(countdownInterval);
          return { ...prevTimers, [index]: 0 };
        }
        return { ...prevTimers, [index]: newTime };
      });
    }, 1000);

    countdownRefs.current[index] = countdownInterval;
  };

  const resetCountdown = (index) => {
    clearInterval(countdownRefs.current[index]);
    setTimers((prevTimers) => ({
      ...prevTimers,
      [index]: null
    }));
    delete countdownRefs.current[index];
  };

  const createDivIcon = (text) => {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color:rgba(255, 255, 255, 0.8);padding:2px 4px;border-radius:4px;">${text}</div>`,
      iconSize: [60, 15], // Adjusted size for better visibility
    });
  };

  return (
    <>
      {showBusStops &&
        busStops.map((stop, index) => (
          <>
            <Circle
              key={`circle-${index}`}
              center={stop.position}
              radius={10}
              color="blue"
              fillColor="blue"
              fillOpacity={0.5}
            >
              <Popup>
                <span>{stop.popupText}</span>
              </Popup>
            </Circle>
            {timers[index] !== null && timers[index] !== undefined && (
              <Marker
                key={`timer-${index}`}
                position={stop.position}
                icon={createDivIcon(`Countdown: ${timers[index]}s`)}
                interactive={false} // Make marker non-interactive
              />
            )}
          </>
        ))}
    </>
  );
};

export default BusStop;
