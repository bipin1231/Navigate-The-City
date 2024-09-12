import React, { useState } from 'react';
import { FaBus, FaTimes, FaArrowLeft } from 'react-icons/fa'; // Icons for navigation and bus details
import { motion } from 'framer-motion';

// Sample Data for Routes and Buses (replace with dynamic data)
const sampleRoutes = [
  {
    id: 1,
    name: 'Pulchowk To Loathor',
    totalBuses: 5,

    // buses: [
    //   { busNo: '12345', nextStop: 'Tandi', status: 'On Time' },
    //   { busNo: '23456', nextStop: 'Bharatpur', status: 'Delayed' },
    //   { busNo: '34567', nextStop: 'Pokhara', status: 'On Time' }
    // ]
  },
  // {
  //   id: 2,
  //   name: 'Route 2',
  //   totalBuses: 4,
  //   activeBuses: 2,
  //   buses: [
  //     { busNo: '45678', nextStop: 'Damauli', status: 'On Time' },
  //     { busNo: '56789', nextStop: 'Kathmandu', status: 'Delayed' }
  //   ]
  // },
  // {
  //   id: 3,
  //   name: 'Route 3',
  //   totalBuses: 6,
  //   activeBuses: 4,
  //   buses: [
  //     { busNo: '67890', nextStop: 'Butwal', status: 'On Time' },
  //     { busNo: '78901', nextStop: 'Lumbini', status: 'On Time' },
  //     { busNo: '89012', nextStop: 'Nepalgunj', status: 'On Time' }
  //   ]
  // }
];

const RouteInfoSidebar = ({ isOpen, onClose,users }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  const handleBackToRoutes = () => {
    setSelectedRoute(null);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? '0%' : '100%' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg z-[2000] flex flex-col"
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-4 border-b bg-gray-800 text-white">
        {!selectedRoute ? (
          <h2 className="text-lg font-semibold">Route Information</h2>
        ) : (
          <div className="flex items-center space-x-2">
            <button onClick={handleBackToRoutes}>
              <FaArrowLeft className="text-lg" />
            </button>
            <h2 className="text-lg font-semibold">{selectedRoute.name}</h2>
          </div>
        )}
        <button onClick={onClose} className="text-xl">
          <FaTimes />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="p-4 space-y-4 overflow-auto">
        {/* If no route is selected, show the list of routes */}
        {!selectedRoute ? (
          sampleRoutes.map((route) => (
            <div
              key={route.id}
              className="p-4 bg-gray-50 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleRouteClick(route)}
            >
              <h3 className="text-md font-semibold">{route.name}</h3>
              <p className="text-sm text-gray-600">Total Buses: {route.totalBuses}</p>
              <p className="text-sm text-green-600">Active Buses: {users.length}</p>
            </div>
          ))
        ) : 
        /*(
          // /* If a route is selected, show the list of buses in that route 
          selectedRoute.buses.map((bus, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaBus className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-sm font-semibold">Bus No: {bus.busNo}</p>
                  <p className="text-xs text-gray-500">Next Stop: {bus.nextStop}</p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                  bus.status === 'On Time' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}
              >
                {bus.status}
              </span>
            </div>
          ))
        )*/
          (
            /* If a route is selected, show the list of buses in that route */
            users.map((bus,index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaBus className="text-blue-500 text-2xl" />
                  <div>
                    <p className="text-sm font-semibold">Bus No: {bus.busNo}</p>
                    <p className="text-xs text-gray-500">Next Stop: </p>
                  </div>
                </div>
                {/* <span
                  className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                    bus.status === 'On Time' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {bus.status}
                </span> */}
              </div>
            ))
          )

        }
      </div>

      {/* Footer Section */}
      <div className="p-4 bg-gray-100 text-center text-sm text-gray-600">
        {!selectedRoute ? `Total Routes: ${sampleRoutes.length}` : `Total Buses in Route: ${selectedRoute.totalBuses}`}
      </div>
    </motion.div>
  );
};

export default RouteInfoSidebar;
