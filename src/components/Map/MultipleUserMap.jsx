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
// import LowerSlideBar from "./LowerSlideBar";
import ContextMenu from "./ContextMenu";
import CurrentUser from './CurrentUser';
import { data } from 'autoprefixer';
import Speedometer from './Speedometer';

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
  Satellite: L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
    {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      ext: "jpg",
    }
  ),
};

function SearchControl() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'button',
      autoClose: true,
      keepResult: true,
      position: 'topleft',
    });
    map.addControl(searchControl);

    const searchControlContainer = searchControl.getContainer();
    if (searchControlContainer) {
      searchControlContainer.classList.add('absolute', 'top-2', 'left-2', 'scale-[1.3]');
    }

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
        // Apply Tailwind CSS classes to the routing control
        const routingControlElement = control.getContainer();
        if (routingControlElement) {
          routingControlElement.classList.add('absolute', 'top-24');
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

function ZoomControl() {
  const map = useMap();

  useEffect(() => {
    const zoomControl = L.control.zoom({ position: 'bottomright' }).addTo(map);

    return () => {
      map.removeControl(zoomControl);
    };
  }, [map]);

  return null;
}

function LayerControl() {
  const map = useMap();

  useEffect(() => {
    // const layerControl = L.control.layers(baseLayers, {}, { position: 'topleft' }).addTo(map);
    const layerControl = L.control.layers(baseLayers, {}, { position: 'topleft' }).addTo(map);

      setTimeout(() => {
        const layerControlElement = document.querySelector('.leaflet-control-layers');
        if (layerControlElement) {
          layerControlElement.classList.add('absolute', 'top-28'); // Adjust the values as needed
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

function MultipleUserMap() {
  const status = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);
  console.log("status is",status)
  console.log(userData);

  const [isLocationStored,setLocationStored]=useState(false);
 
  const [users, setUsers] = useState([]);
  const [position,setPosition]=useState([]);
  const defaultPosition = [27.68167, 84.43007]; // Default location for Bharatpur
  const [isRoutingEnabled, setIsRoutingEnabled] = useState(false);
  const markerRefs = useRef({}); // To store references to user markers
  const mapRef = useRef(null); // To store reference to the map
  // const [showLocation, setShowLocation] = useState(false);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const fetchUserLocation = async () => {
      console.log("fetching.........");
      const data = await service.fetchUserLocation();
      console.log(data);
      const userLocations = data.documents.map((doc) => ({
        userId: doc.userId,
        position: [doc.latitude, doc.longitude],
      }));
      console.log(userLocations);
      const validUserLocations = userLocations.filter(user => user.position !== null);
      setUsers(validUserLocations);
    }
   
    fetchUserLocation(); // Initial fetch

    const intervalId = setInterval(fetchUserLocation, 10000); // Fetch every 10 seconds
  
    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);



    if (navigator.geolocation) {

      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        
        }, 
        (error) => {
          console.error('Error occurred while retrieving location:', error);
        },
        { enableHighAccuracy: true }
  )
  console.log(position); 
  }


 


  useEffect(() => {
    if(status){
    if (navigator.geolocation) {
      console.log("hey");
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
 
           if(!isLocationStored){
         const storeLoc=async()=>{ 
          setLocationStored(true);
          console.log("storing location");
          const data=await service.storeUserLocation({userId:userData.$id,name:userData.name,latitude,longitude});
          console.log("performing storing in database",data);
          setLocationStored(false);
         
        }
          
          storeLoc();
      }
         
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
  

  // storeUser();
  // const intervalId = setInterval(storeUser, 10000); // Fetch every 10 seconds

  // return () => clearInterval(intervalId); // Clean up on component unmount
  }
  }, [position]);
  
 
  

  const toggleRouting = () => {
    setIsRoutingEnabled((prevState) => !prevState);
  };

  return (
    <div className='h-[100vh] w-full relative flex flex-col items-center'>
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
        <LayerControl />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {users.map(user => (
        
          <Marker
            key={user.userId}
            position={user.position}
            icon={new L.Icon({
              iconUrl: (userData && user.userId===userData.$id)?"../marker-gif.gif":"bus.png",
              iconSize: [25, 45],
              iconAnchor: [17, 46],
              popupAnchor: [3, -46]
            })}
            ref={(marker) => { markerRefs.current[user.userId] = marker; }}
          >
            <Popup>
              BusNo:
              <Speedometer speed={speed} />
            </Popup>
          </Marker>
        ))}
        {!status && <CurrentUser/>}
        <SearchControl />
        <RoutingControl isRoutingEnabled={isRoutingEnabled} />
        <ZoomControl />
        <ContextMenu />
      </MapContainer>
      <button 
        className="absolute top-[55px] right-[10px] z-[1300] bg-white border-2 border-gray-400 rounded-md w-[46px] h-11" 
        onClick={toggleRouting}
      >
        <img src="../route-icon.png" className='absolute left-[6px] top-1 w-15 h-8' alt="Routing Icon" />
      </button>
      {/* <button className="absolute top-[10px] right-[25%] z-[1300]">
        <img src="../target-location.svg" className="w-[45px] h-[45px]" />
      </button> */}
      {/* <LowerSlideBar /> */}
    </div>
  );
}

export default MultipleUserMap;
