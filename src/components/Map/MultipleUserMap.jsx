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
  const [position, setPosition] = useState(null);
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
              '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (position) => {
        const userPosition = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        if (nepalBounds.contains(userPosition)) {
          setPosition(userPosition);
          initializeMap(userPosition);
        } else {
          alert("Your current location is outside Nepal.");
          setPosition(defaultPosition);
          initializeMap(defaultPosition);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Error getting your location. Using default position.");
        setPosition(defaultPosition);
        initializeMap(defaultPosition);
      },
      { enableHighAccuracy: true }
    );

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

  useEffect(() => {
    if (mapRef.current && position) {
      // Clear existing marker
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });

      // Add marker for user's position
      const customMarkerIcon = L.icon({
        iconUrl: '../pin.png',
        iconSize: [45, 45],
      });
      
      // Add the marker with the custom icon to the map
      L.marker(position, { icon: customMarkerIcon })
        .addTo(mapRef.current)
        .bindPopup("You are here")
        .openPopup();
    }
  }, [position]);

  return (
    <div className="h-[90vh] w-full flex justify-center">
      <div id="map" style={{ height: "100%" }} />
      <LowerSlideBar />
      {mapRef.current && <ContextMenu map={mapRef.current} />}
      <RoutingMachine map={mapRef.current}/>
    </div>
  );
}

export default MultipleUserMap;
