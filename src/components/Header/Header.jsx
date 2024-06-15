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
    <nav className='bg-[#1506B5] text-white flex items-center h-[10vh] text-xl w-full pr-1 md:pr-4 flex justify-between'>
      <Link to='/'>
        <div className='flex items-center cursor-pointer'>
          <img src='../logo.svg' className='w-14 h-8 md:w-24 md:h-12' alt="Logo"/>
        </div>
      </Link>
      <div>
        <ul className='flex gap-4 md:gap-10 text-base md:text-xl'>
          <Link to='/home'>
            <li className='cursor-pointer'>Home</li>
          </Link>
          <Link to='/searchbus'>
            <li className='cursor-pointer'>Buy Ticket</li>
          </Link>
          <Link to='/route'>
            <li className='cursor-pointer'>Route</li>
          </Link>
        </ul>
      </div>
      {!status && (
        <Link to="/login">
          <div className='text-base md:text-xl'>
            Login
          </div>
          {/* <Button className='ml-auto'>
            Login
          </Button> */}
        </Link>
      )}
      {status && <Logout />}
    </nav>
  );
}

export default Header;
