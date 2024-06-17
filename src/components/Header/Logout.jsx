import React,{useEffect} from 'react'
import authService from '../../appwrite/auth'
import { useSelector } from 'react-redux';
import authSlice, { logout } from '../../ticketStore/authSlice';
import { useDispatch } from 'react-redux';
import service from '../../appwrite/config';
function Logout() {
  const userData = useSelector(state => state.auth.userData);
const dispatch=useDispatch()


  const logoutHandler = async() => {

    if (userData) {
      try {
        await service.storeUserLocation({ userId: userData.$id, status: false });
        await authService.logout();
         dispatch(logout());
        console.log("Logging out");
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  
    // try {
    //   await authService.logout();
    //   dispatch(logout());
    // } catch (error) {
    //   console.error("Error during logout:", error);
    // }
  };
  //   await authService.logout().then(()=>
  //     dispatch(logout())
  // )

    // authService.logout();
    // dispatch(logout());
    if (!userData) return null;
   

  
  return (
    <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >Logout</button>
  )
}

export default Logout
