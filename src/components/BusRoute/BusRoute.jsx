import React, { useState, useEffect } from "react";
import { Card, Divider } from "@nextui-org/react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import 'leaflet-geosearch/dist/geosearch.css';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import service from "../../appwrite/config";

function RoutingMachine() {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(27.70711, 85.31982),
        L.latLng(27.68167, 84.43007)
      ],
      routeWhileDragging: true,  // Allows for interaction
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);  // Clean up when the component is unmounted
    };
  }, [map]);

  return null;
}

function BusRoute() {
  const [routeInfo, setRouteInfo] = useState([]);

  useEffect(() => {
    const fetchRouteInfo = async () => {
      const data = await service.fetchRoute();
      setRouteInfo(data.documents);
    };

    fetchRouteInfo();
  }, []);

  return (
    <>
      <h1 className="flex items-center justify-center pt-8 text-3xl font-bold">
        Route
      </h1>
      <div className="w-full h-full flex justify-center pt-10 px-4">
        <div className="w-[50%]">
          {/* {routeInfo.map((r, index) => ( */}
            {/* <div key={index}> */}
              <div
                className="w-[90%] bg-neutral-900 text-white cursor-pointer"
              >
                <div>
                  <h1>
                    <span>
                      From: Kathmandu To: Chitwan
                    </span>
                  </h1>
                </div>
                {/* <Divider /> */}
              {/* </div> */}
            </div>
          {/* ))} */}
        </div>

        {/* Route map info section */}
        <div className="w-[50%] bg-red-600">
          <MapContainer
            center={[27.68167, 84.43007]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "50vh", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RoutingMachine />
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default BusRoute;
