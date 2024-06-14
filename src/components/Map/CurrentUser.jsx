import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function CurrentUser() {
  const [userPosition, setUserPosition] = useState(null);
  const [userDirection, setUserDirection] = useState(0);

  useEffect(() => {
    // Function to update user position
    const updateUserPosition = (position) => {
      const { latitude, longitude } = position.coords;
      setUserPosition([latitude, longitude]);
    };

    if (navigator.geolocation) {
      // Watch for position changes
      const geoId = navigator.geolocation.watchPosition(
        updateUserPosition,
        (error) => {
          console.error('Error occurred while retrieving location:', error);
        },
        { enableHighAccuracy: true }
      );

      // Cleanup function
      return () => {
        navigator.geolocation.clearWatch(geoId);
      };
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    let alphaFiltered = 0;
    const alphaFilterFactor = 0.1; // Adjust filter factor as needed

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

      setUserDirection(alphaFiltered);
    };

    if (window.DeviceOrientationEvent) {
      // Event listeners for device orientation
      window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      window.addEventListener('deviceorientation', handleOrientation, true);

      // Cleanup function
      return () => {
        window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    } else {
      console.error('Device orientation is not supported by this browser.');
    }
  }, []);

  // Marker icon definition
  const markerIcon = new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-icon" style="transform: rotate(${360 - userDirection}deg);">
        <img src="../location.svg" class="w-9 h-11" style="border: none; background-color: transparent;" />
      </div>
    `,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
  });

  return (
    userPosition && (
      <Marker position={userPosition} icon={markerIcon}>
        <Popup>
          Current User Hello World. <br /> Easily customizable.
        </Popup>
      </Marker>
    )
  );
}

export default CurrentUser;
