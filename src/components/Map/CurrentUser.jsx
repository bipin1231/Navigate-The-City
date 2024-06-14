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

  const handleButtonClick = () => {
    setBottomPosition(bottomPosition === 0 ? 20 : 0);
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

  // Define marker icons
  const icon1 = new L.Icon({
    className: 'custom-marker',
    html: `
      <div class="marker-icon" style="transform: rotate(${360 - userDirection}deg);">
        <img src="../location.svg" class="w-9 h-11 border-none bg-transparent outline-none" />
      </div>
    `,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
  });

  const icon2 = new L.Icon({
    className: 'custom-marker',
    html: `
      <div class="marker-icon" style="transform: rotate(${360 - userDirection}deg);">
        <img src="../car-marker-icon.jpg" class="w-9 h-11 border-none bg-transparent outline-none" />
      </div>
    `,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
  });

  const icon3 = new L.Icon({
    className: 'custom-marker',
    html: `
      <div class="marker-icon" style="transform: rotate(${360 - userDirection}deg);">
        <img src="../bike-marker-icon.png" class="w-9 h-11 border-none bg-transparent outline-none" />
      </div>
    `,
    iconSize: [35, 45],
    iconAnchor: [17, 46],
  });

  // Function to handle icon change
  const handleIconChange = (event) => {
    setSelectedIcon(event.target.value);
  };

  // Determine current marker icon based on selectedIcon state
  let markerIcon;
  if (selectedIcon === 'icon1') {
    markerIcon = icon1;
  } else if (selectedIcon === 'icon2') {
    markerIcon = icon2;
  } else if (selectedIcon === 'icon3') {
    markerIcon = icon3;
  }

  useEffect(() => {
    // Watch user's position and update speed
    const watchId = navigator.geolocation.watchPosition(
       (position) => {
         setSpeed(position.coords.speed || 0);
       },
       (error) => {
         console.error("Error getting speed:", error);
       }
     );
 
     return () => {
       // Clean up the watchPosition when component unmounts
       navigator.geolocation.clearWatch(watchId);
     };
   }, []);

  return (
    userPosition && (
      <div className='flex flex-col items-center'>
      <div className={`fixed ${bottomPosition === 0 ? 'bottom-[-100px]' : 'bottom-0'} duration-200 bg-blue-500 rounded-t-lg w-[500px] h-[100px] z-[1300]`}>
        <div className='flex justify-center mt-[-30px]'>
            <button onClick={handleButtonClick}>
            <img src='../arrow-up.png' className='w-10 h-10' />
            </button>
        </div>
        <div>
        <Speedometer speed={speed} />
        <select value={selectedIcon} onChange={handleIconChange}>
            <option value="icon1">Tracker</option>
            <option value="icon2">Car</option>
            <option value="icon3">Bike</option>
          </select>
        </div>
  </div>
      <Marker key={'001'} position={userPosition} icon={markerIcon}>
        <Popup>
          Current User Hello World. <br /> Easily customizable.
        </Popup>
      </Marker>
    </div>
    )
  );
}

export default CurrentUser;
