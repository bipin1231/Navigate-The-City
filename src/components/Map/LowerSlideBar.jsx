import React, {useState, useEffect} from 'react'
import Speedometer from './Speedometer'

function LowerSlideBar() {
    const [speed, setSpeed] = useState(0);
    const [bottomPosition, setBottomPosition] = useState(0);

    const handleButtonClick = () => {
      setBottomPosition(bottomPosition === 0 ? 20 : 0);
    };

    useEffect(() => {
     // Watch user's position and update speed
     const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setSpeed(position.coords.speed || 0);
        },
        (error) => {
          console.error("Error getting speed:", error);
        }
      );
  
      return () => {
        // Clean up the watchPosition when component unmounts
        navigator.geolocation.clearWatch(watchId);
      };
    })
  return (
  <div className={`fixed ${bottomPosition === 0 ? 'bottom-[-100px]' : 'bottom-0'} duration-200 bg-blue-500 rounded-t-lg w-[500px] h-[100px] z-[1300]`}>

        <div className='flex justify-center mt-[-30px]'>
            <button onClick={handleButtonClick}>
            <img src='../arrow-up.png' className='w-10 h-10' />
            </button>
        </div>
      <div>
      <Speedometer speed={speed} />
      </div>
    </div>
  )
}

export default LowerSlideBar
