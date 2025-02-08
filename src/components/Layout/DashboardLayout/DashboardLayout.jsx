import MainLayout from "../MainLayout/MainLayout";
import Nav from "../../nav";
import SideBar from "../../sidebar";
import { useState } from "react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col md:flex-row min-h-screen relative">
        {/* Sidebar for Mobile and Desktop */}
        <div
          className={`bg-gradient-to-r from-gray-800 to-purple-900 text-slate-50 min-h-screen z-50 fixed md:relative md:w-1/5 p-5 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="p-4 font-semibold">
            <SideBar />
          </div>
        </div>

        {/* Overlay for Mobile Sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 h-full">
          {/* Mobile Navigation Bar */}
          <div className="flex justify-between items-center bg-teal-800 p-4 text-white md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <h1 className="text-lg font-bold">Dashboard</h1>
          </div>

          {/* Top Navigation */}
          <div className="hidden md:block w-full">
            <Nav />
          </div>

          {/* Main Layout Content */}
          <MainLayout />

          {/* Dashboard Footer */}
          <div className="absolute bottom-0 flex justify-center items-center bg-gray-200 w-full p-2">
            <h1 className="text-sm font-semibold text-gray-600">
              Developed by ATC Tech Limited. ©2025
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
