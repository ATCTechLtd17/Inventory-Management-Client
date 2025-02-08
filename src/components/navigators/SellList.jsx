import axios from "axios";
import React, { useEffect, useState } from "react";
import PrintSellList from "./PrintSellList";

const SellList = () => {
  const [selectedYear, setSelectedYear] = useState(""); // State for selected year
  const [selectedMonth, setSelectedMonth] = useState("");
  const [soldBooks, setSoldBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://libraryserver.atctechlimited.com/api/soldBooks")
      .then((res) => setSoldBooks(res.data));
  }, []);

  // Generate a list of years dynamically based on sample data
  const years = Array.from(
    new Set(soldBooks.map((book) => new Date(book.entryDate).getFullYear()))
  ).sort();

  // Filtered report data based on selected year and month
  const reportData = soldBooks.filter((book) => {
    if (!selectedYear || !selectedMonth) return false;
    const bookDate = new Date(book.entryDate);
    const bookYear = bookDate.getFullYear();
    const bookMonth = (bookDate.getMonth() + 1).toString().padStart(2, "0");
    return bookYear.toString() === selectedYear && bookMonth === selectedMonth;
  });

  // Calculate the total sell price of filtered books
  const totalSalePrice = reportData.reduce(
    (sum, book) => sum + book.sellRate * book.quantity,
    0
  );

  // Handle year selection
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Handle month selection
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="p-4 md:p-10 relative min-h-screen">
      {/* Filters */}
      <div className="mb-5 flex md:flex-row space-x-4 md:space-x-4 md:space-y-0">
        {/* Year Dropdown */}
        <div className="mt-4 md:mt-0">
          <label htmlFor="year-picker" className="block md:text-lg font-bold mb-2">
            Select Year:
          </label>
          <select
            id="year-picker"
            value={selectedYear}
            onChange={handleYearChange}
            className="select select-bordered w-full  max-w-xs text-black"
          >
            <option value="">--Select Year--</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {/* Month Dropdown */}
        <div className="mt-4 md:mt-0">
          <label
            htmlFor="month-picker"
            className="block md:text-lg font-bold mb-2"
          >
            Select Month:
          </label>
          <select
            id="month-picker"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="select select-bordered w-full max-w-xs text-black"
          >
            <option value="">--Select Month--</option>
            {Array.from({ length: 12 }, (_, i) => {
              const month = (i + 1).toString().padStart(2, "0");
              return (
                <option key={month} value={month}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Print Button - Now handled by PrintSellList component */}
      {reportData.length > 0 && (
        <div className="mb-5">
             <PrintSellList
          reportData={reportData}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
        </div>
       
      )}

      {/* Report Table */}
      {reportData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs md:text-base">
            <caption className="font-bold text-xl md:text-2xl text-slate-700">
              -----Sales Reports-----
            </caption>
            <thead className="text-sm text-center border-2 text-black">
              <tr>
                <th>SL.</th>
                <th>Date</th>
                <th>Book Name</th>
                <th>Writer Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Book Rate (Tk.)</th>
                <th>Discount (%)</th>
                <th>Sell Rate (Tk.)</th>
                <th>Amount (Tk.)</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {reportData.map((book, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(book.entryDate).toLocaleDateString()}</td>
                  <td>{book.bookName}</td>
                  <td>{book.writerName}</td>
                  <td>{book.category}</td>
                  <td>{book.quantity}</td>
                  <td>{book.purchaseRate}</td>
                  <td>{book.discount}</td>
                  <td>{book.sellRate}</td>
                  <td>{book.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center font-bold text-xl mt-4 border-t-2 border-gray-300 pt-4">
            <span>Total Sale: </span>
            <span>{Math.round(totalSalePrice)} </span>
          </div>
        </div>
      ) : selectedYear && selectedMonth ? (
        <p className="text-gray-500">
          No data available for the selected year and month.
        </p>
      ) : (
        <p className="text-gray-500">
          Please select a year and month to view the Sales report.
        </p>
      )}
    </div>
  );
};

export default SellList;
