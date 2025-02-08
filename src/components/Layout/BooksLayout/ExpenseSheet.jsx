import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ExpenseSheet = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add a new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const title = form.get("title");
    const details = form.get("details");
    const quantity = parseFloat(form.get("quantity")) || 0;
    const rate = parseFloat(form.get("rate")) || 0;
    const date = form.get("date");

    if (!title || !date || quantity <= 0 || rate <= 0) {
      Swal.fire({
        title: "Error",
        text: "Please fill all fields correctly.",
        icon: "error",
      });
      return;
    }

    const newExpense = {
      date,
      title,
      details,
      quantity,
      rate,
      total: quantity * rate,
    };

    try {
      setLoading(true);
      await axios.post("https://libraryserver.atctechlimited.com/api/expenses", newExpense);

      Swal.fire({
        title: "Success",
        text: "Expense added successfully!",
        icon: "success",
      });

      // Add the new expense to the state without fetching all data
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    } catch (error) {
      console.error("Error adding expense:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to add expense. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };

  // Calculate overall total
  const calculateOverallTotal = () => {
    return expenses
      .reduce((acc, expense) => acc + (expense.total || 0), 0)
      .toFixed(2);
  };

  return (
    <div className="p-6 my-12 max-w-4xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Expense Sheet</h2>

      <form onSubmit={handleAddExpense} className="grid gap-4 mb-6 md:grid-cols-1 lg:grid-cols-1">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            name="date"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            name="title"
            placeholder="Enter expense title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Details</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            name="details"
            placeholder="Enter expense details"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            name="quantity"
            placeholder="Enter quantity"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rate</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            name="rate"
            placeholder="Enter rate"
            min="0"
          />
        </div>
        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className="bg-teal-500 text-white px-6 py-3 rounded font-bold shadow-md hover:bg-teal-700"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Serial</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Details</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Rate</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No expenses added.
              </td>
            </tr>
          ) : (
            expenses.map((expense, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {expense.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {expense.details}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {expense.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {expense.rate.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {expense.total.toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>

      <div className="mt-4">
        <h3 className="text-right text-lg font-bold">
          Overall Total: {calculateOverallTotal()} tk
        </h3>
      </div>
    </div>
  );
};

export default ExpenseSheet;
