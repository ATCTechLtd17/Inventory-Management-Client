import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";

const Subcategories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { category } = useParams(); // Get the category from the URL
  const books = useLoaderData();

  // Handle Search Query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="p-10 sm:p-6 md:p-10 bg-slate-100 ">
      {/* Searchbar */}
      <div className="absolute top-24 right-10  w-64 sm:justify-center">
        <input
          type="text"
          placeholder="Search by Book name"
          onChange={handleSearchChange}
          className="input input-sm input-bordered w-full text-black"
        />
      </div>

      <div className="relative shadow-lg rounded-md p-6 mb-8">
        <h1 className="mt-4 md:text-2xl font-bold text-left uppercase tracking-wide">
          Book Store of <span className="text-teal-800">{category}</span>
        </h1>
      </div>
      
      <div className="flex flex-col gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="flex flex-col sm:flex-row p-4  justify-between items-center sm:p-8 shadow-md rounded-md h-auto w-full"
            >
              <div className="mb-4 sm:mb-0">
                <h2 className="font-bold text-xl sm:text-xl">{book.bookName}</h2>
                <p className="text-gray-700">
                  <strong>Author:</strong> {book.writerName}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Category:</strong> {book.category}
                </p>
              </div>

              <div className="flex  sm:flex-row gap-4 items-center">
                <Link to={`/book/${book.id}`}>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base">
                    View More
                  </button>
                </Link>

                {/* Edit Button */}
                <Link to={`/book/${book.id}`}>
                <button
                  className="bg-gradient-to-r  from-teal-700 to-teal-500 text-white px-3 py-2 rounded text-sm sm:text-base"
                  
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
                </Link>

                
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Subcategories;
