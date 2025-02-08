import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://libraryserver.atctechlimited.com/api/books"
        );
        const books = await response.json();

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(books.map((book) => book.category))
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleCategoryDropdown}
        className="flex items-center justify-between w-full text-left font-semibold hover:text-white"
      >
        <span>Categories</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${
            isCategoryDropdownOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isCategoryDropdownOpen && (
        <div className="flex flex-col ml-4 space-y-2 ">
          {categories.map((category, index) => (
            <NavLink
              key={index}
              to={`/dashboard/${category}`}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-white text-xl"
                  : "hover:text-white hover:scale-110 hover:translate-x-6 transform transition-all duration-500"
              }
            >
              {category}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
