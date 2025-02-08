import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext/LoginContext";
import axios from "axios";

const Nav = () => {
  const { user, setUser } = useContext(LoginContext); // Access user and setUser from context
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle Logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://libraryserver.atctechlimited.com/api/logout",
        {},
        {
          withCredentials: true, // This is important to include cookies in the request
        }
      );

      if (response.data.success) {
        localStorage.removeItem("user"); // Remove user from local storage
        setUser(null); // Clear user in context
        navigate("/homelayout/login"); // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Toggle Dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-r top-0 w-full z-50 from-slate-100 to-slate-50 text-gray-900 navbar border-b shadow-md flex justify-between items-center p-4">
        {/* Navbar Start */}
        <div className="navbar-start">
          <p className="text-2xl font-bold font-mono">Dashboard</p>
        </div>

        {/* Navbar End */}
        <div className="navbar-end relative">
          {user ? (
            <div className="relative">
              {/* User Badge */}
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                {/* Circular Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://api.iconify.design/mdi:user.svg"
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* User Name */}
                <p className="font-bold text-teal-900">{user.name || "User"}</p>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                  <div className="p-4">
                    <p className="text-sm font-bold">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <hr />
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Login Button if not logged in
            <button
              onClick={() => navigate("/homelayout/login")}
              className="px-4 py-2 bg-white text-teal-600 font-semibold rounded-md shadow hover:bg-gray-100 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
