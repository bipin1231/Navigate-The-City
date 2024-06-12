import React, { useState,useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { icon } from 'leaflet';
import L from "leaflet"
import customIconUrl from "./batman.png"




function CurrentUser() {
  const [users, setUser] = useState([]);
  const [userPosition,setUserPosition]=useState(null);
  const markerIcon = new L.Icon({
    // iconUrl:customIconUrl,
    iconUrl: "https://memes.co.in/Uploads/Media/Jul22/Thu28/674/d983d237.jpg",
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46]
  })

  useEffect(() => {
    if (navigator.geolocation) {
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          console.log(userPosition);
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
  console.log(userPosition);

  return (


     userPosition && 
      <Marker key={'001'} position={userPosition} icon={markerIcon}>
        <Popup>
          Current User  Hello World. <br /> Easily customizable.
        </Popup>
      </Marker>
    
    
   
  )
}
export default CurrentUser