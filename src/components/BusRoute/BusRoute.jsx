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
    const setupRouting = async () => {
      try {
        // Remove the existing route if it's already on the map
        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
        }

        const startLatLng = await geocode(start); // Convert start place name to LatLng
        const endLatLng = await geocode(end);     // Convert end place name to LatLng

        // Create a new routing control
        routingControlRef.current = L.Routing.control({
          waypoints: [startLatLng, endLatLng],
          routeWhileDragging: false,
          draggableWaypoints: false,
          removeWaypoints: false,
          addWaypoints: false,
          clickableWaypoints: false,
          lineOptions: {
            styles: [{ color: 'blue', opacity: 0.6, weight: 4 }],
          },
          altLineOptions: {
            styles: [{ color: 'green', opacity: 0.5, weight: 4 }],
          },
          showAlternatives: true,
          altLine: true,
        }).addTo(map);
      } catch (error) {
        console.error("Routing setup failed:", error);
      }
    };

    setupRouting();

    return () => {
      // Clean up routing control when component unmounts
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, start, end]);

  return null;
}

function BusRoute() {
  const [routeInfo, setRouteInfo] = useState([]);
  const [startLocation, setStartLocation] = useState("Kathmandu");
  const [endLocation, setEndLocation] = useState("Chitwan");

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
      <div className="flex items-center flex-col pt-4 md:pt-8">
        <h1 className="text-2xl font-semibold md:text-3xl md:font-bold">
          Route
        </h1>
        <h1 className=" text-lg font-medium">
          Select on below route list to view in map
        </h1>
      </div>
      
      <div className="w-full h-full flex flex-col md:flex-row md:justify-center pt-4 md:pt-10 px-4">
        <div className="w-full md:w-[50%] flex items-center flex-col px-4">
          <button className="mb-2 md:mb-4 bg-blue-900 text-white w-[80%] md:w-[60%] border-2 border-blue-900 rounded duration-200 hover:bg-blue-100 hover:text-black" onClick={() => handleWaypointClick("Kathmandu", "Chitwan")}>
            <h1 className="py-1 md:py-2 px-4">Kathmandu to Chitwan</h1>
          </button>
          <button className="mb-2 md:mb-4 bg-blue-900 text-white w-[80%] md:w-[60%] border-2 border-blue-900 rounded duration-200 hover:bg-blue-100 hover:text-black" onClick={() => handleWaypointClick("Chitwan", "Pokhara")}>
          <h1 className="py-1 md:py-2 px-4">Chitwan to Pokhara</h1>
          </button>
          <button className="mb-2 md:mb-4 bg-blue-900 text-white w-[80%] md:w-[60%] border-2 border-blue-900 rounded duration-200 hover:bg-blue-100 hover:text-black" onClick={() => handleWaypointClick("Pokhara", "Lumbini")}>
          <h1 className="py-1 md:py-2 px-4">Pokhara to Lumbini</h1>
          </button>
        </div>

        {/* Route map info section */}
        <div className="w-full md:w-[50%]">
          <MapContainer
            center={[27.68167, 84.43007]}
            zoom={8}
            scrollWheelZoom={true}
            maxZoom={18}
            minZoom={6.5}
            maxBounds={nepalBounds}
            maxBoundsViscosity={0.8}
            className="h-[50vh] md:h-[70vh] w-full"
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
