import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row lg:flex-row gap-8 p-5 ">
      <NavLink
          to="/"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-blue-950 font-bold underline" : ""
            }`
          }
        >
          Home
        </NavLink>
        {/* <NavLink
          to="/homeLayout"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-blue-300 font-bold underline" : ""
            }`
          }
        >
          Books
        </NavLink> */}
        <NavLink
          to="about"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-red-300 font-bold underline" : ""
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="blog"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-red-300 font-bold underline" : ""
            }`
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="/homelayout/login"
          className={({ isActive }) =>
            `text-slate-50 hover:underline hover:text-gray-800 ${
              isActive ? "text-red-300 font-bold underline" : ""
            }`
          }
        >
          Login
        </NavLink>
      </div>
    </>
  );
};

export default Nav;