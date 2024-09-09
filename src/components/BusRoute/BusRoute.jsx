import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import service from "../../appwrite/config";

const nepalBounds = L.latLngBounds(
  L.latLng(26.347, 80.058), // South-West
  L.latLng(30.447, 88.201) // North-East
);

// Function to geocode place names to coordinates using OpenStreetMap's Nominatim
const geocode = async (placeName) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${placeName}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    const { lat, lon } = data[0];
    return L.latLng(lat, lon);
  } else {
    throw new Error(`Location "${placeName}" not found`);
  }
};

function RoutingMachine({ start, end }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    let isMounted = true; // To prevent double renders
    const setupRouting = async () => {
      try {
        if (routingControlRef.current && isMounted) {
          map.removeControl(routingControlRef.current);
        }
  
        const startLatLng = await geocode(start);
        const endLatLng = await geocode(end);
  
        if (isMounted) {
          routingControlRef.current = L.Routing.control({
            waypoints: [startLatLng, endLatLng],
            routeWhileDragging: false,
            draggableWaypoints: false,
            removeWaypoints: false,
            addWaypoints: false,
            clickableWaypoints: false,
            lineOptions: {
              styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
            },
            altLineOptions: {
              styles: [{ color: "green", opacity: 0.5, weight: 4 }],
            },
            showAlternatives: true,
            altLine: true,
            createMarker: function(i, waypoint, n) {
              return L.marker(waypoint.latLng, {
                icon: L.icon({
                  iconUrl: '../pin.svg',
                  iconSize: [25, 25], 
                  iconAnchor: [14, 20],
                })
              });
            }
          }).addTo(map);
        }
      } catch (error) {
        console.error("Routing setup failed:", error);
      }
    };
  
    setupRouting();
  
    return () => {
      isMounted = false; // Clean up routing control on unmount or re-render
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, start, end]);
  

  return null;
}

function BusRoute() {
  const [routeInfo, setRouteInfo] = useState([]);
  const [startLocation, setStartLocation] = useState([27.69179, 84.42521]);
  const [endLocation, setEndLocation] = useState([27.58455, 84.73335]);

  useEffect(() => {
    const fetchRouteInfo = async () => {
      const data = await service.fetchRoute();
      setRouteInfo(data.documents);
    };

    fetchRouteInfo();
  }, []);

  const handleWaypointClick = (from, to) => {
    setStartLocation(from);
    setEndLocation(to);
  };

  return (
    <>
      <div className="flex items-center flex-col mt-[58px]">
        <h1 className="text-2xl font-semibold md:text-3xl md:font-bold">
          Route
        </h1>
        <h1 className=" text-lg font-medium">
          Select on below route list to view on map
        </h1>
      </div>

      
      <div className="w-full h-full flex flex-col md:gap-2 md:flex-row md:justify-evenly pt-2 md:pt-4 px-4">
        <div className="w-full md:w-[40%] h-[30vh] md:h-[70vh] overflow-y-scroll bg-blue-200 rounded pt-2 flex items-center flex-col px-4">
          <button className="mb-2 md:mb-4 bg-blue-600 text-white w-[80%] md:w-[60%] border-2 border-blue-600 rounded duration-200 hover:bg-blue-100 hover:text-black" onClick={() => handleWaypointClick([27.69179, 84.42521], [27.58455, 84.73335])}>
            <h1 className="py-1 md:py-2 px-4">Narayangadh to Lothar</h1>
          </button>
          <button className="mb-2 md:mb-4 bg-blue-600 text-white w-[80%] md:w-[60%] border-2 border-blue-600 rounded duration-200 hover:bg-blue-100 hover:text-black" onClick={() => handleWaypointClick("Kathmandu", [27.69179, 84.42521])}>
            <h1 className="py-1 md:py-2 px-4">Kathmandu to Chitwan</h1>
          </button>
          <button className="mb-2 md:mb-4 bg-blue-600 text-white w-[80%] md:w-[60%] border-2 border-blue-600 rounded duration-200 hover:bg-blue-100 hover:text-black" onClick={() => handleWaypointClick([27.69179, 84.42521], "Pokhara")}>
          <h1 className="py-1 md:py-2 px-4">Narayangadh to Pokhara</h1>
          </button>
          <button className="mb-2 md:mb-4 bg-blue-600 text-white w-[80%] md:w-[60%] border-2 border-blue-600 rounded duration-200 hover:bg-blue-100 hover:text-black" onClick={() => handleWaypointClick("Pokhara", "Lumbini")}>
          <h1 className="py-1 md:py-2 px-4">Pokhara to Lumbini</h1>
          </button>
        </div>

        {/* Route map info section */}
        <div className="w-full md:w-[45%] mt-3 md:mt-0">
          <MapContainer
            center={[27.68167, 84.43007]}
            zoom={8}
            scrollWheelZoom={true}
            maxZoom={18}
            minZoom={6.5}
            maxBounds={nepalBounds}
            maxBoundsViscosity={0.8}
            className="h-[40vh] md:h-[60vh] w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RoutingMachine start={startLocation} end={endLocation} />
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default BusRoute;
