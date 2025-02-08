import { useState, useEffect } from "react";

const DailyStock = () => {
  const [categories, setCategories] = useState([]);
  const [categorizedBooks, setCategorizedBooks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://libraryserver.atctechlimited.com/api/books"); // Assuming this fetches all books
        const books = await response.json();

        // Categorize books
        const categoriesMap = books.reduce((acc, book) => {
          const { category } = book;
          if (!acc[category]) acc[category] = [];
          acc[category].push(book);
          return acc;
        }, {});

        setCategories(Object.keys(categoriesMap));
        setCategorizedBooks(categoriesMap);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Filter categories based on search query

  return (
    <div className=" relative">
      {/* Stocks Section */}
      <div className="mb-10 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Today's Stocks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-6">
          {categories.map((category, idx) => {
            const totalQuantity = categorizedBooks[category]?.reduce(
              (acc, book) => acc + (book.quantity || 0),
              0
            );

            return (
              <div
                key={idx}
                className={`p-3 rounded shadow ${
                  totalQuantity > 0 ? "bg-gray-200" : "bg-red-200"
                } text-slate-900 hover:scale-110 transform transition-all duration-500`}
              >
                <h3 className="text-lg font-semibold">{category}</h3>
                <div className="flex items-center justify-between mt-2 text-black">
                  <p className="text-sm p-2">
                    Quantity: {totalQuantity > 0 ? totalQuantity : "0"}
                  </p>
                  {totalQuantity === 0 && (
                    <p className="text-sm p-2 text-red-700 font-bold">
                      Stock Out
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyStock;
