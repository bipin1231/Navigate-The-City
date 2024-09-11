// src/pages/admin/Dashboard.js
import React from 'react';

//import { Line } from 'react-chartjs-2'; // Optional: You can use a library like chart.js
import { FaBus, FaRoute, FaUsers } from 'react-icons/fa';

function Dashboard() {
  // Mock data for the chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Routes Added',
        data: [12, 19, 3, 5, 2, 3, 10],
        fill: false,
        borderColor: '#4F46E5',
      },
    ],
  };

  return (
<div className='mt-20'>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Monitor the activity and manage your city's transportation system efficiently.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">1</h3>
            <p className="text-gray-600">Total Routes</p>
          </div>
          <FaRoute className="text-blue-600 w-12 h-12" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">2</h3>
            <p className="text-gray-600">Active Buses</p>
          </div>
          <FaBus className="text-green-600 w-12 h-12" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">10</h3>
            <p className="text-gray-600">Total Bus</p>
          </div>
          <FaUsers className="text-purple-600 w-12 h-12" />
        </div>
      </div>
      </div>
   
  );
}

export default Dashboard;
