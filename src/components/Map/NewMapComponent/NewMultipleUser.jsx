import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import service from '../../../appwrite/config';
import { useSelector } from 'react-redux';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import LowerSlideBar from "../LowerSlideBar";

import CurrentUser from '../CurrentUser';
import { data } from 'autoprefixer';
import Speedometer from '../Speedometer';
import ContextMenu from "../ContextMenu";
// import BusStop from '../BusRoute/BusStop';

import LayerControl from './components/LayerControl';
import RoutingControl from './components/RoutingControl';
import { fetchUserLocation } from './utils/fetchUserLocation';
import { geoLocationWatcher } from './utils/geoLocationWatcher';
import { storeUserLocation } from "./utils/storeUserLocation";

const nepalBounds = L.latLngBounds(
  L.latLng(26.347, 80.058), // South-West
  L.latLng(30.447, 88.201) // North-East
);

function MultipleUserMap() {
  const status = useSelector(state => state.auth.status);

  const userData = useSelector(state => state.auth.userData);

  const [users, setUsers] = useState([]);
  const [positionLoc, setPositionLoc] = useState([]);
  const defaultPosition = [27.68167, 84.43007]; // Default location for Bharatpur
  const [isRoutingEnabled, setIsRoutingEnabled] = useState(false);
  const markerRefs = useRef({}); // To store references to user markers
  const mapRef = useRef(null); // To store reference to the map
  const [showLocation, setShowLocation] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [heading, setHeading] = useState(null);
  const [isLocationStored,setLocationStored]=useState(false);


  // Fetch user locations every 5 seconds
  useEffect(() => {
    fetchUserLocation(setUsers);
    const intervalId = setInterval(() => fetchUserLocation(setUsers), 5000);

    return () => clearInterval(intervalId);


  }, []);
  console.log("fetched users",users)

  // // Geolocation watcher
  // useEffect(() => {
  //   if(userData)
  //   geoLocationWatcher(setPositionLoc, setHeading,setSpeed);
  //   const intervalId = setInterval(() => geoLocationWatcher(setPositionLoc, setHeading,setSpeed), 5000);

  //   return () => clearInterval(intervalId);
  // }, []);




  // // Store user location and heading every 3 seconds
  // useEffect(() => {
  //   if (userData) {
  //     storeUserLocation(userData, positionLoc, heading,speed);
  //     const intervalId = setInterval(() => storeUserLocation(userData, positionLoc, heading,speed), 5000);

  //     return () => clearInterval(intervalId);
  
  //   }
  // }, []);


  
  useEffect(() => {
    if (status && navigator.geolocation) {
      console.log("Geolocation is enabled");

      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Set an interval to store location every X seconds (e.g., every 10 seconds)
          const intervalId = setInterval(async () => {
            if (!isLocationStored) {
              setLocationStored(true);
              console.log("Storing location...");

              try {
                const data = await service.storeUserLocation({
                  userId: userData.$id,
                  name: userData.name,
                  latitude,
                  longitude,
                  heading: position.coords.heading,
                  speed: position.coords.speed,
                });
                console.log("Location stored in the database:", data);
              } catch (error) {
                console.error("Error storing location:", error);
              } finally {
                setLocationStored(false);
              }
            }
          }, 5000); // Store location every 10 seconds (you can adjust this interval)

          // Clear the interval and geolocation watcher on unmount
          return () => {
            navigator.geolocation.clearWatch(geoId);
            clearInterval(intervalId);
          };
        },
        (error) => {
          console.error("Error occurred while retrieving location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);



 


  return (
    <div className='h-[100vh] w-full relative flex flex-col items-center mt-20'>
      <MapContainer
        center={defaultPosition}
        zoom={10}
        // scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        maxZoom={18}
        minZoom={7.5}
        maxBounds={nepalBounds}
        maxBoundsViscosity={0.8}
        zoomControl={false}
        whenCreated={(map) => { mapRef.current = map; }}

      >
        <LayerControl/>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {users.map(user => {

          if (user.position[0] == null) {
            console.error(`Invalid position for user: ${user.userId}`, user.position);
            return null;
          }

          // Calculate the angle of rotation
          const angle = user.heading || 0;

          const isCurrentUser = userData && user.userId === userData.$id;
          const iconSrc = isCurrentUser ? '../navigator.svg' : 'bus.png';
          // const iconSrc ='bus.png';
          return (

            <Marker
              key={user.userId}
              position={user.position}
              icon={new L.divIcon({
                html: `<div style="transform: rotate(${angle}deg);">
                  <img src="${iconSrc}" style="width: 15px; height: 25px;" alt="Bus Icon"/>
                </div>`,
                className: "leaflet-marker-icon",
              })}
              ref={(marker) => { markerRefs.current[user.userId] = marker; }}
            >
              <Popup>
                name:{user.name}
                <Speedometer speed={user.speed} />
              </Popup>
            </Marker>
          );
        })}
        {!status && <CurrentUser />}
        <RoutingControl isRoutingEnabled={isRoutingEnabled} />
      </MapContainer>

    </div>
  );
}

export default MultipleUserMap;
