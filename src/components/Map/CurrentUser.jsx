import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Speedometer from './Speedometer';

function CurrentUser() {
  const [userPosition, setUserPosition] = useState(null);
  const [userDirection, setUserDirection] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos = [latitude, longitude];
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
  }, []);

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

  useEffect(() => {
    const handleOrientation = (event) => {
      const alpha = event.alpha; // Device's rotation around the z-axis
      setUserDirection(alpha);
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

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
              popupAnchor: [0, -25]
            })
          }
        >
          <Popup>
            <div className='flex items-center flex-col'>
              <span className="font-semibold">
                YOU
              </span>
              <Speedometer speed={speed} />
            </div>
          </Popup>
        </Marker>
      </div>
    )
  );
}

export default CurrentUser;
