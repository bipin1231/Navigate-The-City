import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Logout from './Logout';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { login } from '../../ticketStore/authSlice';

function Header() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);
  console.log(status);

  useEffect(() => {
    const getData = async () => {
      const data = await authService.getCurrentUser();
      console.log(data);
      if (data) {
        dispatch(login(data));
      }
    };
    getData();
  }, [dispatch]);

  return (
    <nav className='bg-[#1506B5] flex items-center h-[10vh] text-xl w-full pr-1 md:pr-4 flex justify-between'>
      <Link to='/'>
        <div className='flex items-center cursor-pointer'>
          <img src='../logo.svg' className='w-14 h-8 md:w-24 md:h-12' alt="Logo"/>
        </div>
      </Link>
      <div>
        <ul className='flex mt-6 gap-4 md:gap-10 text-base md:text-xl'>
          
          <Link to='/home'>
            <li className='relative group'>
              <span className='text-white text-xl md:text-3xl w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-20px]'>
                  <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 bottom-0 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Home</span>
            </li>
          </Link>

          <Link to='/searchbus'>
            <li className='relative group'>
                <span className='text-white text-xl md:text-3xl w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-20px]'>
                  <ion-icon name="ticket-outline"></ion-icon>
                </span>
                <span className='absolute left-1/2 transform -translate-x-1/2 bottom-0 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Ticket</span>
              </li>
          </Link>

          <Link to='/route'>
            <li className='relative group'>
              <span className='text-white text-xl md:text-3xl w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-20px]'>
                <ion-icon name="trending-up-outline"></ion-icon>
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 bottom-0 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Route</span>
            </li>
          </Link>

          <Link to='/DriverInfo'>
            <li className='relative group'>
              <span className='text-white text-xl md:text-3xl w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-20px]'>
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 bottom-0 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Driver</span>
            </li>
          </Link>

          <Link to='/CompanyInfo'>
            <li className='relative group'>
              <span className='text-white text-xl md:text-3xl w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-20px]'>
                <ion-icon name="business-outline"></ion-icon>
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 bottom-0 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Company</span>
            </li>
          </Link>
        </ul>
      </div>
      {!status && (
        <Link to="/login">
          <div className='relative group mt-6'>
              <span className='text-white text-3xl w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-20px]'>
                <ion-icon name="log-in-outline"></ion-icon>
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 bottom-0 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Login</span>
            </div>
        </Link>
      )}
      {status && <Logout />}
    </nav>
  );
}

export default Header;
