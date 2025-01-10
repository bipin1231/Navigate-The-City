import React, { useEffect, useState } from 'react';
import { FaBus, FaTimes, FaArrowLeft } from 'react-icons/fa'; // Icons for navigation and bus details
import { motion, AnimatePresence } from 'framer-motion';
import { Button, ButtonGroup } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { useForm, Controller } from 'react-hook-form';
import service from '../../appwrite/config';

// Sample Data for Routes and Buses (replace with dynamic data)
const sampleRoutes = [
  {
    id: 1,
    name: 'Pulchowk To Loathor',
    districtName: 'Chitwan', // Added district name
    totalBuses: 5,
  },

  // Add more routes as needed
];

// RouteInfoSidebar component
const RouteInfoSidebar = ({ isOpen, onClose, users }) => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null); // State to handle selected bus for booking
  const [showBookingForm, setShowBookingForm] = useState(false); // State to show the booking form
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    contact: '',
  });

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const storeData = await service.addTicketInfo({
        name: data.name,
        contact: data.contact,
        latitude: location.latitude,
        longitude: location.longitude,
        busNo: selectedBus.busNo,
        userId: selectedBus.userId
      });
      if (storeData) {
        console.log("Data stored successfully");
        setShowBookingForm(false);
      }
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  const handleBackToRoutes = () => {
    setSelectedRoute(null);
    setSelectedBus(null);
    setShowBookingForm(false);
  };

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
    setShowBookingForm(true); // Show booking form when bus is clicked
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Process the booking (e.g., send data to backend)
    console.log('Booking Details:', bookingDetails);
    console.log('Selected Bus:', selectedBus);

    // After submitting, reset form and hide the booking form
    setShowBookingForm(false);
    setBookingDetails({
      name: '',
      contact: '',
    });
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedBus(null);
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
        {/* List of Routes */}
        <AnimatePresence>
          {!selectedRoute && (
            <motion.div
              key="route-list"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              {sampleRoutes.map((route) => (
                <div
                  key={route.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRouteClick(route)}
                >
                  <h3 className="text-md font-semibold">{route.name}</h3>
                  <p className="text-sm text-gray-600">{route.districtName}</p>
                  <p className="text-sm text-gray-600">Total Buses: {route.totalBuses}</p>
                  {/* Added district name */}
                  <p className="text-sm text-green-600">Active Buses: {users.length}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* List of Buses */}
          {selectedRoute && !showBookingForm && (
            <motion.div
              key="bus-list"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
            >
              {users.map((bus, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow-md flex items-center justify-between cursor-pointer"
                  onClick={() => handleBusClick(bus)}
                >
                  <div className="flex items-center space-x-3">
                    <FaBus className="text-blue-500 text-2xl" />
                    <div>
                      <p className="text-sm font-semibold">Bus No: {bus.busNo}</p>
                      <p className="text-sm font-semibold">Next Stop: {bus.nextStop}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Booking Form */}
          {showBookingForm && (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-gray-50 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">Book Bus {selectedBus?.busNo}</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Close Icon */}
                <div className="flex justify-end">
                  <button type="button" onClick={handleCloseBookingForm}>
                    <FaTimes className="text-gray-500 hover:text-gray-800 text-xl" />
                  </button>
                </div>

                {/* Name Input */}
                <div>
                  <Input
                    variant="bordered"
                    type="text"
                    label="Enter Your Name"
                    className="w-full"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Contact Input */}
                <div>
                  <Input
                    variant="bordered"
                    type="text"
                    label="Contact"
                    className="w-full"
                    {...register("contact", { required: "Contact is required" })}
                  />
                  {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="w-full">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all w-full"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Section */}
      <div className="p-4 bg-gray-100 text-center text-sm text-gray-600">
        {!selectedRoute
          ? `Total Routes: ${sampleRoutes.length}`
          : `Total Buses in Route: ${selectedRoute.totalBuses}`}
      </div>
    </motion.div>
  );
};

export default RouteInfoSidebar;
