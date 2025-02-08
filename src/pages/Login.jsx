import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginContext } from "../LoginContext/LoginContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const location = useLocation();
  const { setUser } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://libraryserver.atctechlimited.com/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) {
      Swal.fire({
        title: "Please Wait!",
        text: "Loading user data...",
        icon: "info",
      });
      return;
    }

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      try {
        const response = await axios.post(
          "https://libraryserver.atctechlimited.com/api/jwt",
          foundUser,
          {
            headers: {
              "content-Type": "application/json",
            },
            withCredentials: true, // This is important to include cookies in the request
          }
        );

        const data = response.data;

        if (data.success) {
          setUser(foundUser);
          localStorage.setItem("user", JSON.stringify(foundUser));

          Swal.fire({
            title: "Login Successful!",
            text: "You have successfully logged in!",
            icon: "success",
          });

          navigate("/dashboard");
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to retrieve token.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        Swal.fire({
          title: "Error!",
          text: "An error occurred while logging in.",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Something Wrong!",
        text: "Invalid Credentials",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300 ">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">
          Login to your Library
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
            required
          />
        </div>
        <div className="text-center">
          <button className="w-full px-6 py-2 text-white bg-gradient-to-r from-gray-800 to-purple-900 rounded-lg font-semibold transition duration-300 hover:bg-lime-950">
            Login
          </button>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-700">Not registered yet? </span>
          <span
            className="text-purple-950 hover:text-teal-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;