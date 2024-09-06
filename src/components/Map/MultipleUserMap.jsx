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
import ContextMenu from "./ContextMenu";
// import BusStop from '../BusRoute/BusStop';

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
  Detailed: L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  ),
  // Satellite: L.tileLayer(
  //   "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
  //   {
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //     ext: "jpg",
  //   }
  // ),
};

function LayerControl() {
  const map = useMap();

  useEffect(() => {
    const layerControl = L.control.layers(baseLayers, {}, { position: 'topleft' }).addTo(map);

      setTimeout(() => {
        const layerControlElement = document.querySelector('.leaflet-control-layers');
        if (layerControlElement) {
          layerControlElement.classList.add('absolute', 'top-1');
        }
      }, 0);
    // Add the default layer to the map
    baseLayers["Normal"].addTo(map);

    return () => {
      map.removeControl(layerControl);
    };
  }, [map]);

  return null;
}

function SearchControl() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar',
      autoClose: true,
      keepResult: true,
      // position: 'topright',
    });
    map.addControl(searchControl);

    // const searchControlContainer = searchControl.getContainer();
    // if (searchControlContainer) {
    //   searchControlContainer.classList.add('absolute', 'top-[50px]', 'right-14', 'scale-[1.3]', 'pointer-events-auto');
    // }

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
}

function RoutingControl({ isRoutingEnabled }) {
  const map = useMap();

  useEffect(() => {
    let control;
    if (map && isRoutingEnabled) {
      control = L.Routing.control({
        waypoints: [],
        routeWhileDragging: true,
        draggableWaypoints: true,
        removeWaypoints: true,
        geocoder: L.Control.Geocoder.nominatim(),
      }).addTo(map);
        const routingControlElement = control.getContainer();
        if (routingControlElement) {
          routingControlElement.classList.add('absolute', 'top-14');
        }
      return () => {
        if (map && control) {
          map.removeControl(control);
        }
      };
    }
  }, [map, isRoutingEnabled]);
  return null;
}



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

  const [isRoutingEnabled, setIsRoutingEnabled] = useState(false);
  const markerRefs = useRef({}); // To store references to user markers
  const mapRef = useRef(null); // To store reference to the map

  const toggleRouting = () => {
    setIsRoutingEnabled((prevState) => !prevState);
  };

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
    <div className='h-[90vh] w-full relative flex flex-col items-center mt-[58px]'>
      <MapContainer
        center={[27.68167, 84.43007]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        maxZoom={18}
        minZoom={7.5}
        maxBounds={nepalBounds}
        maxBoundsViscosity={0.8}
        zoomControl={false}
        whenCreated={(map) => { mapRef.current = map; }}
      >
        <LayerControl />
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
         <SearchControl />
         <RoutingControl isRoutingEnabled={isRoutingEnabled} />
         <ContextMenu />
         <button 
        className="absolute top-[10px] right-[10px] z-[1600] bg-white border-2 border-gray-400 rounded-md w-[46px] h-11" 
        onClick={toggleRouting}>
        <img src="../route-icon.png" className='absolute left-[6px] top-1 w-15 h-8' alt="Routing Icon" />
      </button>
      </MapContainer>
    </div>
  );
}

export default MultipleUserMap;
