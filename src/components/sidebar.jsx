import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Category from "./Layout/BooksLayout/Category";

const Sidebar = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState("");

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  return (
    <div>
      <h1 className="md:text-2xl font-bold mb-6">Menu</h1>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "font-semibold text-white" : "hover:text-white hov"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="bookmanagement"
          className={({ isActive }) =>
            isActive ? "font-semibold text-white" : "hover:text-white"
          }
        >
          Cosmetics Management
        </NavLink>

        {/* Categories Dropdown */}
        <div className="space-y-2">
          <Category />
        </div>

        {/* Reports Dropdown */}
        {userRole === "Admin" && (
          <div className="space-y-2">
            <button
              onClick={toggleAccountDropdown}
              className="flex items-center justify-between w-full text-left font-sem-font-semibold hover:text-white"
            >
              <span>Reports</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ${
                  isAccountDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isAccountDropdownOpen && (
              <div className="flex flex-col ml-4 space-y-2">
                <NavLink
                  to="purchase-list"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-white"
                      : "hover:text-white hover:scale-110 hover:translate-x-6 transform transition-all duration-500"
                  }
                >
                  Purchase Reports
                </NavLink>
                <NavLink
                  to="sales-list"
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold text-white"
                      : "hover:text-white hover:scale-110 hover:translate-x-6 transform transition-all duration-500"
                  }
                >
                  Sales Reports
                </NavLink>
              </div>
            )}
          </div>
        )}
        <NavLink
          to="expense"
          className={({ isActive }) =>
            isActive ? "font-semibold text-white" : "hover:text-white"
          }
        >
          Expense Sheet
        </NavLink>

        {userRole === "Admin" && (
          <NavLink
            to="balancesheet"
            className={({ isActive }) =>
              isActive ? "font-semibold text-white" : "hover:text-white"
            }
          >
            Balance Sheet
          </NavLink>
        )}
        {userRole === "Admin" && (
          <NavLink
            to="usermanage"
            className={({ isActive }) =>
              isActive ? "font-semibold text-white" : "hover:text-white"
            }
          >
            User Management
          </NavLink>
        )}

        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive ? "font-semibold text-white" : "hover:text-white"
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
