import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Speedometer from './Speedometer';
import throttle from 'lodash/throttle';

function CurrentUser() {
  const [userPosition, setUserPosition] = useState(null);
  const [userDirection, setUserDirection] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState('icon1'); // Default selected icon
  const [bottomPosition, setBottomPosition] = useState(0);
  const [speed, setSpeed] = useState(0);

  const handleButtonClick = () => {
    setBottomPosition(bottomPosition === 0 ? 20 : 0);
  };

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

      // Update userDirection with throttled function
      updateDirection(alphaFiltered);
    };

    const throttledOrientationHandler = throttle(handleOrientation, 100); // Throttle to 100ms

    if (window.DeviceOrientationEvent) {
      // Event listeners for device orientation
      window.addEventListener('deviceorientationabsolute', throttledOrientationHandler, true);
      window.addEventListener('deviceorientation', throttledOrientationHandler, true);

      // Cleanup function
      return () => {
        window.removeEventListener('deviceorientationabsolute', throttledOrientationHandler, true);
        window.removeEventListener('deviceorientation', throttledOrientationHandler, true);
      };
    } else {
      console.error('Device orientation is not supported by this browser.');
    }

    // Function to update user direction with throttling
    function updateDirection(alpha) {
      setUserDirection(alpha);
    }

    // Clean up throttled function
    return () => {
      throttledOrientationHandler.cancel();
    };
  }, []);

  // Define marker icons
  const icon1 = new L.Icon({
    iconUrl: '../location.svg',
    iconSize: [35, 45],
    iconAnchor: [17, 46],
  });

  const icon2 = new L.Icon({
    iconUrl: '../car-marker-icon.jpg',
    iconSize: [35, 45],
    iconAnchor: [17, 46],
  });

  const icon3 = new L.Icon({
    iconUrl: '../bike-marker-icon.png',
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
        <Marker position={userPosition} icon={markerIcon} rotationAngle={userDirection}>
          <Popup>
            Current User Hello World. <br /> Easily customizable.
          </Popup>
        </Marker>
      </div>
    )
  );
}

export default CurrentUser;
