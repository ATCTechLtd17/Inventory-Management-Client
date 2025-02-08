import { useState } from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import MainHomeNav from "./MainHomeNav";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";

const MainHomepage = () => {
    
    // State to toggle the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

   
    
    return (
        <>
          {/* Nav Bar */}
      <div className="overflow-x-hidden relative"> 
      <div className="bg-gradient-to-r from-teal-500 to-teal-700 sticky text-white font-bold top-0 z-20 flex w-full items-center justify-between border-b border-gray-500 p-3 md:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Navigation */}
        <div className="hidden md:flex md:items-center">
         <MainHomeNav/>
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
         className={`absolute top-[9%] right-[5%] bg-teal-600 w-[200px] h-[300px] rounded-lg border border-teal-700 
          transition-transform  duration-500 ease-in-out
          ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        
          <div>
           <MainHomeNav/>
          </div>
        
      </div>}

      {/* Main Content */}
       {/* Main Content */}
       <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-100 to-slate-50">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-500 drop-shadow-lg text-center">
          Welcome to <span className="text-red-500">Aungshu</span> Family
        </h1>
      </div>
    
    
     
    </div>
    {/* Footer */}
    <div>
            <footer className="bg-gray-800 text-white py-10 px-4 md:px-0">
              <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Company</h3>
                  <ul>
                    <li><a href="/homelayout/about" className="hover:text-teal-400">About Us</a></li>
                    <li><a href="services" className="hover:text-teal-400">Services</a></li>
                    <li><a href="/homelayout/blog" className="hover:text-teal-400">Blog</a></li>
                   
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
                  <ul>
                    <li>Address: Majidia Shopping Center, Ganakpara, Ghoramara, Boalia,Rajshahi</li>
                    <li>Email: <a href="mailto:aungshu.official@gmail.com" className="hover:text-teal-400">aungshu.official@gmail.com</a></li>
                    <li>Phone: +8801322929527 , +8801716726043</li>
                  </ul>
                 
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                 <div className="flex space-x-2">
                 <a href="https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZW4ifQ%3D%3D%22%7D">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.33 3.608 1.305.975.975 1.243 2.242 1.305 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.33 2.633-1.305 3.608-.975.975-2.242 1.243-3.608 1.305-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.33-3.608-1.305-.975-.975-1.243-2.242-1.305-3.608-.058-1.265-.069-1.645-.069-4.849s.012-3.584.07-4.849c.062-1.366.33-2.633 1.305-3.608.975-.975 2.242-1.243 3.608-1.305 1.265-.058 1.645-.069 4.849-.069m0-2.163c-3.259 0-3.667.012-4.947.071-1.525.068-2.884.343-3.947 1.407-1.063 1.063-1.338 2.422-1.407 3.947-.059 1.281-.071 1.689-.071 4.947s.012 3.667.071 4.947c.068 1.525.343 2.884 1.407 3.947 1.063 1.063 2.422 1.338 3.947 1.407 1.281.059 1.689.071 
                    4.947.071s3.667-.012 4.947-.071c1.525-.068 2.884-.343 3.947-1.407 1.063-1.063 1.338-2.422 1.407-3.947.059-1.281.071-1.689.071-4.947s-.012-3.667-.071-4.947c-.068-1.525-.343-2.884-1.407-3.947-1.063-1.063-2.422-1.338-3.947-1.407-1.281-.059-1.689-.071-4.947-.071zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-8 3.999 3.999 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
                  ></path>
                </svg>
              </a>

              <a href="https://www.facebook.com/people/%E0%A6%85%E0%A6%82%E0%A6%B6%E0%A7%81-%E0%A6%97%E0%A7%8D%E0%A6%B0%E0%A6%A8%E0%A7%8D%E0%A6%A5%E0%A6%95%E0%A7%81%E0%A6%9F%E0%A6%BF%E0%A6%B0/100082144741531/?locale=te_IN">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
                 </div>
                </div>
              </div>
              <div className="text-center mt-8">
                <p className="text-sm font-semibold md:text-base">
                  Developed by ATC Tech Ltd. ©2025
                </p>
              </div>
            </footer>
            </div>


   
    
  </>
    );
};

export default MainHomepage;