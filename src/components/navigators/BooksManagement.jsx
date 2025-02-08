import { NavLink} from "react-router-dom";



const BooksManagement = () => {
  return (
    <div className="h-44 bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 md:p-6">
      {/* Header */}
      <header className="text-center mb-4 md:mb-8">
        <h1 className="text-lg md:text-xl font-bold tracking-wide text-indigo-400">
          Cosmetic Management
        </h1>
        <p className="text-sm md:text-base text-gray-400 mt-2">
          Manage your products seamlessly: Add new products or sell existing ones.
        </p>
      </header>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        <NavLink
          to="add"
          className={({ isActive }) =>
            isActive
              ? "px-6 py-3 rounded-lg bg-gradient-to-r from-gray-500 to-purple-700 text-white shadow-md"
              : "px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          }>
          Add Product
        </NavLink>
        <NavLink
          to="sellBooks"
          className={({ isActive }) =>
            isActive
              ? "px-6 py-3 rounded-lg bg-gradient-to-r from-gray-500 to-purple-700 text-white shadow-md"
              : "px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          }>
          Sales Product
        </NavLink>
      </div>

     


     
    </div>
  );
};

export default BooksManagement;