import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 mt-[58px]">
      <div className="max-w-5xl w-full space-y-12">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Let's Connect!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are excited to hear from you! Feel free to reach out for any inquiries, feedback, or collaboration ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glassmorphism bg-white/50 backdrop-blur-md shadow-lg rounded-3xl p-8">
            <form className="space-y-6">
              <div>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-full w-full px-5 py-4 bg-white shadow-inner placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-transform duration-300 ease-out hover:scale-105"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-full w-full px-5 py-4 bg-white shadow-inner placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-transform duration-300 ease-out hover:scale-105"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="appearance-none rounded-3xl w-full px-5 py-4 bg-white shadow-inner placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-transform duration-300 ease-out hover:scale-105"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-lg font-semibold rounded-full text-white bg-gray-700 hover:bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform duration-300 ease-out hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details and Map Section */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="glassmorphism bg-white/50 backdrop-blur-md shadow-lg rounded-3xl p-8 text-center">
              <h3 className="text-3xl font-semibold text-gray-800">
                Get In Touch
              </h3>
              <p className="mt-4 text-gray-700 text-lg">
                We love collaborating! Whether you have a project or just want to chat, feel free to reach out.
              </p>
              <div className="mt-6 space-y-4">
                <p className="text-lg text-gray-800"><strong>Email:</strong> teamSuper@collegeproject.com</p>
                <p className="text-lg text-gray-800"><strong>Phone:</strong> +977 9845125372</p>
              </div>
            </div>

            {/* Map */}
            <div className="glassmorphism bg-white/50 backdrop-blur-md shadow-lg rounded-3xl p-8 text-center">
              <h3 className="text-3xl font-semibold text-gray-800">
                Find Us Here
              </h3>
              <MapContainer center={[27.691392576164542, 84.44414394023492]} zoom={13} style={{ height: '250px', width: '100%', borderRadius: '1.5rem' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[27.691392576164542, 84.44414394023492]}>
                  <Popup>Our Project Location: College Campus, Building A</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">Follow us on social media</p>
          <div className="flex justify-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-transform duration-300 ease-out hover:scale-110">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                {/* Example Facebook icon */}
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.88v-6.988h-2.54v-2.892h2.54v-2.2c0-2.506 1.492-3.889 3.776-3.889 1.094 0 2.24.197 2.24.197v2.47h-1.261c-1.242 0-1.63.774-1.63 1.562v1.86h2.773l-.443 2.892h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            <a href="#" className="text-gray-600 hover:text-gray-800 transition-transform duration-300 ease-out hover:scale-110">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                {/* Example Twitter icon */}
                <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.611 1.794-1.575 2.163-2.724-.95.555-2.005.959-3.127 1.177-.897-.956-2.178-1.555-3.594-1.555-2.72 0-4.92 2.206-4.92 4.925 0 .39.042.765.127 1.124C7.728 8.087 4.1 6.128 1.671 3.149c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.214 2.188 4.098-.807-.025-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.956 2.445 3.379 4.604 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.398 0-.79-.023-1.175-.069 2.189 1.402 4.768 2.22 7.548 2.22 9.057 0 14.01-7.496 14.01-13.986 0-.21 0-.42-.015-.63.961-.695 1.8-1.562 2.46-2.548l-.047-.02z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
