import { NavLink } from 'react-router-dom';

const MainHomeNav = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row lg:flex-row gap-8 p-5 ">
        <NavLink
          to="/homelayout"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-blue-300 font-bold underline" : ""
            }`
          }
        >
          Cosmetics
        </NavLink>
        {/* <NavLink
          to="http://localhost:5174/"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-blue-300 font-bold underline" : ""
            }`
          }
        >
          Books
        </NavLink> */}
        <NavLink
          to="error"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-blue-300 font-bold underline" : ""
            }`
          }
        >
          Tours&Travels
        </NavLink>
        <NavLink
          to="https://www.facebook.com/AungshuDine/"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-blue-300 font-bold underline" : ""
            }`
          }
        >
        Restaurant
        </NavLink>
        <NavLink
          to="error"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-blue-300 font-bold underline" : ""
            }`
          }
        >
          Gift
        </NavLink>
        <NavLink
          to="error"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-blue-300 font-bold underline" : ""
            }`
          }
        >
          Grossary
        </NavLink>
      </div>
    </>
  );
};

export default MainHomeNav;