import { useState, useEffect } from "react";
import POSMemo from "./POSMemo";
import Swal from "sweetalert2";
import PrintInvoice from "./PrintInvoice";

const SellBooks = () => {
  const [entryDate, setEntryDate] = useState("");
  const [bookName, setBookName] = useState("");
  const [writerName, setWriterName] = useState("");
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState();
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [sellRate, setSellRate] = useState(0);
  const [amount, setAmount] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Fetch Books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://libraryserver.atctechlimited.com/api/books");
        const books = await response.json();
        const uniqueCategories = Array.from(
          new Set(books.map((book) => book.category))
        );
        setCategories(uniqueCategories);
        setBooksData(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Suggestion Filter
  useEffect(() => {
    if (bookName.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const suggestions = booksData
        .filter((book) =>
          book.bookName.toLowerCase().includes(bookName.toLowerCase())
        )
        .slice(0, 5); // Limit suggestions to 5 items
      setFilteredSuggestions(suggestions);
    }
  }, [bookName, booksData]);

  const handleSuggestionClick = (suggestion) => {
    setBookName(suggestion.bookName);
    setWriterName(suggestion.writerName);
    setCategory(suggestion.category);
    setSellRate(suggestion.sellRate || 0);
    setQuantity(0); // Reset quantity when selecting a new book
    setAmount(0); // Reset amount
    setFilteredSuggestions([]);
  };

  // Recalculate Total Amount
  useEffect(() => {
    const calculatedAmount =
      sellRate * quantity * ((100 - (discount || 0)) / 100);
    setAmount(Math.round(Number(calculatedAmount)));
  }, [sellRate, quantity, discount]);

  const handleAddMore = async () => {
    if (!entryDate || !bookName || !writerName || !category || quantity <= 0) {
      setErrorMessage("All fields are required!");
      return;
    }
    setErrorMessage("");

    const selectedBook = booksData.find(
      (book) => book.bookName === bookName && book.category === category
    );

    if (!selectedBook) {
      setErrorMessage("Book details not found in the database!");
      return;
    }

    const newBook = {
      entryDate,
      bookName,
      writerName,
      category,
      quantity: +quantity,
      sellRate: +sellRate,
      discount: +discount,
      amount: +amount,
      customerName: customerName || "N/A",
      customerContact: customerContact || "N/A",
    };

     // Check for duplicate entries in the salesData array
  const isDuplicate = salesData.some(
    (entry) =>
      entry.bookName === newBook.bookName &&
      entry.category === newBook.category &&
      entry.customerName === newBook.customerName &&
      entry.customerContact === newBook.customerContact
  );

  if (isDuplicate) {
    Swal.fire({
      title: "Duplicate Entry",
      text: "This book entry already exists in the sales record.",
      icon: "warning",
    });
    return;
  }

    try {
      const response = await fetch("https://libraryserver.atctechlimited.com/api/soldbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      if (response.ok) {
        setSalesData((prevData) => [...prevData, newBook]);
        Swal.fire({
          title: "Success!",
          text: "Book added to sales and saved to the database successfully.",
          icon: "success",
        });
        resetForm();
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error!",
          text: errorData.message || "Failed to save sales data.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "An unexpected error occurred.",
        icon: "error",
      });
    }
  };

  const resetForm = () => {
    setEntryDate("");
    setBookName("");
    setWriterName("");
    setCategory("");
    setQuantity(0);
    setSellRate(0);
    setDiscount(0);
    setAmount(0);
    setFilteredSuggestions([]);
  };

  return (
    <div className="bg-white p-6 shadow-md text-gray-600 min-h-screen relative z-50">
      <h2 className="text-2xl font-extrabold mb-6 text-purple-800 z-50">
        Sales Book
      </h2>
      <form className="space-y-4">
        {/* Customer Details Section */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold  text-purple-800">
            Give Customer Details
          </h2>
          <div className="flex justify-center gap-4 ">
            <div className="sm:w-1/2">
              <label className="block text-sm font-medium ">
                Customer Name
              </label>
              <input
                type="text"
                className="w-full px-2 py-2 border border-gray-700 rounded text-black focus:ring-2 focus:ring-indigo-500 text-center"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Entry Name"
              />
            </div>
            <div className="sm:w-1/2">
              <label className="block text-sm font-medium ">
                Customer Contact
              </label>
              <input
                type="text"
                className="w-full px-2 py-2 border border-gray-700 rounded text-black focus:ring-2 focus:ring-indigo-500 text-center"
                value={customerContact}
                onChange={(e) => setCustomerContact(e.target.value)}
                placeholder="Entry Contact"
              />
            </div>
          </div>
        </div>

        {/* Book Details Section */}
        <div className="space-y-2">
          <div className="text-center my-6 p-5 ">
            <h2 className="text-2xl font-extrabold text-gradient bg-clip-text  bg-gradient-to-r text-purple-800  ">
              Fill Up the Product Details
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
            <div>
              <label className="block text-sm font-medium">Entry Date</label>
              <input
                type="date"
                className="w-full px-2 py-2 border border-gray-700 rounded text-black focus:ring-2 focus:ring-indigo-500"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select
                className="w-full px-2 py-2 border border-gray-700 rounded text-black focus:ring-2 focus:ring-indigo-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                className="w-full px-2 py-2 border border-gray-700 rounded text-black focus:ring-2 focus:ring-indigo-500"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                placeholder="Product Name"
              />
              {/* Suggestions Dropdown */}
              {filteredSuggestions.length > 0 && (
                <ul className="border border-gray-300 rounded bg-white mt-2 max-h-48 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.bookName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Brand Name</label>
              <input
                type="text"
                className="w-full px-2 py-2 border border-gray-700 rounded text-black focus:ring-2 focus:ring-indigo-500"
                value={writerName}
                onChange={(e) => setWriterName(e.target.value)}
                placeholder="Brand Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                className="w-full px-2 py-2 border border-gray-700 rounded text-black focus:ring-2 focus:ring-indigo-500"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Quantity"
              />
            </div>

            {/* Discount Field */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-700 rounded text-black focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Total Amount</label>
              <input
                type="number"
                className="w-full px-2 py-2 border border-gray-700 rounded text-black focus:ring-2 focus:ring-indigo-500"
                value={amount || 0}
                readOnly
                placeholder="Total Amount"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleAddMore}
            className="px-4 py-3 bg-gradient-to-r from-gray-800 to-purple-900 hover:bg-teal-700 text-white font-semibold rounded focus:ring-2 focus:ring-indigo-500"
          >
            Add to Sales
          </button>
        </div>
      </form>


      
      <div className="mt-6 py-3 overflow-x-auto">
        <h3 className="text-lg font-bold text-gradient-to-r from-gray-800 to-purple-900 mb-4">Sales Records</h3>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">SL</th>
              <th className="border px-4 py-2">Book Name</th>
              <th className="border px-4 py-2">Writer Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Sell Rate</th>
              <th className="border px-4 py-2">Discount (%)</th>
              <th className="border px-4 py-2">Total Amount</th>
              <th className="border px-4 py-2">Customer Name</th>
              <th className="border px-4 py-2">Customer Contact</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.bookName}</td>
                <td className="border px-4 py-2">{item.writerName}</td>
                <td className="border px-4 py-2">{item.category}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">
                  {Math.round(item.sellRate)}
                </td>
                <td className="border px-4 py-2">{item.discount}</td>
                <td className="border px-4 py-2">{Math.round(item.amount)}</td>
                <td className="border px-4 py-2">{item.customerName}</td>
                <td className="border px-4 py-2">{item.customerContact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 ">
        <button
          type="button"
          className=" bg-slate-800 hover:bg-teal-600 text-white font-semibold py-2 rounded mb-2 focus:ring-2 focus:ring-teal-500"
        >
          <PrintInvoice
            salesData={salesData}
            customerName={customerName}
            customerContact={customerContact}
          />
        </button>
        {/* Button to show POSMemo */}
        <button
          type="button"
          className=" bg-slate-800 hover:bg-teal-600 text-white font-semibold py-2 rounded mb-2 focus:ring-2 focus:ring-teal-500"
        >
          {/* Conditionally render POSMemo */}
          <POSMemo
            salesData={salesData}
            customerName={customerName}
            customerContact={customerContact}
          />
        </button>
      </div>
    </div>
    
  );
};

export default SellBooks;
