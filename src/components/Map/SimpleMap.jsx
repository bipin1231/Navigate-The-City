import React,{useState,useEffect} from 'react'
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { icon } from 'leaflet';
import L from "leaflet"
import customIconUrl from "./batman.png"
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
function SimpleMap() {
  const userData=useSelector(state=>state.auth.userData)
console.log(userData);

const [users,setUsers]=useState([{
  userId:"user1",
  position:[27.849315, 85.603398]
},
{
  userId:"user2",
  position:[27.615982, 84.549551]
},
{
  userId:"user3",
  position:[27.612631, 84.567976]
}]);

const [position,setPosition]=useState(null);

useEffect(() => {
  if (navigator.geolocation) {
    const geoId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
       const storeLoc=async()=>{ 
        const data=await service.storeUserLocation({userId:userData.$id,latitude,longitude});}
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

console.log(position);
  const markerIcon=new L.Icon({
    
    // iconUrl:customIconUrl,
     iconUrl: "https://th.bing.com/th/id/OIP.RVrT1OISI4rmKKMxADYN4wHaHa?rs=1&pid=ImgDetMain",
    iconSize:[35,45],
    // iconAnchor:[17,46],
    popupAnchor:[3,-46]
  })


  return (
 
      
      <MapContainer
      
      center={[27.617260, 84.542196]} zoom={10} scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
      >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {
users.map(a=>(<Marker key={a.userId} position={a.position} icon={markerIcon}>
    <Popup>
      Hello World. <br /> Easily customizable.
    </Popup>
  </Marker>
))
}
</MapContainer>

  )
}

export default SimpleMap
