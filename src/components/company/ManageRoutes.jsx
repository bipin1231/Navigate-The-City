// src/pages/admin/Routes.js
import React, { useState } from 'react';
import { FaRoute, FaMapMarkerAlt, FaBusAlt, FaSearch, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@nextui-org/input';import { Button, ButtonGroup } from "@nextui-org/react";

function ManageRoutes() {
  const [routes, setRoutes] = useState([
    { id: 1, routeName: 'Pulchowk To Loathor', stops: ['Parsa', 'Tandi', 'Bus park'], totalBuses: 3 },
    // { id: 2, routeName: 'Route 202', stops: ['Stop A', 'Stop B', 'Stop C'], totalBuses: 3 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({ routeName: '', stops: '', totalBuses: '' });

  // Filtered routes based on search term
  const filteredRoutes = routes.filter(route =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add New Route
  const addRoute = () => {
    const stopsArray = newRoute.stops.split(',').map(stop => stop.trim());
    const route = {
      id: routes.length + 1,
      routeName: newRoute.routeName,
      stops: stopsArray,
      totalBuses: parseInt(newRoute.totalBuses, 10),
    };
    setRoutes([...routes, route]);

    setNewRoute({ routeName: '', stops: '', totalBuses: '' });
  };


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async(data) => {
   
    console.log(data);
  
    try {
      const userData = await service.addRoute(data)
      if (userData) {
      
        console.log(userData);
       // navigate('/login');
     
      }
  } catch (error) {
      console.log(error);
  }
  finally{
    setModalIsOpen(false);
  }
  
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-14">
      <div className="container mx-auto">
        {/* Page Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Routes Management</h1>
          <button
            onClick={() => setModalIsOpen(true)}
            className="bg-blue-600 text-white flex items-center px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            <FaPlus className="mr-2" /> Add New Route
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute right-4 top-4 text-gray-400" />
        </div>

        {/* Route List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <FaRoute className="text-blue-600 text-3xl" />
                <h2 className="text-2xl font-semibold text-gray-800">{route.routeName}</h2>
              </div>
              <div className="mt-4 text-gray-600">
                <p className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-500 mr-2" /> Stops: {route.stops.join(', ')}
                </p>
                <p className="flex items-center mt-2">
                  <FaBusAlt className="text-gray-500 mr-2" /> Total Buses: {route.totalBuses}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding Route */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Route</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
          
            <Input
                    variant='bordered'
                    color='black'
                    type="text" label="Route Name"
                    {...register("route", {required: true })}
                  />
          </div>
          <div>
          <Input
                    variant='bordered'
                    color='black'
                    type="text" label="Stops (comma separated)"
                    {...register("stops", {required: true })}
                  />
         
          </div>
          <div>
            <label className="block text-gray-600">Total Buses</label>
            <input
              type="number"
              value={newRoute.totalBuses}
              onChange={(e) => setNewRoute({ ...newRoute, totalBuses: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
             
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Add Route
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ManageRoutes;
