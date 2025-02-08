import { useState, useEffect } from "react";
import { format, isSameDay, isSameMonth } from "date-fns";
import DailyStock from "./DailyStock";

const DashboardHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [todaySalesSummary, setTodaySalesSummary] = useState([]);
  const [monthlySalesSummary, setMonthlySalesSummary] = useState([]);
  const [categorizedBooks, setCategorizedBooks] = useState({});
  const [todaySales, setTodaySales] = useState({ quantity: 0, amount: 0 });
  const [monthlySales, setMonthlySales] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://libraryserver.atctechlimited.com/api/soldbooks");
        const books = await response.json();

        const today = new Date();

        // Categorize books
        const categoriesMap = books.reduce((acc, book) => {
          const { category } = book;
          if (!acc[category]) acc[category] = [];
          acc[category].push(book);
          return acc;
        }, {});

        // Filter today's sales
        const todaySalesData = books.filter((book) => {
          const bookDate = new Date(book.entryDate);
          return isSameDay(bookDate, today); // Compare only date
        });

        // Calculate total quantity and amount for today's sales
        const totalTodaySales = todaySalesData.reduce(
          (totals, book) => {
            totals.quantity += book.quantity || 0;
            totals.amount += book.amount || 0;
            return totals;
          },
          { quantity: 0, amount: 0 }
        );

        // Create Today's Sales Summary
        const salesSummary = Object.keys(categoriesMap).map((category) => {
          const totalSold = categoriesMap[category].reduce((acc, book) => {
            const bookDate = new Date(book.entryDate);
            return isSameDay(bookDate, today)
              ? acc + (book.quantity || 0)
              : acc;
          }, 0);
          const totalAmount = categoriesMap[category].reduce((acc, book) => {
            const bookDate = new Date(book.entryDate);
            return isSameDay(bookDate, today) ? acc + (book.amount || 0) : acc;
          }, 0);

          return { category, totalSold, totalAmount };
        });

        // Create Monthly Sales Summary
        const monthlySummary = Object.keys(categoriesMap).map((category) => {
          const totalSold = categoriesMap[category].reduce((acc, book) => {
            const bookDate = new Date(book.entryDate);
            return isSameMonth(bookDate, today)
              ? acc + (book.quantity || 0)
              : acc;
          }, 0);
          const totalAmount = categoriesMap[category].reduce((acc, book) => {
            const bookDate = new Date(book.entryDate);
            return isSameMonth(bookDate, today)
              ? acc + (book.amount || 0)
              : acc;
          }, 0);

          return { category, totalSold, totalAmount };
        });

        setCategories(Object.keys(categoriesMap));
        setTodaySales(totalTodaySales);
        setCategorizedBooks(categoriesMap);
        setTodaySalesSummary(salesSummary);
        setMonthlySalesSummary(monthlySummary);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter categories based on search query
  const filteredCategories = searchQuery
    ? categories.filter((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories;

  const filteredTodaySalesSummary = todaySalesSummary.filter((summary) =>
    filteredCategories.includes(summary.category)
  );

  const filteredMonthlySalesSummary = monthlySalesSummary.filter((summary) =>
    filteredCategories.includes(summary.category)
  );

  return (
    <div className="p-10 mx-10 relative">
      {/* Search Bar */}
      <div className="absolute top-4 right-4 w-64 ">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-sm input-bordered w-full text-black"
        />
      </div>

      {/* Today's Sale Section */}
      <div className="mb-10">
        <h2 className=" mt-4 md:text-2xl font-bold mb-4">Today's Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-500 text-white rounded shadow">
            <h3 className="md:text-lg font-semibold">Quantity Sold</h3>
            <p className="md:text-3xl mt-2 font-bold">{todaySales.quantity}</p>
          </div>
          <div className="p-4 bg-slate-800 text-white rounded shadow">
            <h3 className="md:text-lg font-semibold">Total Amount</h3>
            <p className="md:text-2xl mt-2 font-bold">{todaySales.amount} Tk</p>
          </div>
        </div>
      </div>

      {/* Today's Sales Summary */}
      <div className="mb-10 shadow-lg">
        <h2 className="md:text-2xl font-bold mb-4">Today's Sales Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-6 ">
          {filteredTodaySalesSummary.map((summary, idx) => (
            <div
              key={idx}
              className="p-3 rounded shadow bg-slate-300 text-slate-900 hover:scale-110 transform transition-all duration-500"
            >
              <h3 className="md:text-lg font-semibold">{summary.category}</h3>
              <div className="text-sm flex justify-between ">
                <span>Quantity: {summary.totalSold}</span>
                <span className="ml-4">
                  Amount: {summary.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <DailyStock />
      </div>

      {/* Monthly Sales Summary */}
      <div className="mb-10 shadow-lg">
        <h2 className="md:text-2xl font-bold mb-4">Monthly Sales Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-6">
          {filteredMonthlySalesSummary.map((summary, idx) => (
            <div
              key={idx}
              className="p-3 rounded shadow bg-slate-300 text-slate-900 hover:scale-110 transform transition-all duration-500"
            >
              <h3 className="md:text-lg font-semibold">{summary.category}</h3>
              <div className="text-sm flex justify-between ">
                <span>Quantity: {summary.totalSold}</span>
                <span className="ml-4">
                  Amount: {summary.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
