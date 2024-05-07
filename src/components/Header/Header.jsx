import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Login from '../Login/Login';

function Header() {
  const mapRef = useRef(null);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  return (
    <nav className='bg-gray-950 text-white flex items-center h-20 text-xl'>
      <Link to='/'>
        <div className='w-52  text-3xl justify-center items-center flex cursor-pointer font-semibold'>
          Navigate
        </div>
      </Link>
      <div className='flex w-[60%] justify-center'>
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
      <Button size='lg' className='ml-[7.75rem] font-medium' onClick={openLoginForm}>
        Login
      </Button>
      {isLoginFormOpen && <Login onClose={closeLoginForm} />}
    </nav>
  );
}

export default Header;
