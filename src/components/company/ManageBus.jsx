// src/pages/admin/Buses.js
import React, { useState,useEffect } from 'react';
import { FaBus, FaUser, FaCouch, FaSearch, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import service from '../../appwrite/config';
import { Input } from '@nextui-org/input';import { Button, ButtonGroup } from "@nextui-org/react";
import { useForm, Controller } from 'react-hook-form';

function Buses() {
  const [bus, setBus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  

  // Filtered Buses based on search term
  // const filteredBuses = bus.filter(bus =>
  //   bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
  // );


//fetch Bus


useEffect(()=>{
  const fetchBusInfo = async () => {
  
    const data = await service.fetchBus();

   setBus(data.documents)
   
  }

  fetchBusInfo();
},[])


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  // const onSubmit = async(data) => {
   
  //   console.log(data);
  
  //   try {
  //     const userData = await service.addBus(data)
  //     if (userData) {
      
  //       console.log(userData);
  //      // navigate('/login');
     
  //     }
  // } catch (error) {
  //     console.log(error);
  // }
  
  // };

  // Add New Bus
  const onSubmit = async(data) => {
   console.log(data);

      try {
      const userData = await service.addBus(data)
      if (userData) {
      
        console.log(userData);
     
     
      }
  } catch (error) {
      console.log(error);
  }
   

    setModalIsOpen(false);

  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-14">
      <div className="container mx-auto">
        {/* Page Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Bus Management</h1>
          <button
            onClick={() => setModalIsOpen(true)}
            className="bg-blue-600 text-white flex items-center px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            <FaPlus className="mr-2" /> Add New Bus
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search buses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute right-4 top-4 text-gray-400" />
        </div>

        {/* Bus List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bus.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <FaBus className="text-blue-600 text-3xl" />
                <h2 className="text-2xl font-semibold text-gray-800">{bus.busNo}</h2>
              </div>
              <div className="mt-4 text-gray-600">
                <p className="flex items-center">
                  <FaUser className="text-gray-500 mr-2" />Driver: {bus.driver}
                </p>
                <p className="flex items-center">
                  <FaUser className="text-gray-500 mr-2" />Owner: {bus.ownerName}
                </p>
                <p className="flex items-center mt-2">
                  <FaCouch className="text-gray-500 mr-2" /> Route: {bus.route}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding Bus */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Bus</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
       
            <Input
                    variant='bordered'
                    color='black'
                    type="text" label="Current Bus No."
                    {...register("busNo", {required: true})}
/>
          </div>
          <div>
          
            <Input
                    variant='bordered'
                    color='black'
                    type="text" label="Owner Full Name"
                    {...register("ownerName", {required: true })}
                  />
          </div>
          <div>
           
            <Input
                    variant='bordered'
                    color='black'
                    type="text" label="Bus Route"
                    {...register("route", {required: true })}
                  />
          </div>
          <div>
           
            <Input
                    variant='bordered'
                    color='black'
                    type="text" label="Driver Name"
                    {...register("driver", {required: true })}
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
              Add Bus
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Buses;

