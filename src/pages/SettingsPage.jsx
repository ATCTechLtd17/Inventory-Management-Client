import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext/LoginContext";
import Swal from "sweetalert2"; // Import SweetAlert

const SettingsPage = () => {
  const { user, setUser } = useContext(LoginContext);

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...user });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTempData(user);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!tempData.name || !tempData.email || !tempData.password) {
      setPasswordError("All fields must be filled out.");
      return;
    }

    if (tempData.password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    fetch(
      `https://libraryserver.atctechlimited.com/api/editprofile/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setPasswordError(data.message || "An error occurred.");
        } else {
          setUser({ ...tempData });
          localStorage.setItem("user", JSON.stringify(tempData)); // Save changes to localStorage
          setPasswordError("");
          setIsEditing(false);
          Swal.fire("Success", "Profile updated successfully.", "success");
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        Swal.fire(
          "Error",
          "An error occurred while saving the profile.",
          "error"
        );
      });
  };

  const handleDeleteProfile = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete your account permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://libraryserver.atctechlimited.com/api/users/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              setUser(null);
              localStorage.removeItem("user");
              Swal.fire(
                "Deleted!",
                "Your profile has been deleted.",
                "success"
              );
              navigate("/");
            } else {
              return response.json().then((data) => {
                throw new Error(data.message || "An error occurred.");
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting profile:", error);
            Swal.fire(
              "Error",
              error.message || "Failed to delete profile.",
              "error"
            );
          });
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/homelayout");
    Swal.fire("Logged Out", "You have been logged out.", "info");
  };

  const renderPasswordSection = () => (
    <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Password</h3>
      {isEditing ? (
        <div>
          <label className="block text-sm font-medium text-gray-600">
            New Password
          </label>
          <div className="flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={tempData.password}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-indigo-500 hover:text-indigo-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label className="block text-sm font-medium text-gray-600 mt-4">
            Confirm Password
          </label>
          <div className="flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="mt-2 p-2 w-full border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="ml-2 text-indigo-500 hover:text-indigo-700"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
          )}
        </div>
      ) : (
        <div>
          <p className="text-lg text-gray-800">********</p>
          <button
            className="mt-2 text-indigo-500 hover:text-indigo-700"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Profile Header */}
      <div className="border border-gray-300 rounded-lg p-8 mb-6 bg-white shadow-md">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-3xl  font-semibold text-gray-800">
              {user.name}
            </h1>
            <p className="text-lg text-gray-600">{user.username}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Profile Settings
        </h2>

        {/* Editable Sections */}
        <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Name</h3>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={tempData.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-lg text-gray-800">{user.name}</p>
          )}
        </div>

        <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Email</h3>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={tempData.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-lg text-gray-800">{user.email}</p>
          )}
        </div>

        <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Designation
          </h3>
          {isEditing ? (
            <input
              type="text"
              name="designation"
              value={tempData.designation}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="text-lg text-gray-800">{user.designation}</p>
          )}
        </div>

        {renderPasswordSection()}

        <div className="border border-gray-300 rounded-lg p-6 mt-8 bg-white shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Role</h3>
          <p className="text-lg text-gray-800">{user.role}</p>
        </div>

        {/* Actions Section */}
        <div className="border border-gray-300 rounded-lg p-6 mt-8 bg-white shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Actions</h3>
          <div className="flex flex-wrap gap-4 sm:flex-nowrap sm:space-x-6">
            {isEditing ? (
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={handleSave}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-600"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            )}
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => handleDeleteProfile(user.id)}
            >
              Delete Profile
            </button>
            <button
              className="px-4 py-2 pl-2 bg-gray-800 text-white  rounded-md hover:bg-gray-900"
              onClick={handleLogout} // Handle logout logic here
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
