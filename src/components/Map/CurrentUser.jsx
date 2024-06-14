import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function CurrentUser() {
  const [userPosition, setUserPosition] = useState(null);
  const [userDirection, setUserDirection] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error occurred while retrieving location:', error);
        },
        { enableHighAccuracy: true }
      );

      return () => {
        navigator.geolocation.clearWatch(geoId);
      };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    const handleOrientation = (event) => {
      let compassHeading;
      if (event.absolute) {
        compassHeading = event.alpha;
      } else if (event.webkitCompassHeading) {
        compassHeading = event.webkitCompassHeading; // For Safari
      } else {
        compassHeading = 360 - event.alpha; // For other browsers
      }
      setUserDirection(compassHeading);
    };

    if (window.DeviceOrientationEvent) {
      let lastUpdate = Date.now();
      const throttleTime = 200; // Throttle time in ms

      const throttledHandleOrientation = (event) => {
        const now = Date.now();
        if (now - lastUpdate >= throttleTime) {
          handleOrientation(event);
          lastUpdate = now;
        }
      };

      window.addEventListener('deviceorientationabsolute', throttledHandleOrientation, true);
      window.addEventListener('deviceorientation', throttledHandleOrientation, true);

      return () => {
        window.removeEventListener('deviceorientationabsolute', throttledHandleOrientation, true);
        window.removeEventListener('deviceorientation', throttledHandleOrientation, true);
      };
    } else {
      console.error('Device orientation is not supported by this browser.');
    }
  }, []);

  // Update marker icon dynamically based on userDirection
  const markerIcon = new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div class="transform transition-transform duration-200" style="transform: rotate(${userDirection}deg);">
        <img src="../location.svg" class="w-9 h-11 border-none bg-transparent outline-none" />
      </div>
    `,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
  });

  return (
    userPosition && (
      <Marker key={'001'} position={userPosition} icon={markerIcon}>
        <Popup>
          Current User Hello World. <br /> Easily customizable.
        </Popup>
      </Marker>
    )
  );
}

export default CurrentUser;
