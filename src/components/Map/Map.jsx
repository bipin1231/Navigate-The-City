// import React, { useState, useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";

// function Map() {
//   const mapRef = useRef(null);
//   const [position, setPosition] = useState(null);
//   const defaultPosition = [27.7172, 85.324]; // Default position for Kathmandu

//   const initializeMap = (center) => {
//     if (!mapRef.current) {
//       mapRef.current = L.map("map", {
//         center: center,
//         zoom: 14,
//         maxZoom: 18,
//         minZoom: 7.5,
//       });
//       //   // Add geocoder control
//       //   L.Control.geocoder().addTo(mapRef.current);
//       // Add geocoder control
//       const geocoder = L.Control.geocoder({
//         geocoder: L.Control.Geocoder.nominatim(),
//       }).addTo(mapRef.current);

//       geocoder.on("select", function (e) {
//         const { center } = e;
//         if (!isLocationInNepal(center)) {
//           alert(
//             "The selected location is outside Nepal. Please be aware of the map boundaries."
//           );
//         } else {
//           mapRef.current.setView(center, 14);
//         }
//       });

//       // Restrict map bounds to Nepal
//       const nepalBounds = L.latLngBounds(
//         L.latLng(26.347, 80.058), // South-West
//         L.latLng(30.447, 88.201) // North-East
//       );
//       mapRef.current.setMaxBounds(nepalBounds);
//       mapRef.current.on("drag", () => {
//         if (!nepalBounds.contains(mapRef.current.getCenter())) {
//           mapRef.current.panInsideBounds(nepalBounds, { animate: false });
//         }
//       });

//       mapRef.current.on("zoomend", () => {
//         if (!nepalBounds.contains(mapRef.current.getCenter())) {
//           mapRef.current.fitBounds(nepalBounds);
//         }
//       });
//       // Define base layers
//       const baseLayers = {
//         Normal: L.tileLayer(
//           "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//           {
//             attribution:
//               '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//           }
//         ),
//         Detailed: L.tileLayer(
//           "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
//           {
//             attribution:
//               '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//           }
//         ),
//         Satellite: L.tileLayer(
//           "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}",
//           {
//             attribution:
//               '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//             ext: "jpg",
//           }
//         ),
       
//       };

//       // Add base layers to map
//       baseLayers["Normal"].addTo(mapRef.current);

//       // Create layer control
//       L.control.layers(baseLayers).addTo(mapRef.current);

//       // Disable default zoom control
//       mapRef.current.zoomControl.remove();

//       // Add custom zoom control
//       const customZoomControl = L.Control.extend({
//         options: {
//           position: "bottomright",
//         },
//         onAdd: function () {
//           const container = L.DomUtil.create("div", "custom-zoom-control");
//           container.innerHTML = `
//                         <div style="margin-right: 10px; display: flex; flex-direction: column;">
//                             <button class="bg-white hover:scale-125 duration-200" style="border: 1px solid black; border-radius: 50%; padding: 0 7px; font-size: 16px; margin-bottom: 5px;" onclick="zoomIn()">+</button>
//                             <button class="bg-white hover:scale-125 duration-200" style="border: 1px solid black; border-radius: 50%; padding: 0 7px; font-size: 16px; margin-bottom: 5px;" onclick="zoomOut()">-</button>
//                         </div>
//                     `;
//           return container;
//         },
//       });

//       mapRef.current.addControl(new customZoomControl());

//       // Bind zoom functions
//       const zoomIn = () => mapRef.current.zoomIn();
//       const zoomOut = () => mapRef.current.zoomOut();

//       window.zoomIn = zoomIn;
//       window.zoomOut = zoomOut;
//     }
//   };

//   useEffect(() => {
//     // Try to get the user's location
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userPosition = [
//           position.coords.latitude,
//           position.coords.longitude,
//         ];
//         setPosition(userPosition);
//         initializeMap(userPosition);
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//         // Handle the case where user's location cannot be retrieved
//         alert("Error getting your location. Using default position.");
//         setPosition(defaultPosition);
//         initializeMap(defaultPosition);
//       },
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   useEffect(() => {
//     if (mapRef.current && position) {
//       // Clear existing marker
//       mapRef.current.eachLayer((layer) => {
//         if (layer instanceof L.Marker) {
//           mapRef.current.removeLayer(layer);
//         }
//       });

//       // Add marker for user's position
//       L.marker(position)
//         .addTo(mapRef.current)
//         .bindPopup("You are here")
//         .openPopup();
//     }
//   }, [position]);

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <div id="map" style={{ height: "100%" }} />
//     </div>
//   );
// }

// export default Map;
