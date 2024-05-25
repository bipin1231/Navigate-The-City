import React from 'react'
import authService from '../../appwrite/auth'
import authSlice, { logout } from '../../ticketStore/authSlice';
import { useDispatch } from 'react-redux';
function Logout() {
const dispatch=useDispatch()
  const logoutHandler = async() => {
    await authService.logout().then(()=>
      dispatch(logout())
  )
}
    // authService.logout();
    // dispatch(logout());
    
   

  
  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default Logout
