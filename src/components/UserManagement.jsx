import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://libraryserver.atctechlimited.com/api/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch users.",
          icon: "error",
        });
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleRoleFilter = (e) => setFilterRole(e.target.value);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole ? user.role === filterRole : true;
    return matchesSearch && matchesRole;
  });

  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`https://libraryserver.atctechlimited.com/api/users/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user.",
          icon: "error",
        });
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role || "User", // Default role
      status: user.status || "Active", // Default status
    });
  };

  const handleSave = async () => {
    try {
      // Merge the original user data with the updated form data
      const updatedUser = { ...editingUser, ...formData };

      await axios.patch(
        `https://libraryserver.atctechlimited.com/api/users/${editingUser.id}`,
        updatedUser
      );

      // Update the local state with the updated user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? updatedUser : user
        )
      );

      Swal.fire({
        title: "Updated!",
        text: "User details updated successfully.",
        icon: "success",
      });

      setEditingUser(null); // Close the modal
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update user.",
        icon: "error",
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Cancel edit and close modal
  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="p-10 sm:p-6 md:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-5">User Management</h1>

      <div className="mb-5 flex sm:flex-row space-x-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full sm:w-1/2 md:w-1/3 max-w-md"
        />
        <select
          value={filterRole}
          onChange={handleRoleFilter}
          className="select select-bordered w-full  sm:w-1/2 md:w-1/3 max-w-xs"
        >
          <option value="">Filter by Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra text-xs sm:text-base w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "Active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 md:gap-6 items-center">
                    <div>
                    <button
                      className="btn btn-sm btn-warning mr-2 sm:mb-1 sm:mr-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    </div>
                    <div>
                    <button
                      className="btn btn-sm btn-error mt-0 "
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>

            {/* Name Field */}
            <div className="mb-4">
              <label className="font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || editingUser.name} // Fallback to editingUser if no change
                readOnly // Keep this field non-editable
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || editingUser.email} // Fallback to editingUser if no change
                readOnly // Keep this field non-editable
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Role Field */}
            <div className="mb-4">
              <label className="font-medium">Role</label>
              <select
                name="role"
                value={formData.role || editingUser.role} // Fallback to editingUser if no change
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>

            {/* Status Field */}
            <div className="mb-4">
              <label className="font-medium">Status</label>
              <select
                name="status"
                value={formData.status || editingUser.status} // Fallback to editingUser if no change
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                className="btn btn-sm bg-teal-500 hover:bg-teal-600"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="btn btn-sm bg-red-400 hover:bg-red-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
