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
    <nav className='bg-[#1506B5] text-white flex items-center h-[10vh] text-xl w-full px-4'>
      <Link to='/'>
        <div className='text-3xl flex items-center cursor-pointer font-semibold'>
          <img src='../logo.svg' className='w-25 h-12' alt="Logo"/>
        </div>
      </Link>
      <div className='flex-1 flex justify-center'>
        <ul className='flex gap-16 font-medium text-xl'>
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
          <Button className='ml-auto'>
            Login
          </Button>
        </Link>
      )}
      {status && <Logout />}
    </nav>
  );
}

export default Header;
