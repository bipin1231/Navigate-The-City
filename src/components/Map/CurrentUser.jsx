import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Speedometer from './Speedometer';

function CurrentUser() {
  const [userPosition, setUserPosition] = useState(null);
  const [userDirection, setUserDirection] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState('icon1');
  const [bottomPosition, setBottomPosition] = useState(0);
  const [speed, setSpeed] = useState(0);

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

      if (event.webkitCompassHeading) {
        // For Safari on iOS
        compassHeading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        // For other devices
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;

        if (typeof window.orientation !== 'undefined') {
          if (window.orientation === 0) {
            compassHeading = alpha;
          } else if (window.orientation === 90) {
            compassHeading = alpha - 90;
          } else if (window.orientation === -90) {
            compassHeading = alpha + 90;
          } else {
            compassHeading = alpha + 180;
          }
        } else {
          compassHeading = alpha;
        }

        // Normalize the compass heading to a 0-360 range
        if (compassHeading < 0) {
          compassHeading += 360;
        }
        if (compassHeading >= 360) {
          compassHeading -= 360;
        }
      } else {
        compassHeading = 0; // Default to 0 if no orientation data is available
      }

      setUserDirection(compassHeading);
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      };
    } else {
      console.error('Device orientation is not supported by this browser.');
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

  const createCustomIcon = (selectedIcon, userDirection) => {
    let iconUrl;
    switch (selectedIcon) {
      case 'icon1':
        iconUrl = '../navigator.svg';
        break;
      case 'icon2':
        iconUrl = '../car.svg';
        break;
      case 'icon3':
        iconUrl = '../taxi.svg';
        break;
      case 'icon4':
        iconUrl = '../bus.png';
        break;
      case 'icon5':
        iconUrl = '../bike.svg';
        break;
      default:
        iconUrl = '../navigator.svg';
    }

    return new L.DivIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-icon" style="transform: rotate(${360 - userDirection}deg);">
          <img src="${iconUrl}" class="w-4 h-4 border-none bg-transparent outline-none" />
        </div>
      `,
      iconSize: [15, 25],
      popupAnchor: [0, -46]
    });
  };

  const markerIcon = createCustomIcon(selectedIcon, userDirection);

  const handleIconChange = (event) => {
    setSelectedIcon(event.target.value);
  };

  return (
    userPosition && (
      <div className='flex flex-col items-center'>
        <Marker key={'001'} position={userPosition} icon={markerIcon}>
          <Popup>
            <Speedometer speed={speed} />
          </Popup>
        </Marker>
      </div>
    )
  );
}

export default CurrentUser;
