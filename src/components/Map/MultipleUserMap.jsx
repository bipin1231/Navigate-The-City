import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import Speedometer from './Speedometer';
import BusStop from '../BusRoute/BusStop';

const nepalBounds = L.latLngBounds(
  L.latLng(26.347, 80.058), // South-West
  L.latLng(30.447, 88.201) // North-East
);

const baseLayers = {
  Normal: L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  ),
};

function useDeviceOrientation() {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const handleOrientation = (event) => {
      const { alpha } = event;
      setHeading(alpha);
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return heading;
}

function MultipleUserMap() {
  const status = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);
  const [isLocationStored, setLocationStored] = useState(false);
  const [users, setUsers] = useState([]);
  const [position, setPosition] = useState([]);
  const [previousPositions, setPreviousPositions] = useState({});
  const [angles, setAngles] = useState({});
  const [busPositions, setBusPositions] = useState([]);
  const heading = useDeviceOrientation(); // Get device orientation

  useEffect(() => {
    const fetchUserLocation = async () => {
      const data = await service.fetchUserLocation();
      const userLocations = data.documents.map((doc) => ({
        userId: doc.userId,
        position: [doc.latitude, doc.longitude],
        heading: doc.heading, // Get the heading from the database
      }));
      const validUserLocations = userLocations.filter(user => user.position[0] !== null);
      setUsers(validUserLocations);
    };
    fetchUserLocation();
    const intervalId = setInterval(fetchUserLocation, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (status && navigator.geolocation) {
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);

          // Store location and heading (device orientation) in database
          if (!isLocationStored) {
            const storeLoc = async () => {
              setLocationStored(true);
              const data = await service.storeUserLocation({
                userId: userData.$id,
                name: userData.name,
                latitude,
                longitude,
                heading, // Store the orientation
              });
              setLocationStored(false);
            };
            storeLoc();
          }
        },
        (error) => console.error('Error occurred while retrieving location:', error),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(geoId);
    }
  }, [position, heading]);

  useEffect(() => {
    if (users.length > 0) {
      setPreviousPositions(prev => {
        const newPos = {};
        users.forEach(user => {
          newPos[user.userId] = user.position;
        });
        return newPos;
      });

      setAngles(prevAngles => {
        const newAngles = {};
        users.forEach(user => {
          const prevPos = previousPositions[user.userId];
          const newPos = user.position;
          const angle = prevPos ? calculateAngle(prevPos, newPos) : user.heading;
          newAngles[user.userId] = angle;
        });
        return newAngles;
      });
    }
  }, [users]);

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
    <div className='h-[100vh] w-full relative flex flex-col items-center mt-20'>
      <MapContainer
        center={[27.68167, 84.43007]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        maxZoom={18}
        minZoom={7.5}
        maxBounds={nepalBounds}
        maxBoundsViscosity={0.8}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {users.map(user => {
          if (user.position[0] == null) return null;
          const angle = angles[user.userId] || 0;
          const isCurrentUser = userData && user.userId === userData.$id;
          const iconSrc = isCurrentUser ? '../navigator.svg' : 'bus.png';

          return (
            <Marker
              key={user.userId}
              position={user.position}
              icon={new L.divIcon({
                html: `<div style="transform: rotate(${360 - angle}deg);">
                        <img src="${iconSrc}" style="width: 15px; height: 25px;" alt="Bus Icon"/>
                      </div>`,
                className: "leaflet-marker-icon",
              })}
            >
              <Popup>
                BusNo:
                <Speedometer speed={user.speed || 0} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MultipleUserMap;
