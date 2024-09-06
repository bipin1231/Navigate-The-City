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
    console.log(userData);
    const data = await authService.getCurrentUser();
    console.log(data);

    if (data) {
      try {
       
     //   await service.storeUserLocation({ userId: userData.$id, status: false });
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
   // if (!userData) return null;
   

  
  return (

    // <button
    //   className='bg-blue-600 text-white px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-blue-700'
    //   onClick={logoutHandler}
    // >Logout</button>
    <span 
    onClick={logoutHandler}
    className="block  lg:inline-block mt-4 lg:mt-0 cursor-pointer">
      <span className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700">Log Out</span>
    </span>

  )
}

export default Logout
