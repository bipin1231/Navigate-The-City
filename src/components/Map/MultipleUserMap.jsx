import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import RoutingMachine from './RoutingMachine'; 
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import ContextMenu from "./ContextMenu";
import LowerSlideBar from "./LowerSlideBar";

function MultipleUserMap() {
  const mapRef = useRef(null);
  const markerRef = useRef(null); // Reference for the user position marker
  const [position, setPosition] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
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
              '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: "jpg",
          }
        ),
      };

      // Add base layers to map
      baseLayers["Normal"].addTo(mapRef.current);

      // Create layer control
      L.control.layers(baseLayers).addTo(mapRef.current);
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
    <div className="h-[90lvh] w-full flex flex-col items-center">
      <div id="map" style={{ height: "100%", width: '100%' }} />
      <LowerSlideBar />
      {mapRef.current && <ContextMenu map={mapRef.current} />}
      <RoutingMachine map={mapRef.current}/>
      <button onClick={handleShowLocation} className="absolute right-3 top-32 z-[1300]">
        <img src="../target-location.svg" className="w-[45px] h-[45px]" />
      </button>
    </div>
  );
}

export default MultipleUserMap;
