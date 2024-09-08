import React, {useState, useEffect} from 'react'
import authService from '../../appwrite/auth'
import { useSelector } from 'react-redux';
import authSlice, { logout } from '../../ticketStore/authSlice';
import { useDispatch } from 'react-redux';
import service from '../../appwrite/config';
function Logout() {
  const [loading, setLoading] = useState(false);
 
  const dispatch=useDispatch()


  

  const logoutHandler = async() => {
    setLoading(true);
   
    const data = await authService.getCurrentUser();


    if (data) {
      try {
       
        await service.storeUserLocation({ userId: data.$id, status: false });
       
        await authService.logout();
        dispatch(logout());
        
        console.log("Logging out");
      } catch (error) {
        console.error("Error updating user status:", error);
      } finally {
      setLoading(false);
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
    <>
      <span 
        onClick={logoutHandler}
        className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md font-semibold cursor-pointer hover:bg-blue-700"
      >
        Logout
      </span>
      
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
          <img src="../loading.gif" alt="Loading..." className='w-30 h-30' />
        </div>
      )}
    </>
  )
}

export default Logout
