import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Logout from './Logout';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { login } from '../../ticketStore/authSlice';
import service from '../../appwrite/config';
function Header() {
  const dispatch = useDispatch();
  const status = useSelector(state => state.auth.status);

  console.log(status);


  useEffect(() => {
    const getData = async () => {
      const data = await authService.getCurrentUser();
      console.log(data);
      if (data) {
        console.log("hey",data);
        dispatch(login(data));
      }
    };
    getData();
  }, [dispatch]);

// if(userData){
//   useEffect(() => {
//     const setStatus = async () => {
//       const data = await service.storeUserLocation({userId:userData,status:true});
//       console.log("helloooooo");
    
//     };
//     setStatus();
//   }, []);
// }
  return (
    // <nav className='bg-[#1506B5] flex items-center h-[10vh] text-xl w-full pr-1 md:pr-4 flex justify-between'>
    <nav className='fixed w-full h-[7vh] md:h-[10vh] flex justify-center bg-transparent z-[1500]'>
      <Link to='/'>
        <div className='absolute left-[1%] md:left-[5%] flex items-center cursor-pointer'>
          <img src='../logo.svg' className='w-14 h-8 md:w-24 md:h-12' alt="Logo"/>
        </div>
      </Link>
      <div
      className='bg-[#1506B5] items-center flex justify-center top-[-5vh] md:top-[-7vh] w-[75%] md:w-[70%] transition-all duration-400'
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
        position: 'relative',
        // top: '-7vh',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.top = '0';
      }}
      onMouseLeave={(e) => {
        // For mobile devices (small screens)
        e.currentTarget.style.top = '-4vh';
        
        // For laptops and larger screens (using responsive styles inline)
        if (window.innerWidth >= 768) {
          e.currentTarget.style.top = '-7vh';
        }
      }}
    >
      <div>
        <ul className='flex mt-6 pb-8 gap-4 md:gap-10 text-sm md:text-xl'>
          
          <Link to='/home'>
            <li className='relative group'>
              <span className='w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-12px]'>
                  <img src='../home-icon.svg' className='w-6 h-6 md:w-8 md:h-8' />
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 -bottom-3 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Home</span>
            </li>
          </Link>

          <Link to='/searchbus'>
            <li className='relative group'>
                <span className='w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-12px]'>
                <img src='../ticket-icon.svg' className='w-6 h-6 md:w-8 md:h-8' />
                </span>
                <span className='absolute left-1/2 transform -translate-x-1/2 -bottom-3 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Ticket</span>
              </li>
          </Link>

          <Link to='/route'>
            <li className='relative group'>
              <span className='t w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-12px]'>
              <img src='../route-icon.svg' className='w-6 h-6 md:w-8 md:h-8' />
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 -bottom-3 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Route</span>
            </li>
          </Link>

          {/* <Link to='/DriverInfo'>
            <li className='relative group'>
              <span className='text-white text-xl md:text-3xl w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-12px]'>
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 -bottom-3 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Driver</span>
            </li>
          </Link>

          <Link to='/CompanyInfo'>
            <li className='relative group'>
              <span className='text-white text-xl md:text-3xl w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-12px]'>
                <ion-icon name="business-outline"></ion-icon>
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 -bottom-3 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Company</span>
            </li>
          </Link> */}
      {!status && (
        <Link to="/login">
          <li className='relative group'>
              <span className='w-10 text-center block transition-transform duration-300 group-hover:translate-y-[-12px]'>
                <img src='../login-icon.svg' className='w-6 h-6 md:w-8 md:h-8' />
              </span>
              <span className='absolute left-1/2 transform -translate-x-1/2 -bottom-3 opacity-0 text-white transition-opacity duration-300 group-hover:opacity-100'>Login</span>
            </li>
        </Link>
      )}
      {status && <Logout />}
        </ul>
      </div>

      </div>
    </nav>
  );
}

export default Header;
