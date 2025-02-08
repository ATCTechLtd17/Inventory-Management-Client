import { FaPrint } from "react-icons/fa";
const PrintBalanceSheet = ({ startDate, endDate, purchases,sales,expenses,}) => {
  const companyDetails = {
    name: "অংশু গ্রন্থ কুটির",
    address: "Majidia Shopping Center, Ganakpara,, Ghoramara, Boalia, Rajshahi",
    contact: {
      email: "angshu.official@gmail.com",
      phone: "+8801322929527",
      website: "www.abcbd.com",
    },
  };

  const totalPurchase = purchases.reduce(
    (sum, item) => sum + item.purchaseValue * item.quantity,
    0
  );

  const totalSoldAmount = sales.reduce(
    (sum, item) => sum + item.sellRate * item.quantity,
    0
  );

  const totalProfit = sales.reduce(
    (sum, item) => sum + (item.sellRate - item.purchaseValue) * item.quantity,
    0
  );

  const totalExpense = expenses.reduce((sum, item) => sum + item.total, 0);

  const monthlyBalance = totalProfit - totalExpense; // Monthly balance calculation

  const handlePrint = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const printContent = `
      <html>
        <head>
          <title>Balance Sheet</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }

            h1, h2 { text-align: center; margin: 10px 0;  font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; font-size: 9px; }
            th { background-color: #f4f4f4; }

           
            .header {
              margin-bottom: 10px;
            }
            .header h1 {
              margin: 0;
              font-size: 18px;
            }
            .header p {
              margin: 2px 0;
              font-size: 12px;
            }
            .header .date {
              text-align: left;
              font-size: 11px;
              margin-bottom: 5px;
            }
            .contact-details {
              text-align: center;
              font-size: 10px;
              color: #555;
            }
              h3 { font-size: 12px; margin-top: 40px; }
           

          </style>
        </head>
        <body>
        <div class="header">
            <div class="date">
              <p>Date: ${formattedDate}</p>
              <p>Time: ${formattedTime}</p>
            </div>
            <h1>${companyDetails.name}</h1>
            <p style ="text-align:center; ">${companyDetails.address}</p>
            <div class="contact-details">
              <p>Email: ${companyDetails.contact.email} | Phone: ${
      companyDetails.contact.phone
    }</p>
             
            </div>

          <h1 class="title">Balance Sheet</h1>
          <h2>Date Range: ${startDate} to ${endDate}</h2>

          <h3>Purchase Details</h3>
          <table>
            <thead>
              <tr>
                <th>SL.</th>
                <th>Date</th>
                <th>Book Name</th>
                <th>Quantity</th>
                <th>Book Rate (Tk.)</th>
                <th>Amount (Tk.)</th>
              </tr>
            </thead>
            <tbody>
              ${purchases
                .map(
                  (item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${new Date(item.entryDate).toLocaleDateString()}</td>
                    <td>${item.bookName}</td>
                    <td>${item.quantity}</td>
                    <td> ${item.purchaseValue.toFixed(2)}</td>
                    <td> ${(item.purchaseValue * item.quantity).toFixed(
                      2
                    )}</td>
                  </tr>
                `
                )
                .join("")}
                
            </tbody>
            <tfoot>
             <tr>
            <td colspan="5" style="font-weight: bold; text-align: left;">Total Purchase</td>
            
           <td  style="font-weight: bold; "> ${totalPurchase.toFixed(2)}</td>
          </tr>
          </tfoot>

          </table>
          <h3>Sales Details</h3>
      <table>
       <thead>
      <tr>
      <th>SL.</th>
      <th>Date</th>
      <th>Book Name</th>
      <th>Quantity</th>
      <th>Sell Rate</th>
      <th>Sold Amount (Tk.)</th>
      <th>Profit (Tk.)</th>
      </tr>
     </thead>
     <tbody>
    ${sales
      .map(
        (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${new Date(item.entryDate).toLocaleDateString()}</td>
          <td>${item.bookName}</td>
          <td>${item.quantity}</td>
          <td> ${item.sellRate.toFixed(2)}</td>
          <td> ${Math.round(item.sellRate * item.quantity)}</td>
          <td> ${Math.round((item.sellRate - item.purchaseValue) * item.quantity)}</td>
        </tr>
      `
      )
      .join("")}
        </tbody>
           <tfoot>
             <tr>
            <td colspan="5" style="font-weight: bold; text-align: left;">Total Sale</td>
            <td  style="font-weight: bold;"> ${Math.round(totalSoldAmount)}</td>
            <td  style="font-weight: bold;"> ${Math.round(totalProfit)}</td>
            </tr>
            </tfoot>
           </table>

          

          <h3>Expense Details</h3>
          <table>
            <thead>
              <tr>
                <th>SL.</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount (Tk.)</th>
              </tr>
            </thead>
            <tbody>
              ${expenses
                .map(
                  (item, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${new Date(item.date).toLocaleDateString()}</td>
                    <td>${item.title}</td>
                    <td> ${item.total.toFixed(2)}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
            <tfoot>
             <tr>
            <td colspan="3" style="font-weight: bold; text-align: left;">Total Expenses</td>
            
           <td  style="font-weight: bold;"> ${Math.round(totalExpense)}</td>
          </tr>
          </tfoot>
          </table>

         <!-- Short Accounts Table -->
            <h3>Short Accounts</h3>
            <table>
              <thead>
                <tr>
                  <th>SL.</th>
                  <th>Head</th>
                  <th>Amount (Tk.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Total Purchase</td>
                  <td> ${Math.round(totalPurchase)}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Total Sale</td>
                  <td> ${Math.round(totalSoldAmount)}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Total Expense</td>
                  <td> ${Math.round(totalExpense)}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Total Profit</td>
                  <td>${Math.round(totalProfit)}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; text-align: center;">5</td>
                  <td style="font-weight: bold; text-align: center;">Monthly Balance</td>
                  <td style="font-weight: bold;"> ${Math.round(monthlyBalance)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="absolute top-20 right-4 md:right-10 sm:mb-10 flex justify-end p-2 w-full">
      <button
        onClick={handlePrint}
        className="group relative px-2 py-1 md:py-2 md:px-1 text-sm sm:text-base w-auto md:w-fit md:mb-10 md:mt-0 bg-gradient-to-r from-gray-500 to-gray-500 text-white font-medium  rounded-lg shadow-md hover:scale-105 transform transition-all"
      >
        <FaPrint className="w-6 h-5 sm:w-6 sm:h-6 md:inline lg:hidden" />
               <span className="hidden lg:inline">Print Balance Sheet</span>
               {/* Tooltip */}
               <span className="group-hover:block absolute hidden bg-black text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
                  Print
                </span>

       </button>
    </div>
  );
};

PrintBalanceSheet.defaultProps= {
  startDate: [],
endDate: [],
purchases:[],
sales:[],
expenses:[],
};


export default PrintBalanceSheet;
