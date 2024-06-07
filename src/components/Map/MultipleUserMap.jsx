import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import RoutingMachine from './RoutingMachine';

function SearchControl() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      autoClose: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
}

function MultipleUserMap() {
  const status = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);
  const [users, setUsers] = useState([]);
  const defaultPosition = [27.68167, 84.43007]; // Default location for Bharatpur

  useEffect(() => {
    const fetchUserLocation = async () => {
      const data = await service.fetchUserLocation();
      console.log(data);
      const userLocations = data.documents.map((doc) => ({
        userId: doc.userId,
        position: [doc.latitude, doc.longitude],
      }));
      const validUserLocations = userLocations.filter(user => user.position !== null);
      setUsers(validUserLocations);
    }
    fetchUserLocation();
  }, []);

  const [position, setPosition] = useState(null);

  if (status) {
    useEffect(() => {
      if (navigator.geolocation) {
        const geoId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
            const storeLoc = async () => {
              await service.storeUserLocation({ userId: userData.$id, latitude, longitude });
            }
            storeLoc();
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
  }

  const markerIcon = new L.Icon({
    iconUrl: "../pin.svg",
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46]
  });

  return (
    <MapContainer
      center={defaultPosition} zoom={10} scrollWheelZoom={true}
      style={{ height: "90vh", width: "100%", position: "relative" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {users.map(user => (
        <Marker key={user.userId} position={user.position} icon={markerIcon}>
          <Popup>
            Hello World. <br /> Easily customizable.<br />{user.userId}
          </Popup>
        </Marker>
      ))}
      <SearchControl />
      <RoutingMachine />
    </MapContainer>
  );
}

export default MultipleUserMap;
