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

  // Function to create custom marker icon based on selected icon and user direction
  const createCustomIcon = (selectedIcon, userDirection) => {
    let iconUrl;
    switch (selectedIcon) {
      case 'icon1':
        iconUrl = '../marker-gif.gif';
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
        iconUrl = '../location.svg';
    }

    return new L.DivIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-icon" style="transform: rotate(${360 - userDirection}deg);">
          <img src="${iconUrl}" class="w-9 h-11 border-none bg-transparent outline-none" />
        </div>
      `,
      iconSize: [30, 40],
      iconAnchor: [17, 46],
      popupAnchor: [3, -46]
    });
  };

  // Determine current marker icon based on selectedIcon state
  const markerIcon = createCustomIcon(selectedIcon, userDirection);

  // Function to handle icon change
  const handleIconChange = (event) => {
    setSelectedIcon(event.target.value);
  };

  return (
    userPosition && (
      <div className='flex flex-col items-center'>
        <div className={`fixed ${bottomPosition === 0 ? 'bottom-[-70px] md:bottom-[-100px]' : 'bottom-0'} duration-200 bg-[#0328fc] rounded-t-lg w-[300px] h-[70px] md:w-[500px] md:h-[100px] z-[1300]`}>
          <div className='flex justify-center'>
            <button onClick={handleButtonClick}>
              <img src='../arrow-up.png' className='w-10 h-10 mt-[-35px]' />
            </button>
          </div>
          <div className='flex justify-between px-6'>
            <div className='text-white'>
              <Speedometer speed={speed} />
            </div>
            <select value={selectedIcon} onChange={handleIconChange} className='my-1 w-[40%]'>
              <option value="icon1">Tracker</option>
              <option value="icon2">Car</option>
              <option value="icon3">Taxi</option>
              <option value="icon4">Bus</option>
              <option value="icon5">Bike</option>
            </select>
          </div>
        </div>
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
