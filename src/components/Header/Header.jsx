import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import {Button} from "@nextui-org/react";
import Logout from './Logout';
import { useSelector } from 'react-redux';


function Header() {
  const selector=useSelector(state=>state.auth.status);
  console.log(selector);
  return (
    <nav className='bg-gray-950 text-white flex items-center h-20 text-xl'>
     <Link to="/">
    <div className='w-52  text-3xl justify-center items-center flex cursor-pointer font-semibold'> 
      Navigate
    </div>
    </Link>
    <div className='flex w-[60%] justify-center'>
      <ul className='flex gap-16 font-medium text-xl '>
        <NavLink to="/home"
       className={({isActive})=>`${isActive?"text-gray-400":""}`}
        >
        <li className='cursor-pointer'>Home</li>
        </NavLink>
        <NavLink to="/searchbus"
        className={({isActive})=>`${isActive?"text-gray-400":""}`}
        >
        <li className='cursor-pointer'>Buy Ticket</li></NavLink>
        <NavLink to="/route"
        className={({isActive})=>`${isActive?"text-gray-400":""}`}
        >
        <li className='cursor-pointer'>Route</li></NavLink>
      </ul>
    </div>
    <Link to="/login">
    <Button size="lg" className='ml-[7.75rem] font-medium'>
      Login
      </Button> 
      <Logout/>
    </Link>
   </nav>
  )
}

export default Header
