import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import customIconUrl from "./batman.png";

function CurrentUser() {
  const [userPosition, setUserPosition] = useState(null);
  const [userDirection, setUserDirection] = useState(0);

  const markerIcon = new L.Icon({
    iconUrl: customIconUrl,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46],
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

  const iconWithRotation = L.divIcon({
    html: `<img src="${customIconUrl}" style="width: 35px; height: 45px; transform: rotate(${userDirection}deg);" />`,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    className: '', // Override any default styles
  });

  return (
    userPosition && (
      <Marker key={'001'} position={userPosition} icon={iconWithRotation}>
        <Popup>
          Current User Hello World. <br /> Easily customizable.
        </Popup>
      </Marker>
    )
  );
}

export default CurrentUser;
