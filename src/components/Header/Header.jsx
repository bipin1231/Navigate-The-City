// <<<<<<< bipin
// import React from 'react'
// import {Link,NavLink} from 'react-router-dom'
// import {Button} from "@nextui-org/react";
// import Logout from './Logout';
// import { useSelector } from 'react-redux';


// function Header() {
//   const selector=useSelector(state=>state.auth.status);
//   console.log(selector);
//   return (
//     <nav className='bg-gray-950 text-white flex items-center h-20 text-xl'>
//      <Link to="/">
//     <div className='w-52  text-3xl justify-center items-center flex cursor-pointer font-semibold'> 
//       Navigate
//     </div>
//     </Link>
//     <div className='flex w-[60%] justify-center'>
//       <ul className='flex gap-16 font-medium text-xl '>
//         <NavLink to="/home"
//        className={({isActive})=>`${isActive?"text-gray-400":""}`}
//         >
//         <li className='cursor-pointer'>Home</li>
//         </NavLink>
//         <NavLink to="/searchbus"
//         className={({isActive})=>`${isActive?"text-gray-400":""}`}
//         >
//         <li className='cursor-pointer'>Buy Ticket</li></NavLink>
//         <NavLink to="/route"
//         className={({isActive})=>`${isActive?"text-gray-400":""}`}
//         >
//         <li className='cursor-pointer'>Route</li></NavLink>
//       </ul>
//     </div>
//     <Link to="/login">
//     <Button size="lg" className='ml-[7.75rem] font-medium'>
//       Login
//       </Button> 
//       <Logout/>
//     </Link>
//    </nav>
//   )
// =======
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Login from '../Login/Login';
import Logout from './Logout';
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../../appwrite/auth';
import { login } from '../../ticketStore/authSlice';

function Header() {
  const dispatch=useDispatch();
  const status=useSelector(state=>state.auth.status)
  console.log(status);
  // const userData=useSelector(state=>state.auth)
  // console.log(userData);
  
// try{
//   const info=authService.getSessions();

// if(info) console.log(info);
// else console.log("not");
// }catch(error){
//   console.log(error);
// }

//-------------appwrite get data----------
// const getData=async()=>{
//   const data=await authService.getCurrentUser();
//   console.log(data);
//   if(data.$id) {
//     dispatch(login(data))
//   }
// }
// getData();


useEffect(()=>{
  const getData=async()=>{
  const data=await authService.getCurrentUser();
  console.log(data);
  if(data) {
    dispatch(login(data))
  }
}
getData();
})

  // const authStatus = useSelector((state) => state.auth)
  // console.log(authStatus);
  // const navigate = useNavigate()

  //const mapRef = useRef(null);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormOpen(false);
  };

  return (
    <nav className='bg-[#1506B5] text-white flex items-center h-[60px] text-xl'>
      <Link to='/'>
        <div className='w-52  text-3xl justify-center items-center flex cursor-pointer font-semibold'>
          <img src='../logo.svg' className='w-25 h-12'/>
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
// // <<<<<<< main
// //       <Button className='ml-[7.75rem] font-medium' onClick={openLoginForm}>
// // =======
//       {/* <Button size='lg' className='ml-[7.75rem] font-medium' onClick={openLoginForm}>
// >>>>>>> recovery-branch
//         Login
//       </Button> */}
//       {/* {isLoginFormOpen && <Login onClose={closeLoginForm} />} */}

  { !status &&   <Link to="/login">
      <Button size="lg" className='ml-[7.75rem] font-medium'>
       Login
       </Button> 
       </Link>}
    { status &&  <Logout/>}
    {/* <Logout/> */}
    </nav>
  );
}

export default Header;
