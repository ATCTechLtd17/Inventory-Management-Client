import { Link } from "react-router-dom";
import Sideimg from "./../../assets/cosmetics-beauty-logo.jpg";

const Home = () => {
  return (
    <>
       {/* Background Section */}
       <div className="relative h-screen bg-[url('/bgBanner.svg')] bg-cover bg-center flex items-center justify-center">
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-white bg-opacity-70"></div>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between relative z-10 w-11/12 lg:w-10/12">
          {/* Text Section */}
          <div className="text-center lg:text-left space-y-4">
            <h4 className="text-black text-4xl lg:text-6xl font-bold">
              Welcome to Inventory
            </h4>
            <h4 className="text-black text-2xl lg:text-4xl font-bold">
              Management System
            </h4>
            <div className="mt-6">

              <Link to="/homelayout/register">
                <button className="btn bg-gradient-to-r from-gray-800 to-purple-900 text-white px-6 py-3 text-lg ring-4 hover:ring-2">
                  Register Now
                </button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="h-60 w-60 lg:h-96 lg:w-[700px]">
            <img
              src={Sideimg}
              alt="Library Management Illustration"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>


      <div>
        <footer className="footer bg-slate-50 text-base-content border-base-300 border-t px-10 py-4 ">
          <nav className="flex flex-col xs:place-self-center sx:flex-row items-center justify-center space-y-4 xs:space-y-0 xs:space-x-6 h-full">
            <div className="grid grid-flow-col gap-4">
              <a>
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
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Home;
