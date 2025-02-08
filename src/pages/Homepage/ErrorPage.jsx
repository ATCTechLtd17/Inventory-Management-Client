import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center">
      <div className="p-10 rounded-lg shadow-lg bg-gray-800 max-w-md w-full border border-gray-700">
        <h1 className="text-6xl font-extrabold text-gray-400">Thanks For visit</h1>
        <h2 className="text-2xl font-semibold mt-4"></h2>
        <p className="mt-4 text-gray-300">
          The page you're looking for is Coming Soon.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center px-6 py-3 bg-teal-500 text-white rounded-lg text-lg font-semibold hover:bg-teal-600 transition duration-300"
        >
          <FaHome className="mr-2" /> Return Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
