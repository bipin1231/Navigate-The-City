import React, { useState} from 'react';
import Login from '../Login/Login';
// import Login from './Login';

const ProfileSidebar = ({ isOpen}) => {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  return (
    isOpen && (
        <div
        className='fixed top-10 left-0 z-[1001] w-[150px] ml-1 py-2 rounded-lg bg-green-400 pointer-events-auto text-center'
          style={{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
          }}
        >
      <ul className='list-unstyled w-full'>
        <li className='mb-1 cursor-pointer hover:bg-green-300 py-1'>Driver Info</li>
        <li className='mb-1 cursor-pointer hover:bg-green-300 py-1'>Bus Route</li>
        {/* <li className='mb-1 cursor-pointer hover:bg-green-300 py-1' onClick={openDriverInfo}>Driver Info</li>
        <li className='mb-1 cursor-pointer hover:bg-green-300 py-1' onClick={openDriverInfo}>Bus Route</li> */}
        <li><button className='w-full hover:bg-green-300 py-1' onClick={openLoginForm}>Login</button></li>
        {/* <button onClick={() => openLoginForm()}>Login</button> */}
      </ul>
{/* <Login */}
      {isLoginFormOpen && <Login onClose={closeLoginForm} />}
    </div>
    )
  );
};

export default ProfileSidebar;
