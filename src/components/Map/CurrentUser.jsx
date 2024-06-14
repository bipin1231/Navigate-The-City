import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import customIconUrl from "./batman.png";

function CurrentUser() {
  const [userPosition, setUserPosition] = useState(null);
  const [userDirection, setUserDirection] = useState(0);

  const markerIcon = new L.DivIcon({
    html: `
      <div class="transform transition-transform duration-200" style="transform: rotate(${userDirection}deg);">
        <img src="../location.svg" class="w-9 h-11 border-none bg-transparent outline-none" />
      </div>
    `,
    className: 'custom-marker', // Custom class for additional styling
    iconSize: [35, 45],
    iconAnchor: [17, 46],
  });

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
    if (window.DeviceOrientationEvent) {
      const handleOrientation = (event) => {
        const compassHeading = event.webkitCompassHeading || Math.abs(event.alpha - 360);
        setUserDirection(compassHeading);
      };

      window.addEventListener('deviceorientation', handleOrientation, true);

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    } else {
      console.error('Device orientation is not supported by this browser.');
    }
  }, []);

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
