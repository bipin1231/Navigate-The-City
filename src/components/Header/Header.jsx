import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from "@nextui-org/react";

function Header() {
  return (
    <nav className='bg-gray-950 text-white flex items-center h-20 text-xl'>
     <Link to="/">
    <div className='w-52  text-3xl justify-center items-center flex cursor-pointer font-semibold'> 
      Navigate
    </div>
    </Link>
    <div className='flex w-[60%] justify-center'>
      <ul className='flex gap-16 font-medium text-xl'>
        <Link to="/home">
        <li className='cursor-pointer'>Home</li>
        </Link>
        <Link to="/searchbus">
        <li className='cursor-pointer'>Buy Ticket</li></Link>
        <Link to="/route">
        <li className='cursor-pointer'>Route</li></Link>
      </ul>
    </div>
    <Link to="/login">
    <Button size="lg" className='ml-[7.75rem] font-medium'>
      Login
      </Button> 
    </Link>
   </nav>
  )
}

export default Header
