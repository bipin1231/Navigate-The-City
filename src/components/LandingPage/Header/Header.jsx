import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../../appwrite/auth';
import { login } from '../../../ticketStore/authSlice';
import Logout from '../../Header/Logout';


function Header() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu for mobile view
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Navigate The City</div>

        {/* Hamburger Menu for Small Screens */}
        <div className="lg:hidden">
         {/* Replace MenuIcon */}
<button onClick={toggleMenu} className="focus:outline-none">
  {menuOpen ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  )}
</button>

        </div>

        {/* Nav Links */}
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:flex lg:space-x-6 w-full lg:w-auto lg:bg-transparent lg:static absolute bg-white top-full left-0 lg:mt-0 mt-4 lg:py-0 py-6 px-6 lg:px-0`}>
          <Link to='/home' className="block lg:inline-block text-gray-800 font-semibold hover:text-blue-600">
            Home
          </Link>
          <Link to='/map' className="block lg:inline-block text-gray-800 font-semibold hover:text-blue-600 mt-4 lg:mt-0">
            Map
          </Link>
          <Link to='/route' className="block lg:inline-block text-gray-800 font-semibold hover:text-blue-600 mt-4 lg:mt-0">
            Route
          </Link>
          <Link to='/contact' className="block lg:inline-block text-gray-800 font-semibold hover:text-blue-600 mt-4 lg:mt-0">
            Contact
          </Link>

          {!status && (
            <Link to='/loginpage' className="block lg:inline-block mt-4 lg:mt-0">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700">
                Sign Up
              </span>
            </Link>
          )}

          {status && <Logout className="mt-4 lg:mt-0" />}
        </nav>
      </div>
    </header>
  );
}

export default Header;
