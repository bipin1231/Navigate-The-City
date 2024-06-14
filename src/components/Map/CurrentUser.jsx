import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function CurrentUser() {
  const [userPosition, setUserPosition] = useState(null);
  const [userDirection, setUserDirection] = useState(0);

  // Debounce function to limit updates
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

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
    let alphaFiltered = 0;
    const alphaFilterFactor = 0.2; // Adjust filter factor as needed

    const handleOrientation = (event) => {
      let alpha;
      if (event.absolute) {
        alpha = event.alpha;
      } else if (event.webkitCompassHeading) {
        alpha = event.webkitCompassHeading; // For Safari
      } else {
        alpha = 360 - event.alpha; // For other browsers
      }

      alphaFiltered = alphaFiltered * (1 - alphaFilterFactor) + alpha * alphaFilterFactor;

      // Update userDirection using debounced setUserDirection
      debouncedSetUserDirection(alphaFiltered);
    };

    // Debounced setUserDirection function
    const debouncedSetUserDirection = debounce((value) => {
      setUserDirection(value);
    }, 50); // Adjust debounce delay as needed (reduced to 50ms for faster updates)

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);

      return () => {
        window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    } else {
      console.error('Device orientation is not supported by this browser.');
    }
  }, []);

  // Define marker icon with correct styling
  const markerIcon = new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div class="transform transition-transform duration-200" style="transform: rotate(${360 - userDirection}deg);">
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
