import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // Added role field
    designation: "", // Added designation field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://libraryserver.atctechlimited.com/api/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((result) => {
        if (result.status === 201) {
          Swal.fire({
            title: "Registration Successful!",
            text: "You have successfully registered!",
            icon: "success",
          });
          navigate("/homelayout/login");
        } else {
          Swal.fire({
            title: "Something Went Wrong!",
            text: result.statusText,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Something Went Wrong!",
          text: err.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-purple-900 mb-4 text-center">
          Registration Form
        </h1>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-"
            placeholder="Enter your name"
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Email Address Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email address"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Confirm your password"
          />
        </div>

        {/* Role Field */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Select Role"
          >
            <option value="">Select Role</option>
            <option value="Admin">Moderator</option>
            <option value="User">User</option>
          </select>
        </div>

        {/* Designation Field */}
        <div className="mb-4">
          <label htmlFor="designation" className="block text-gray-700">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <p className="text-xs text-center">
          By creating an account you agree to our
          <Link to="#" className="text-purple-600">
           <span> Terms & Conditions</span>
          </Link>
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full my-2 bg-gradient-to-r from-gray-800 to-purple-900 text-white py-2 rounded hover:bg-lime-950"
        >
          Register
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-700">Already have an account? </span>
          <span
            className="text-purple-600 hover:text-purple-900 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
