import React, { useState, useEffect } from 'react';
import service from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPhone, FaLocationArrow, FaTimes } from 'react-icons/fa';

// Custom hook for map zooming to location
function ZoomToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], 13, {
        animate: true,
        duration: 1.5
      });
    }
  }, [position, map]);

  return null;
}

function BookingInfoForDriver() {
  const [info, setInfo] = useState([]); // Stores booking info
  const [selectedPassenger, setSelectedPassenger] = useState(null); // Stores selected passenger's info for zooming
  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    
    (async function() {
      try {
        const data = await service.showTicketInfo(userData.userData.$id);
        setInfo(data.documents); // Set passenger booking info
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userData]);

  const handlePassengerClick = (passenger) => {
    setSelectedPassenger({
      lat: passenger.latitude,
      lng: passenger.longitude,
      name: passenger.name,
      contact: passenger.contact
    });
  };

  const handleClose = () => {
    setSelectedPassenger(null);
  };

  return (
    <div className="gap-6 mt-20 px-6">
      {/* Page Title */}
      <div className="w-full mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">Bus Booking Information</h1>
        <p className="text-lg text-gray-600 text-center">View details of passengers and their locations.</p>
      </div>

      <div className='flex flex-col lg:flex-row justify-around'>
      {/* Booking Information Section */}
      <div className="w-full lg:w-1/3 p-6 bg-gradient-to-b from-white to-gray-100 shadow-xl rounded-lg overflow-auto h-[450px] border border-gray-200">
        <h2 className="text-2xl font-extrabold mb-4 text-gray-900 tracking-wide">Passengers Info</h2>
        <AnimatePresence>
          {info.length > 0 ? (
            info.map((passenger, index) => (
              <motion.div
                key={index}
                className="p-4 mb-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer border border-gray-200 transition-all"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onClick={() => handlePassengerClick(passenger)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500 text-white p-3 rounded-full">
                    <FaUser />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-700">{passenger.name}</p>
                    <p className="text-sm text-gray-500"><FaPhone className="inline mr-2" />{passenger.contact}</p>
                    <p className="text-sm text-gray-400"><FaLocationArrow className="inline mr-2" />Lat: {passenger.latitude}, Lng: {passenger.longitude}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No bookings available.</p>
          )}
        </AnimatePresence>
      </div>

      {/* Map Section */}
      <div className="w-full lg:w-1/2 h-[450px] relative rounded-lg shadow-lg overflow-hidden">
        <MapContainer center={[27.7172, 85.3240]} zoom={12} className="h-full w-full rounded-lg">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selectedPassenger && (
            <>
              <Marker position={[selectedPassenger.lat, selectedPassenger.lng]}>
                <Popup>
                  {selectedPassenger.name}<br />Contact: {selectedPassenger.contact}
                </Popup>
              </Marker>
              <ZoomToLocation position={{ lat: selectedPassenger.lat, lng: selectedPassenger.lng }} />
            </>
          )}
        </MapContainer>
        </div>

        {/* Close Passenger Info Button */}
        {selectedPassenger && (
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 bg-red-500 text-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-red-600 transition-transform transform hover:scale-110"
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
}

export default BookingInfoForDriver;
