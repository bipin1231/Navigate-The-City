import React,{useState} from 'react'
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { icon } from 'leaflet';
import L from "leaflet"
import customIconUrl from "./batman.png"

const markerIcon=new L.Icon({
  // iconUrl:customIconUrl,
   iconUrl: "https://th.bing.com/th/id/OIP.RVrT1OISI4rmKKMxADYN4wHaHa?rs=1&pid=ImgDetMain",
  iconSize:[35,45],
  iconAnchor:[17,46],
  popupAnchor:[3,-46]
})
function MapWithCustomMaker({user}) {
  console.log(user);
return (
 
      
      <MapContainer
      
      center={[27.617260, 84.542196]} zoom={10} scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
      >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  
<Marker key={user.userId} position={user.position} icon={markerIcon}>
    <Popup>
      Hello World. <br /> Easily customizable.
    </Popup>
  </Marker>

</MapContainer>
)
}
export default MapWithCustomMaker
