import React, { useState } from 'react';

const routes = [
    { id: 1, name: 'Sajha (LaganKhel - Naya Buspark)', buses: 0, stops: 19, distance: '13.4 km' },
    { id: 2, name: 'Sajha (LaganKhel - Budhanilkantha)', buses: 0, stops: 22, distance: '15.8 km' },
    { id: 3, name: 'Sajha (Godawari - Ratnapark)', buses: 0, stops: 16, distance: '16 km' },
    { id: 4, name: 'Sajha (Thankot - Tribhuwan Airport)', buses: 0, stops: 19, distance: '19.4 km' },
    { id: 5, name: 'Sajha (Lamatar - Ratnapark)', buses: 1, stops: 22, distance: '15.8 km' },
    { id: 6, name: 'Sajha (Thankot - Budhanilkantha)', buses: 1, stops: 24, distance: '22.5 km' },
    { id: 7, name: 'Sajha (Jamal - Lele)', buses: 1, stops: 16, distance: '21.2 km' },
];

const RouteList = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-md w-full mx-auto relative">
                <h2 className="text-lg font-semibold text-green-700 mb-4">All routes</h2>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
                    ✖
                </button>
                {routes.map((route) => (
                    <div key={route.id} className="border-b border-gray-200 py-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-gray-700">Route {route.id}</span>
                            <span className="text-sm text-gray-500">{route.name}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{route.buses} buses</span>
                            <span>{route.stops} stops</span>
                            <span>{route.distance}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MapWithRoutes = () => {
    const [isRouteListOpen, setRouteListOpen] = useState(false);

    const toggleRouteList = () => {
        setRouteListOpen(!isRouteListOpen);
    };

    return (
        <div className="relative h-screen w-screen">
            {/* Your map component goes here */}
            <div id="map" className="w-full h-full">Map</div>

            {/* Button to toggle the route list */}
            <button
                className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-full shadow-lg"
                onClick={toggleRouteList}
            >
                Routes
            </button>

            {/* RouteList component */}
            <RouteList isOpen={isRouteListOpen} onClose={toggleRouteList} />
        </div>
    );
};

export default MapWithRoutes;
