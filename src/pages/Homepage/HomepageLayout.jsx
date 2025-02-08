import { useState } from "react";
import Logo from "./Logo";
import Nav from "./Nav";

import { Outlet } from "react-router-dom";

const HomepageLayout = () => {

    // State to toggle the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   

  return (
    <>
      {/* Nav Bar */}
      <div>
        <div className="bg-gradient-to-r from-gray-800 to-purple-900 sticky text-white font-bold top-0 z-20 flex w-full items-center justify-between border-b border-gray-500 p-3 md:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Navigation */}
          <div className="hidden md:block">
            <Nav />
          </div>

          {/* Mobile Navigation Button */}
          <div className="block md:hidden">
            <button
            onClick={()=>setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none "
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen &&<div
         className={`absolute  right-[5%] bg-teal-600 w-[200px] h-[300px] rounded-lg border border-teal-700 
          transition-transform  duration-500 ease-in-out z-20
          ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        
          
            <div >
              <Nav />
            </div>
          
        </div>}

       <div>
        <Outlet/>
       </div>
       

      </div>

      {/* Footer */}
      <div>
        <footer className="bg-gray-200 text-gray-600 text-center py-1 px-4 md:px-0">
          <p className="text-sm font-semibold md:text-base">
            Developed by ATC Tech Ltd. ©2025
          </p>
        </footer>
      </div>
    </>
  );
};

export default HomepageLayout;