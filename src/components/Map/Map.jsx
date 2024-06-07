import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet-compass/dist/leaflet-compass.min.css';
import 'leaflet-compass';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import RoutingMachine from './RoutingMachine'; 
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import ContextMenu from "./ContextMenu";
import LowerSlideBar from "./LowerSlideBar";

function MultipleUserMap() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const defaultPosition = [27.68167, 84.43007]; // Default location for Bharatpur
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

      //Add compass
      mapRef.current.addControl(new L.Control.Compass({ position: 'topleft' }));
      // const compassControl = new L.Control.Compass({ position: 'topleft' });
      // mapRef.current.addControl(compassControl);

      // setTimeout(() => {
      //   const compassElement = document.querySelector('.leaflet-compass');
      //   if (compassElement) {
      //     compassElement.classList.add('absolute', 'top-10');
      //   }
      // }, 0);
      
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
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }
        ),
        Satellite: L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
          {
            attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            ext: "jpg",
          }
        ),
      };
      
      // Add base layers to map
      baseLayers["Normal"].addTo(mapRef.current);

      // Create layer control
      L.control.layers(baseLayers, {}, { position: 'topleft' }).addTo(mapRef.current);
      // const layerControl = L.control.layers(baseLayers, {}, { position: 'topleft' }).addTo(mapRef.current);

      // setTimeout(() => {
      //   const layerControlElement = document.querySelector('.leaflet-control-layers');
      //   if (layerControlElement) {
      //     layerControlElement.classList.add('absolute', 'top-11'); // Adjust the values as needed
      //   }
      // }, 0);
    }
  };

  // Function to handle the button click and show location
  const handleShowLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        if (nepalBounds.contains(userPosition)) {
          setPosition(userPosition);
          setShowLocation(true);
          mapRef.current.setView(userPosition, 14);
        } else {
          alert("Your current location is outside Nepal.");
          setPosition(defaultPosition);
          setShowLocation(true);
          mapRef.current.setView(defaultPosition, 14);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Error getting your location. Using default position.");
        setPosition(defaultPosition);
        setShowLocation(true);
        mapRef.current.setView(defaultPosition, 14);
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    initializeMap(defaultPosition);
  }, []);

  useEffect(() => {
    if (mapRef.current && showLocation && position) {
      // Add marker for user's position if it doesn't exist
      if (!markerRef.current) {
        const customMarkerIcon = L.icon({
          iconUrl: '../pin.svg',
          iconSize: [45, 60],
        });
        
        markerRef.current = L.marker(position, { icon: customMarkerIcon })
          .addTo(mapRef.current)
          .bindPopup("You are here")
          .openPopup();
      } else {
        // Update the marker position if it already exists
        markerRef.current.setLatLng(position);
      }
    }
  }, [showLocation, position]);

  useEffect(() => {
    // Watch user's position and update speed and position
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userPosition = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        setPosition(userPosition);
        setSpeed(position.coords.speed || 0);
        mapRef.current.setView(userPosition, mapRef.current.getZoom());
      },
      (error) => {
        console.error("Error getting position and speed:", error);
      },
      { enableHighAccuracy: true }
    );
  
    return () => {
      // Clean up the watchPosition when component unmounts
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div className="h-[90vh] w-full flex flex-col items-center">
      <div id="map" style={{ height: "100%", width: '100%' }} />
      <LowerSlideBar />
      {mapRef.current && <ContextMenu map={mapRef.current} />}
      <div className="absolute top-[65px] right-[25%] z-[1300] flex justify-between gap-4">
      <RoutingMachine map={mapRef.current}/>
      <button onClick={handleShowLocation}>
      {/* <button onClick={handleShowLocation} className="absolute right-3 top-32 z-[1300]"> */}
        <img src="../target-location.svg" className="w-[45px] h-[45px]" />
      </button>
      </div>
    </div>
  );
}

export default MultipleUserMap;
