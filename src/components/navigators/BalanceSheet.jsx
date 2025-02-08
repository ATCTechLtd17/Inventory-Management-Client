import React, { useEffect, useState } from "react";
import axios from "axios";
import PrintBalanceSheet from "./PrintBalanceSheet";

const BalanceSheet = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        // Fetch all data without query parameters
        const [purchaseRes, salesRes, expenseRes] = await Promise.all([
          axios.get("https://libraryserver.atctechlimited.com/api/purchase-transactions"),
          axios.get("https://libraryserver.atctechlimited.com/api/sales-transactions"),
          axios.get("https://libraryserver.atctechlimited.com/api/expenses"),
        ]);

        setPurchases(purchaseRes.data);
        setSales(salesRes.data);
        setExpenses(expenseRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data on component mount

  // Filter data based on the selected dates
  useEffect(() => {
    const filterData = () => {
      let filteredPurchases = purchases;
      let filteredSales = sales;
      let filteredExpenses = expenses;

      if (startDate) {
        const start = new Date(startDate);
        filteredPurchases = filteredPurchases.filter(
          (item) => new Date(item.entryDate) >= start
        );
        filteredSales = filteredSales.filter(
          (item) => new Date(item.entryDate) >= start
        );
        filteredExpenses = filteredExpenses.filter(
          (item) => new Date(item.date) >= start
        );
      }

      if (endDate) {
        const end = new Date(endDate);
        filteredPurchases = filteredPurchases.filter(
          (item) => new Date(item.entryDate) <= end
        );
        filteredSales = filteredSales.filter(
          (item) => new Date(item.entryDate) <= end
        );
        filteredExpenses = filteredExpenses.filter(
          (item) => new Date(item.date) <= end
        );
      }

      setFilteredPurchases(filteredPurchases);
      setFilteredSales(filteredSales);
      setFilteredExpenses(filteredExpenses);
    };

    filterData();
  }, [startDate, endDate, purchases, sales, expenses]); // Apply filter whenever dates or data change

  // Recalculate totals based on filtered data
  const totalPurchase = filteredPurchases.reduce(
    (sum, item) => sum + item.purchaseValue * item.quantity,
    0
  );

  const totalSoldAmount = filteredSales.reduce(
    (sum, item) => sum + item.sellRate * item.quantity,
    0
  );

  const totalProfit = filteredSales.reduce(
    (sum, item) => sum + (item.sellRate - item.purchaseValue) * item.quantity,
    0
  );

  const totalExpense = filteredExpenses.reduce(
    (sum, item) => sum + item.total,
    0
  );

  // Calculate Monthly Balance
  const monthlyBalance = totalProfit - totalExpense;

  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      <h1 className="text-2xl sm:text-3xl  text-teal-900 font-bold text-center mb-5">
        Balance Sheet
      </h1>

      {/* Date Range Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5">
        <div className="flex flex-wrap gap-4 sm:flex-nowrap sm:space-x-6">
        <div>
          <label className="mb-2 font-medium">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 mx-2"
          />
          </div>
          <div className="ml-1">
          <label className="mb-2 font-medium">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 mx-3"
          />
        </div>
        </div>
      </div>

      

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
        <div className="overflow-x-auto">
          {/* Purchase Table */}
          <h2 className="text-xl font-bold mt-5">Purchase Details</h2>
          <table className="table-auto  border-collapse w-full mt-3 mb-20 text-center border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">SL.</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Book Name</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">
                  Purchase Value (Tk.)
                </th>
                <th className="border border-gray-300 p-2">Amount (Tk.)</th>
              </tr>
            </thead>
            <tbody>
              {filteredPurchases.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(item.entryDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.bookName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {Math.round(item.purchaseValue)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {Math.round(item.purchaseValue * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 font-bold">
                <td
                  className="border border-gray-300 p-2 font-semibold text-left text-gray-900"
                  colSpan="5"
                >
                  Total Purchase
                </td>
                <td className="border border-gray-300 p-2">
                  {Math.round(totalPurchase)}
                </td>
              </tr>
            </tfoot>
          </table>
          </div>

          {/* Sales Table */}
          <div className="overflow-x-auto"> 
          <h2 className="text-xl font-bold mt-5">Sales Details</h2>
          <table className="table-auto border-collapse w-full mt-3 mb-20 text-center border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">SL.</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Book Name</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Sell Rate</th>
                <th className="border border-gray-300 p-2">Sold Amount</th>
                <th className="border border-gray-300 p-2">Profit (Tk.)</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(item.entryDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.bookName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {Math.round(item.sellRate)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {Math.round(item.sellRate * item.quantity)}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {Math.round(
                      (item.sellRate - item.purchaseValue) * item.quantity
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 font-bold">
                <td
                  className="border border-gray-300 p-2 text-left text-gray-900"
                  colSpan="5"
                >
                  Total Sale
                </td>
                <td className="border border-gray-300 p-2">
                  {Math.round(totalSoldAmount)}
                </td>
                <td className="border border-gray-300 p-2">
                  {Math.round(totalProfit)}
                </td>
              </tr>
            </tfoot>
          </table>
          </div>

          {/* Expense Table */}
          <h2 className="text-xl font-bold mt-5">Expense Details</h2>
          <table className="table-auto border-collapse w-full mt-3 mb-20 text-center border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">SL.</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Amount (Tk.)</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">{item.title}</td>
                  <td className="border border-gray-300 p-2">{item.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 font-bold">
                <td
                  className="border border-gray-300 p-2 text-left text-gray-900"
                  colSpan="3"
                >
                  Total Expense
                </td>
                <td className="border border-gray-300 p-2">
                  {Math.round(totalExpense)}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Short Accounts Table */}
          <h2 className="text-xl font-bold mt-5">Short Accounts</h2>
          <table className="table-auto border-collapse w-full mt-3 text-center border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">SL.</th>
                <th className="border border-gray-300 p-2">Head</th>
                <th className="border border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">Total Purchase</td>
                <td className="border border-gray-300 p-2">
                  {Math.round(totalPurchase)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">2</td>
                <td className="border border-gray-300 p-2">Total Sale</td>
                <td className="border border-gray-300 p-2">
                  {Math.round(totalSoldAmount)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">3</td>
                <td className="border border-gray-300 p-2">Total Profit</td>
                <td className="border border-gray-300 p-2">
                  {Math.round(totalProfit)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">4</td>
                <td className="border border-gray-300 p-2">Total Expense</td>
                <td className="border border-gray-300 p-2">
                  {Math.round(totalExpense)}
                </td>
              </tr>
              <tr className="font-semibold">
                <td className="border border-gray-300 p-2">5</td>
                <td className="border border-gray-300 p-2">Monthly Balance</td>
                <td className="border border-gray-300 p-2">
                  {Math.round(monthlyBalance)}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      
      <div className="mb-5">
      <PrintBalanceSheet
        purchases={filteredPurchases}
        sales={filteredSales}
        expenses={filteredExpenses}
        startDate={startDate}
        endDate={endDate}
      />
      </div>
     
    </div>
  );
};

export default BalanceSheet;
