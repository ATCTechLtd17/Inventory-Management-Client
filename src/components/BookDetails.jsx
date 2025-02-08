import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logoimg from "./../assets/angshu_Library_logo.jpg";
import Swal from "sweetalert2";

const ibb_key = import.meta.env.VITE_IBB_KEY;
const ibb_api = `https://api.imgbb.com/1/upload?key=${ibb_key}`;

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Loading state
  const [bookImageUrl, setBookImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    bookName: "",
    writerName: "",
    sellRate: "",
    quantity: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(
          "https://libraryserver.atctechlimited.com/api/books"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const books = await response.json();
        const selectedBook = books.find((book) => book.id === parseInt(bookId));
        if (!selectedBook) throw new Error("Book not found");
        setBook(selectedBook);
      } catch (error) {
        setBook(null);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    fetchBook();
  }, [bookId]);

  const handleEdit = () => {
    setFormData({
      bookName: book.bookName,
      writerName: book.writerName,
      sellRate: book.sellRate,
    });
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImagechange = (e) => {
    const file = { image: e.target.files[0] };
    setBookImageUrl(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // setIsLoading(true); // Start loading

    const res = await axios.post(ibb_api, bookImageUrl, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const newData = { ...formData, bookImageUrl: res.data.data.display_url };

      try {
        const response = await fetch(
          `https://libraryserver.atctechlimited.com/api/books/${bookId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update the book details.");
        }
        setBook((prevBook) => ({ ...prevBook, ...formData }));
        setIsEditing(false);
        // SweetAlert2 Success Notification
        Swal.fire({
          title: "Success!",
          text: "Book details have been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        // SweetAlert2 Error Notification
        Swal.fire({
          title: "Error!",
          text: "An error occurred while updating the book. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
        <p className="text-xl text-gray-600 mt-4">Loading...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <p className="text-xl text-gray-600">Book not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-gray-50 to-gray-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="md:text-3xl font-bold text-white drop-shadow-md">
            Book Details
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-white text-purple-700 font-semibold rounded-md shadow-md hover:bg-gray-100 hover:text-purple-900 transition-all"
          >
            Back to Home
          </button>
        </div>
      </header>

      {/* Book Details */}
      <div className="flex-grow max-w-4xl mx-auto mt-10 p-10 bg-white rounded-xl shadow-2xl border-2 border-gradient-to-r from-purple-500 to-indigo-500">
        {!isEditing ? (
          <>
            <h2 className="text-3xl font-bold text-teal-800">
              {book?.bookName}
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              <strong>Author:</strong> {book?.writerName}
            </p>
            <p className="text-lg text-gray-600 mt-2">
              <strong>Category:</strong> {book?.category}
            </p>

            <p className="text-lg text-gray-600 mt-2">
              <strong>Book Price:</strong> {book?.sellRate}
            </p>
            <p className="text-lg text-gray-600 mt-2">
              <strong>Quantity:</strong> {book?.quantity}
            </p>


            <p className="text-lg text-gray-600 mt-2 mb-12">
              <strong>Book Image :</strong> 
              <img src={book?.bookImageUrl} alt="Book Cover" 
              className="mt-3 w-40 h-60 object-cover rounded-lg shadow-lg"
              />

            </p>

            {/* Stock Availability */}
            <p className="text-lg text-gray-600 mt-2">
              <strong>Availability:</strong>{" "}
              {book?.quantity === 0 ? "Out of Stock" : "In Stock"}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleEdit}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-md hover:scale-105 transform transition-all"
              >
                Edit
              </button>
            </div>
          </>
        ) : (
          <div className="p-4 my-4 max-w-4xl mx-auto bg-white">
            <form onSubmit={handleFormSubmit} className="space-y-4 ">
              <div>
                <label className="block text-gray-600 font-medium">
                  Book Name
                </label>
                <input
                  type="text"
                  name="bookName"
                  value={formData.bookName}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-300  rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Author
                </label>
                <input
                  type="text"
                  name="writerName"
                  value={formData.writerName}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Price</label>
                <input
                  type="number"
                  name="sellRate"
                  value={formData.sellRate}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
              </div>
              {/* Upload Image  */}
              <div>
                <label className="block text-gray-600 font-medium">
                  Upload Book Image{" "}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagechange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-indigo-800 to-indigo-500 text-white font-medium rounded-lg shadow-md"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg shadow-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* Footer */}

      <div>
        <footer className="mt-40 py-20 bg-slate-200 bg-opacity-80 backdrop-filter backdrop-blur-lg flex flex-col items-center text-center space-y-6">
          {/* Logo and Name */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={logoimg}
              alt="Logo"
              className="h-40 w-32 object-contain"
            />
            <p className="sm:text-3xl font-bold tracking-wide text-[#bf4211]">
              অংশু গ্রন্থকুটির
            </p>
          </div>
        </footer>

        <footer className="bg-base-200 text-base-content border-base-300 border-t px-10 py-4 flex flex-col items-center text-center space-y-4">
          <aside className="flex flex-col items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>Developed By ATC Tech Limited. @ 2025</p>
          </aside>
        </footer>
      </div>
    </div>
  );
};

export default BookDetails;