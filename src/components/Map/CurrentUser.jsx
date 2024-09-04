import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Speedometer from './Speedometer';

function CurrentUser() {
  const [userPosition, setUserPosition] = useState(null);
  const [previousPosition, setPreviousPosition] = useState(null);
  const [userDirection, setUserDirection] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos = [latitude, longitude];
          
          if (previousPosition) {
            const angle = calculateAngle(previousPosition, newPos);
            setUserDirection(angle);
          }

          setPreviousPosition(newPos);
          setUserPosition(newPos);
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
  }, [previousPosition]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setSpeed(position.coords.speed || 0);
      },
      (error) => {
        console.error("Error getting speed:", error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const calculateAngle = (prevPos, newPos) => {
    const [lat1, lon1] = prevPos;
    const [lat2, lon2] = newPos;
    const deltaLon = lon2 - lon1;
    const y = Math.sin(deltaLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    return (angle + 360) % 360; // Normalize to 0-360 degrees
  };

  return (
    userPosition && (
      <div className='flex flex-col items-center'>
        <Marker
          key={'001'}
          position={userPosition}
          icon={
            new L.DivIcon({
              className: 'custom-marker',
              html: `
                <div class="marker-icon" style="transform: rotate(${360 - userDirection}deg);">
                  <img src="../navigator.svg" class="w-4 h-4 border-none bg-transparent outline-none" />
                </div>
              `,
              iconSize: [15, 25],
              popupAnchor: [0, -46]
            })
          }
        >
          <Popup>
            <Speedometer speed={speed} />
          </Popup>
        </Marker>
      </div>
    )
  );
}

export default CurrentUser;
