import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronRight, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const nepalBounds = L.latLngBounds(
  L.latLng(26.347, 80.058),
  L.latLng(30.447, 88.201)
);

const geocode = async (placeName) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${placeName}`
    );
    const data = await response.json();
    if (data?.[0]) {
      const { lat, lon } = data[0];
      return L.latLng(lat, lon);
    }
    throw new Error(`Location "${placeName}" not found`);
  } catch (error) {
    console.error("Geocoding failed:", error);
    throw error;
  }
};

const RouteButton = ({ name, districtName, onClick, isActive }) => (
  <motion.button 
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`mb-4 w-full max-w-md px-6 py-4 rounded-xl flex items-center justify-between border ${
      isActive 
        ? 'bg-blue-600 text-white border-blue-700 shadow-lg' 
        : 'bg-white hover:bg-blue-50 border-gray-100'
    }`}
  >
    <div className="flex items-center space-x-3">
      <MapPin className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600'}`} />
      <div className="flex flex-col items-start">
        <span className="font-semibold text-lg">{name}</span>
        <span className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
          {districtName}
        </span>
      </div>
    </div>
    <ChevronRight className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-400'}`} />
  </motion.button>
);

function RoutingMachine({ start, end }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

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
              styles: [{ color: "#3b82f6", opacity: 0.8, weight: 5 }],
            },
            altLineOptions: {
              styles: [{ color: "#059669", opacity: 0.6, weight: 5 }],
            },
            showAlternatives: true,
            createMarker: (i, waypoint) => (
              L.marker(waypoint.latLng, {
                icon: L.icon({
                  iconUrl: '../pin.svg',
                  iconSize: [28, 28],
                  iconAnchor: [14, 28],
                })
              })
            )
          }).addTo(map);
        }
      } catch (error) {
        console.error("Routing setup failed:", error);
      }
    };

    setupRouting();
    return () => {
      isMounted = false;
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, start, end]);

  return null;
}

function RouteSection({ title, routes, selectedRoute, onRouteSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 h-[70vh] overflow-y-auto"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Navigation className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-4">
        <AnimatePresence>
          {routes.map(route => (
            <RouteButton
              key={route.id}
              name={route.name}
              districtName={route.districtName}
              onClick={() => onRouteSelect(route)}
              isActive={selectedRoute?.id === route.id}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function BusRoute() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const navigate = useNavigate();
  const routes = [
    {
      id: 1,
      name: "Narayangadh to Lothar",
      start: [27.69179, 84.42521],
      end: [27.58455, 84.73335],
      price: 100,
      category: "District",
      districtName: "Chitwan"
    },
    {
      id: 2,
      name: "Kathmandu to Chitwan",
      start: "Kathmandu",
      end: [27.69179, 84.42521],
      price: 600,
      category: "Inter-District",
      districtName: "Kathmandu to Chitwan"
    },
    {
      id: 3,
      name: "Narayangadh to Pokhara",
      start: [27.69179, 84.42521],
      end: "Pokhara",
      price: 600,
      category: "Inter-District",
      districtName: "Chitwan to Pokhara"
    },
    {
      id: 4,
      name: "Pokhara to Lumbini",
      start: "Pokhara",
      end: "Lumbini",
      price: 700,
      category: "Inter-District",
      districtName: "Pokhara to Lumbini"
    }
  ];

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleBooking = () => {
    if (selectedRoute) {
      navigate('/selectbus', { 
        state: { 
          routeName: selectedRoute.name, 
          pricePerSeat: selectedRoute.price 
        } 
      });
    }
  };

  const districtRoutes = routes.filter(route => route.category === "District");
  const interDistrictRoutes = routes.filter(route => route.category === "Inter-District");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-16 mt-10"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Available Routes</h1>
          <p className="text-gray-600 text-lg">Explore and book your journey across Nepal</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Route Sections */}
          <RouteSection 
            title="District Routes"
            routes={districtRoutes}
            selectedRoute={selectedRoute}
            onRouteSelect={handleRouteSelect}
          />

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white flex items-center justify-between">
              <h2 className="font-semibold text-lg">
                {selectedRoute ? selectedRoute.name : "Select a route to view details"}
              </h2>
              {selectedRoute && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBooking}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
                >
                  Book Now
                </motion.button>
              )}
            </div> */}
            
            <MapContainer
              center={[27.68167, 84.43007]}
              zoom={8}
              scrollWheelZoom={true}
              maxZoom={18}
              minZoom={6.5}
              maxBounds={nepalBounds}
              maxBoundsViscosity={0.8}
              className="h-[60vh] w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {selectedRoute && (
                <RoutingMachine 
                  start={selectedRoute.start} 
                  end={selectedRoute.end} 
                />
              )}
            </MapContainer>
          </motion.div>
        </div>

        <div className="mt-8">
          <RouteSection 
            title="Inter-District Routes"
            routes={interDistrictRoutes}
            selectedRoute={selectedRoute}
            onRouteSelect={handleRouteSelect}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default BusRoute;