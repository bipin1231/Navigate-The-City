import React, {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import ProfileSidebar from "../SideBar/ProfileSidebar";

  const Header = () => {

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const toggleProfileSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };
  const closeLeftSidebar = () => {
    setLeftSidebarOpen(false);
  };

  return (
    <>
      <div className="flex justify-start w-full bg-transparent fixed pointer-events-none z-[1000] top-3 ml-10">
        <div 
          className="cursor-pointer pointer-events-auto hover:scale-125 duration-200"
          onClick={() => toggleProfileSidebar()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <ProfileSidebar 
        isOpen={leftSidebarOpen}
        onClose={closeLeftSidebar}/>

        <Link to="/">
          <div className="w-52  text-2xl justify-center items-center flex cursor-pointer pointer-events-auto">
            Navigate
          </div>
        </Link>
        
      </div>
    </>
  );
}


export default Header;
