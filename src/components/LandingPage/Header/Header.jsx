import React from 'react'
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import authService from '../../../appwrite/auth';
import { login } from '../../../ticketStore/authSlice';
import Logout from '../../Header/Logout';

function Header() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);

  console.log(status);


  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await authService.getCurrentUser();
  //     console.log(data);
  //     if (data) {
  //       console.log("hey",data);
  //       dispatch(login(data));
  //     }
  //   };
  //   getData();
  // },[]);

  return (
    <header className="bg-white shadow-md fixed w-full z-10 top-0">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">Navigate The City</div>
      <nav className="space-x-6">
      <Link to='/home'>
        <span className="text-gray-800 font-semibold hover:text-blue-600">Home</span>
        </Link>
        <Link to='/map'>
        <span className="text-gray-800 font-semibold hover:text-blue-600">Map</span>
        </Link>
        <Link to='/route'>
        <span className="text-gray-800 font-semibold hover:text-blue-600">Route</span>
        </Link>
        <Link to='/contact'>
        <span className="text-gray-800 font-semibold hover:text-blue-600">Contact</span>
        </Link>
        {!status && 
        <Link to='/loginpage'>
        <span className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700">Sign Up</span>
        </Link>
        }
        {
          status && <Logout/>
        }
       
      </nav>
    </div>
  </header>
  )
}

export default Header
