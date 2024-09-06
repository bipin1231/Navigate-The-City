import React from 'react';

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 mt-[58px]">
      <div className="max-w-3xl w-full space-y-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">Let's Connect!</h2>
          <p className="text-lg text-gray-700">
            Got questions or feedback? Drop us a message and we'll get back to you. We’re always excited to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="full-name" className="sr-only">Full Name</label>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-md w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-out hover:scale-105"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-out hover:scale-105"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="appearance-none rounded-md w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-transform duration-300 ease-out hover:scale-105"
                  placeholder="Your Message"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-md font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-300 ease-out hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Details Section */}
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-indigo-700">Reach Out To Us</h3>
              <p className="mt-2 text-gray-600">We love collaborating! Whether you have a project or just want to chat, feel free to reach out!</p>
              <div className="mt-4">
                <p className="text-md text-gray-800"><strong>Email:</strong> contact@collegeproject.com</p>
                <p className="text-md text-gray-800"><strong>Phone:</strong> +1 123 456 7890</p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-indigo-700">Find Us Here</h3>
              <p className="mt-2 text-gray-600">Visit us at our project booth or join us in the collaboration zone!</p>
              <div className="mt-4">
                <p className="text-md text-gray-800"><strong>Location:</strong> College Campus, Building A</p>
                <p className="text-md text-gray-800"><strong>Hours:</strong> Mon-Fri 10AM - 4PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">Follow us on social media</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-transform duration-300 ease-out hover:scale-110">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* Example Facebook icon */}
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.88v-6.988h-2.54v-2.892h2.54v-2.2c0-2.506 1.492-3.889 3.776-3.889 1.094 0 2.24.197 2.24.197v2.47h-1.261c-1.242 0-1.63.774-1.63 1.562v1.86h2.773l-.443 2.892h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-transform duration-300 ease-out hover:scale-110">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* Example Twitter icon */}
                <path d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.611 1.794-1.575 2.163-2.724-.95.555-2.005.959-3.127 1.177-.897-.956-2.178-1.555-3.594-1.555-2.72 0-4.92 2.206-4.92 4.925 0 .39.042.765.127 1.124C7.728 8.087 4.1 6.128 1.671 3.149c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.214 2.188 4.098-.807-.025-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.956 2.445 3.379 4.604 3.419-1.68 1.319-3.809 2.105-6.102 2.105-.398 0-.79-.023-1.175-.069 2.189 1.402 4.768 2.22 7.548 2.22 9.057 0 14.01-7.496 14.01-13.986 0-.21 0-.42-.015-.63.961-.695 1.8-1.562 2.46-2.548l-.047-.02z" />
              </svg>
            </a>
            {/* Add other social media links similarly */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
