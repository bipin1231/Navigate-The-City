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
import LowerSlideBar from "./LowerSlideBar";

import CurrentUser from './CurrentUser';
import { data } from 'autoprefixer';
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
          layerControlElement.classList.add('absolute', 'top-1', 'scale-[0.9]', 'lg:scale-[1]');
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
        // Apply Tailwind CSS classes to the routing control
        const routingControlElement = control.getContainer();
        if (routingControlElement) {
          routingControlElement.classList.add('absolute', 'top-16');
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
    const zoomControl = L.control.zoom({ position: 'bottomleft' }).addTo(map);

    return () => {
      map.removeControl(zoomControl);
    };
  }, [map]);

  return null;
}


function MultipleUserMap() {
  const status = useSelector(state => state.auth.status);
  console.log("status is",status)
  const userData = useSelector(state => state.auth.userData);
  console.log("status is",status)
  console.log(userData);

  const [isLocationStored,setLocationStored]=useState(false);
 
  const [users, setUsers] = useState([]);
  const [positionLoc,setPositionLoc]=useState(['']);
  const defaultPosition = [27.68167, 84.43007]; // Default location for Bharatpur
  const [isRoutingEnabled, setIsRoutingEnabled] = useState(false);
  const markerRefs = useRef({}); // To store references to user markers
  const mapRef = useRef(null); // To store reference to the map
  // const [showLocation, setShowLocation] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [previousPositions, setPreviousPositions] = useState({});
  const [angles, setAngles] = useState({}); // Store angles for each user

  const [busPositions, setBusPositions] = useState([]);


  const [heading, setHeading] = useState(null);

// Capture device orientation
// useEffect(() => {
//   const handleOrientation = (event) => {
//     const alpha = event.alpha; // Alpha gives the device's heading in degrees
//     console.log("alpha is..............................................",alpha);
    
//     setHeading(alpha); // Store the heading
//   };

//   // Listen for device orientation changes
//   window.addEventListener('deviceorientation', handleOrientation);

//   return () => {
//     window.removeEventListener('deviceorientation', handleOrientation);
//   };

// }, []);



useEffect(() => {
  const handleOrientation = (event) => {
    const alpha = event.alpha; // Alpha gives the device's heading in degrees
    if (alpha !== null) {
      console.log("Current device orientation alpha:", alpha);
      setHeading(alpha); // Store the heading in state
    } else {
      console.warn("No alpha value available for device orientation");
    }
  };

  // Listen for device orientation changes
  window.addEventListener('deviceorientation', handleOrientation);

  return () => {
    window.removeEventListener('deviceorientation', handleOrientation);
  };
}, []);  // Empty dependency array means this runs once on mount



  




  useEffect(() => {
    const fetchUserLocation = async () => {
      console.log("fetching.........");
      const data = await service.fetchUserLocation();
      console.log(data);
      const userLocations = data.documents.map((doc) => ({
        userId: doc.userId,
        position: [doc.latitude, doc.longitude],
        heading:doc.heading,
        busNo:doc.BusNo,
        speed:doc.Speed,
        userType:doc.userType,
        name:doc.name
      }));
      console.log(userLocations);
      const validUserLocations = userLocations.filter(user => user.position[0] !== null);
      setUsers(validUserLocations);
    }
   
    fetchUserLocation(); // Initial fetch

    const intervalId = setInterval(fetchUserLocation, 5000); // Fetch every 5 seconds
  
    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);



    if (navigator.geolocation) {

      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPositionLoc([latitude, longitude]);
        
        }, 
        (error) => {
          console.error('Error occurred while retrieving location:', error);
        },
        { enableHighAccuracy: true }
  )
 
  }

  useEffect(() => {
    let geoId;
    let intervalId;
    
    if (status) {
      if (navigator.geolocation) {
        console.log("Tracking location and heading...");
  
        // Watch the user's location
        geoId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPositionLoc(position.coords);
            console.log(positionLoc);
            
          },
          (error) => {
            console.error('Error occurred while retrieving location:', error);
          },
          { enableHighAccuracy: true }
        );
  console.log("storing infi outside the storing function")
        // Store the location and heading at a set interval (e.g., every 10 seconds)
        intervalId = setInterval(async () => {
          console.log("storing infi insideeeee the storing function")
          if (!isLocationStored) {
            const storeLoc = async () => {
              setLocationStored(true); // Prevent multiple stores at the same time
              console.log("Storing location and heading...");
              try {
                const data = await service.storeUserLocation({
                  userId: userData.$id,
                  name: userData.name,
                  latitude: positionLoc.latitude,
                  longitude: positionLoc.longitude,
                  heading,
                });
                console.log("Stored data in database:", data);
              } catch (error) {
                console.error('Error storing location:', error);
              } finally {
                setLocationStored(false);
              }
            };
  
            storeLoc();
          }
        }, 3000); // Store every 10 seconds
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  
    // Clean up the watchPosition and interval on component unmount
    return () => {
      if (geoId) navigator.geolocation.clearWatch(geoId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [status, positionLoc, heading]);
  

  const toggleRouting = () => {
    setIsRoutingEnabled((prevState) => !prevState);
  };
  // useEffect(() => {
  //   if (users.length > 0) {

  //     setPreviousPositions(prev => {
  //       const newPos = {};
  //       users.forEach(user => {
  //         newPos[user.userId] = user.position;
  //       });
  //       return newPos;
  //     });


  //     setAngles(prevAngles => {
  //       const newAngles = {};
  //       users.forEach(user => {
  //         const prevPos = previousPositions[user.userId];
        
  //         const newPos = user.position;
    
  //         const angle = prevPos ? calculateAngle(prevPos, newPos) : 0;
  //         newAngles[user.userId] = angle;
  //       });
  //       return newAngles;
  //     });

    
  //   }
  // }, [users]);
  // console.log("position previous of multiple user",previousPositions);

  // const calculateAngle = (prevPos, newPos) => {
  //   const [lat1, lon1] = prevPos;
  //   const [lat2, lon2] = newPos;
  //   const deltaLon = lon2 - lon1;
  //   const y = Math.sin(deltaLon) * Math.cos(lat2);
  //   const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
  //   const angle = Math.atan2(y, x) * (180 / Math.PI);
  //   return (angle + 360) % 360; // Normalize to 0-360 degrees
  // };
  // console.log("multiple angles ......",angles);

//bus stop functionality
  // useEffect(() => {
  //   const fetchBusPositions = async () => {
  //     console.log("fetching.........");
  //     const data = await service.fetchBusPositions();
  //     console.log(data);
  //     const busLocations = data.documents.map((doc) => ({
  //       userId: doc.userId,
  //       position: [doc.latitude, doc.longitude],
  //     }));
  //     console.log(busLocations);
  //     const validBusLocations = busLocations.filter(user => user.position[0] !== null);
  //     setBusPositions(validBusLocations);
  //   };

  //   fetchBusPositions();
  //   const intervalId = setInterval(fetchBusPositions, 5000); // Update every 5 seconds
  //   return () => clearInterval(intervalId);
  // }, [users]);




//2nd method for bus functionality
// useEffect(() => {
//   const fetchBusPositions = async () => {
//     // Fetch or update bus positions here
//     // For example, update the state with current bus positions
//     const positions = users.map(user => user.position); // Example based on your existing users array
//     setBusPositions(positions);
//   };

//   fetchBusPositions();
//   const intervalId = setInterval(fetchBusPositions, 5000); // Update every 5 seconds
//   return () => clearInterval(intervalId);
// }, [users]);


  return (
    // <div className='h-[100vh] w-full relative flex flex-col items-center mt-20'>
    //   <MapContainer
    //     center={defaultPosition}
    //     zoom={10}
    //     // scrollWheelZoom={false}
    //     style={{ height: "100%", width: "100%" }}
    //     maxZoom={18}
    //     minZoom={7.5}
    //     maxBounds={nepalBounds}
    //     maxBoundsViscosity={0.8}
    //     zoomControl={false}
    //     whenCreated={(map) => { mapRef.current = map; }}
     
    //   >
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
        {/* <LayerControl /> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

{users.map(user => {

          console.log("angle userssssssssssssss",user);
          
 
          if (user.position[0]==null) {
            console.error(`Invalid position for user: ${user.userId}`, user.position);
            return null;
          }

          // Calculate the angle of rotation
          const angle = user.heading || 0;
          console.log("name of the angle giver",user.name);
          console.log("current heading",heading);
          
           
          console.log("heading of database .............",user.heading);
          
console.log("angle is ......",angle);

const isCurrentUser = userData && user.userId === userData.$id;
const iconSrc = isCurrentUser ? '../navigator.svg' : 'bus.png';
// const iconSrc ='bus.png';
          return (

            <Marker
            key={user.userId}
            position={user.position}
            icon={new L.divIcon({
             // html: `<img src="${iconSrc}" style="transform: rotate(${angles[user.userId]}deg);/>`,
            //  html: `<img src="bus.png" style="transform: rotate(${angle}deg);/>`,

            // iconUrl:"bus.png",
            //   iconSize: [25, 45],
            //   iconAnchor: [17, 46],
            //   popupAnchor: [3, -46],
             html: `<div style="transform: rotate(${angle}deg);">
                  <img src="${iconSrc}" style="width: 15px; height: 25px;" alt="Bus Icon"/>
                </div>`,
              className: "leaflet-marker-icon",
            })}
            ref={(marker) => { markerRefs.current[user.userId] = marker; }}
          >
            <Popup>
              <div className='flex items-center flex-col'>
                Name:{user.name}
                <Speedometer speed={speed} />
              </div>
            </Popup>
          </Marker>
          );
        })}
        {!status && <CurrentUser/>}
        <SearchControl />
        <RoutingControl isRoutingEnabled={isRoutingEnabled} />
        <ZoomControl />
        <ContextMenu />
        {/* <BusStop busPositions={busPositions}/> */}
      </MapContainer>
      <button 
        className="absolute top-[12px] right-[10px] z-[1600] bg-white border-2 border-gray-400 rounded-md w-[46px] h-11 scale-[0.9] lg:scale-[1]" 
        onClick={toggleRouting}>
        <img src="../route-icon.png" className='absolute left-[6px] top-1 w-15 h-8' alt="Routing Icon" />
      </button>
      {/* <button className="absolute top-[10px] right-[25%] z-[1300]">
        <img src="../target-location.svg" className="w-[45px] h-[45px]" />
      </button> */}
      <LowerSlideBar />
    </div>
  );
}

export default MultipleUserMap;
