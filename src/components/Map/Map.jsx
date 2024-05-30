import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import RoutingMachine from './RoutingMachine'; 
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

import service from "../../appwrite/config";
import {useSelector,useDispatch} from 'react-redux'

function Map() {

  const userStat=useSelector(state=>state.auth)
   console.log(userStat);
// console.log(userData.userData.$id);

  const [userLocation,setUserLocation]=useState({
    userId:null,
    lattitude:null,
    longitude:null,
  
  })
  //console.log(userLocation);

  const [userPosition,setUserPosition]=useState([]);
  const mapRef = useRef(null);
  const [position, setPosition] = useState([]);
  const defaultPosition = [27.7172, 85.324]; // Default position for Kathmandu
  const nepalBounds = L.latLngBounds(
    L.latLng(26.347, 80.058), // South-West
    L.latLng(30.447, 88.201) // North-East
  );
  

  const initializeMap = (center) => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: center,
        zoom: 14,
        maxZoom: 18,
        minZoom: 7.5,
        maxBounds: nepalBounds,
        maxBoundsViscosity: 0.8,
        zoomControl: false,
      }).addControl(L.control.zoom({ position: 'bottomright' }));
      
      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);

      // Add geosearch control
      const searchControl = new GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        autoComplete: true,
        autoCompleteDelay: 100,
        searchLabel: "Enter address",
      });

      mapRef.current.addControl(searchControl);

      // Restrict map bounds to Nepal
      mapRef.current.setMaxBounds(nepalBounds);
      mapRef.current.on("drag", () => {
        if (!nepalBounds.contains(mapRef.current.getCenter())) {
          mapRef.current.panInsideBounds(nepalBounds, { animate: false });
        }
      });

      mapRef.current.on("zoomend", () => {
        if (!nepalBounds.contains(mapRef.current.getCenter())) {
          mapRef.current.fitBounds(nepalBounds);
        }
      });

      // Define base layers
      const baseLayers = {
        Normal: L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ),
        Detailed: L.tileLayer(
          "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        ),
        Satellite: L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
          {
            attribution:
              '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: "jpg",
          }
        ),

      };

      // Add base layers to map
      baseLayers["Normal"].addTo(mapRef.current);

      // Create layer control
      L.control.layers(baseLayers).addTo(mapRef.current);
      //adding or importing leaflet routing machine
      RoutingMachine(mapRef.current);
    }
  };

  useEffect(() => {
    // Try to get the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
         setUserPosition([...userPosition,{
         longitude: position.coords.latitude,
         lattitude: position.coords.longitude,
         }])
        
        setUserLocation({
          userId:userStat.userData.$id,
          lattitude:userPosition[0],
          longitude:userPosition[1]
        })
        // const userPosition = {
        //   userId:userData.userData.$id,
        // lattitude: position.coords.latitude,
        //   longitude:position.coords.longitude,
        // };

//        console.log(userLocation);
        const addLocation=async()=>{
        // return await service.addLocation(userLocation); 
        }
        // if(userPosition){
        //   addLocation();
        // }
        if (nepalBounds.contains(userPosition)) {
// userPosition.forEach(a => {
//   console.log("this is the location from loop",[a.lattitude,a.longitude]);
//   setPosition([]);
// });

userPosition.forEach(a => {
  console.log("this is the location from loop",[a.lattitude,a.longitude]);
  initializeMap(a.longitude,a.lattitude)
})
          // userPosition.map(setPosition([userPosition.lattitude,userPosition.longitude]));         
          // userPosition.map(initializeMap([userPosition.lattitude,userPosition.longitude]));
        } else {
          alert("Your current location is outside Nepal.");
          setPosition(defaultPosition);
          initializeMap(defaultPosition);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        // Handle the case where user's location cannot be retrieved
        alert("Error getting your location. Using default position.");
        setPosition(defaultPosition);
        initializeMap(defaultPosition);
      },
      { enableHighAccuracy: true }
    );
  }, []);
 
  useEffect(() => {
    userPosition.forEach(a => {
    if (mapRef.current && [a.longitude,a.lattitude]) {
      // Clear existing marker
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Add marker for user's position
      L.marker([a.longitude,a.lattitude])
        .addTo(mapRef.current)
        .bindPopup("You are here")
        .openPopup();
    }
  })
  }, [userPosition]);

  const getUserInfoAppwrite=async()=>{
    const data=await service.getUserLocation(userStat.userData.$id);
    console.log(data);
    
    const [lastItem]=data.documents.slice(-1);
    const last=data.documents[data.documents.length-1]
    console.log(last);
    setUserPosition(prevPosition=>{
      console.log(prevPosition);
      return[
        ...prevPosition,
        last
      ]
    });
    //console.log(lastItem);
   // console.log(data.documents);
  }
  console.log(userPosition);
  userPosition.forEach(a => {
    console.log("this is the location from loop",[a.lattitude,a.longitude]);
  })

  return (
    <div style={{ height: "86vh", width: "100%" }}>
    <button onClick={getUserInfoAppwrite}>clikme</button>
      <div id="map" style={{ height: "100%" }} />
      <RoutingMachine map={mapRef.current}/>
    </div>
  );
}

export default Map;
