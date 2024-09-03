// BusStop.js
import React, { useEffect, useState, useRef } from 'react';
import { Circle, Popup, useMap, Marker } from 'react-leaflet';
import L from 'leaflet';

const BusStop = ({ busPositions }) => {
  const busStops = [
    { position: [27.61582, 84.54965], popupText: 'Jyamire Bus Stop' },
    { position: [27.62146, 84.51585], popupText: 'Tandi Bus Stop' },
    { position: [27.62273, 84.51230], popupText: 'Sauraha Bus Stop' },
    { position: [27.62974, 84.55343], popupText: 'temp Bus Stop' },
    { position: [27.62962, 84.55348], popupText: 'temp Bus Stop' },
    { position: [27.62962, 84.55332], popupText: 'temp Bus Stop' },
    { position: [27.65048, 84.53134], popupText: 'temp Bus Stop' },
  ];

  const map = useMap();
  const [showBusStops, setShowBusStops] = useState(false);
  const [timers, setTimers] = useState({}); // Countdown for each bus stop
  const [presenceTimers, setPresenceTimers] = useState({}); // Timeout for presence check
  const countdownRefs = useRef({}); // Refs to handle intervals

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

  // Monitor bus positions and handle countdown initiation/reset
  useEffect(() => {
    busStops.forEach((stop, index) => {
      let busInCircle = false;

      busPositions.forEach((busPos) => {
        const distance = map.distance(stop.position, busPos);

        if (distance <= 12) { // Bus enters the circle
          busInCircle = true;
          if (!presenceTimers[index] && !countdownRefs.current[index]) { // No active timeout or countdown
            const timerId = setTimeout(() => startCountdown(index), 5000); // Set timeout for 5 seconds
            setPresenceTimers((prevTimers) => ({ ...prevTimers, [index]: timerId }));
          }
        }
      });

      if (!busInCircle) { // Bus leaves the circle
        if (presenceTimers[index]) { // Clear pending timeout if bus leaves before 5 seconds
          clearTimeout(presenceTimers[index]);
          setPresenceTimers((prevTimers) => {
            const newTimers = { ...prevTimers };
            delete newTimers[index];
            return newTimers;
          });
        }
        if (timers[index] !== null && timers[index] !== undefined) { // Reset countdown if it was started
          resetCountdown(index);
        }
      }
    });

    return () => {
      // Cleanup on component unmount or on dependency change
      Object.values(presenceTimers).forEach(clearTimeout);
      Object.values(countdownRefs.current).forEach(clearInterval);
    };
  }, [busPositions, map, presenceTimers, timers]);

  const startCountdown = (index) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [index]: 180 // 3 minutes in seconds
    }));

    const countdownInterval = setInterval(() => {
      setTimers((prevTimers) => {
        if (prevTimers[index] > 0) {
          return {
            ...prevTimers,
            [index]: prevTimers[index] - 1
          };
        } else {
          clearInterval(countdownInterval);
          delete countdownRefs.current[index];
          return {
            ...prevTimers,
            [index]: 0
          };
        }
      });
    }, 1000);

    countdownRefs.current[index] = countdownInterval;

    // Clear the presence timeout once the countdown starts
    setPresenceTimers((prevTimers) => {
      const newTimers = { ...prevTimers };
      delete newTimers[index];
      return newTimers;
    });
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
      iconSize: [60, 15],
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
                interactive={false}
              />
            )}
          </>
        ))}
    </>
  );
};

export default BusStop;
