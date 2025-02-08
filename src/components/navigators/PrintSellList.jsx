import { FaPrint } from "react-icons/fa";

FaPrint
const PrintSellList = ({ reportData, selectedYear, selectedMonth }) => {
  const companyDetails = {
    name: "অংশু গ্রন্থ কুটির",
    address: "Majidia Shopping Center, Ganakpara,, Ghoramara, Boalia, Rajshahi",
    contact: {
      email: "angshu.official@gmail.com",
      phone: "+8801322929527",
      website: "www.abcbd.com",
    },
  };


  const handlePrint = () => {
    if (reportData.length === 0) {
      alert("No data to display for printing.");
      return;
    }

    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    const formattedMonth = monthNames[selectedMonth - 1];

    // Calculate the total sell price of filtered books
  const totalSalePrice = reportData.reduce(
    (sum, book) => sum + book.sellRate * book.quantity,
    0
  );

    const printWindow = window.open("", "_blank", "width=800,height=600");

    const printContent = `
      <html>
        <head>
          <title>Sales List Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            h1, h3, p { text-align: center; color: #333; margin: 0; }
            h2{text-align: center; font-size:14px;  color: #333; margin: 0;}
            h1 { font-size: 24px; margin-bottom: 10px; }
            h3 { font-size: 16px; margin-bottom: 5px; }
            p { margin-top: 5px; font-size: 14px; }
            .print-section { text-align: center; margin-top: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; font-size:9px; text-align: center;  }
            th { background-color: #f4f4f4; }
            .total-row { font-weight: bold; background-color: #f9f9f9;}
            .total{text-align: left; }
          </style>
        </head>
        <body>
          <h1>${companyDetails.name}</h1>
          <h3>${companyDetails.address}</h3>
          <p>Contact: ${companyDetails.contact.email} | ${companyDetails.contact.phone} | 
          <h3>Date: ${formattedMonth}, ${selectedYear}</h3>

          <div class="print-section">
            <h2>Sales List Report</h2>

            <table>
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>Date</th>
                  <th>Book Name</th>
                  <th>Writer Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Book Rate (Tk.)</th>
                  <th>Discount (%)</th>
                  <th>Sell Rate (Tk)</th>
                  <th>Amount (Tk.)</th>
                </tr>
              </thead>
              <tbody>
                ${reportData.map((book, index) => `
                  <tr>
                    <td>${index + 1}</td>
                    <td>${new Date(book.entryDate).toLocaleDateString()}</>
                    <td>${book.bookName}</td>
                    <td>${book.writerName}</td>
                    <td>${book.category}</td>
                    <td>${book.quantity}</td>
                    <td>${book.purchaseRate.toFixed(2)}</td>
                    <td>${book.discount}</td>
                    <td> ${Math.round(book.sellRate)}</td>
                    <td> ${Math.round(book.amount)}</td>
                  </tr>
                `).join("")}
                <tr class="total-row">
                  <td colspan="9" class="total">Total Sale :</td>
                  <td>${Math.round(totalSalePrice)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();

    printWindow.print();
  };

  return (
    <div className="absolute top-4 right-4 md:right-10 sm:mb-10 flex justify-end  p-2 w-full ">
      <button
        onClick={handlePrint}
        className=" group relative px-2 py-1 md:py-2  md:px-3 text-sm md:text-base w-auto md:w-fit md:mb-10 md:mt-0 bg-gradient-to-r from-gray-500 to-gray-500 text-white font-medium  rounded-lg shadow-md hover:scale-105 transform transition-all"
      >
       <FaPrint className="md:w-5 h-5 sm:w-6 sm:h-6 justify-end sm:hidden" />
       <span className="hidden sm:block">Print Sales Report</span>
       {/* Tooltip */}
       <span className="group-hover:block absolute hidden bg-black text-white text-xs rounded py-1 px-2 bottom-full mb-2 left-1/2 transform -translate-x-1/2">
          Print
        </span>
      </button>
    </div>
  );
};

export default PrintSellList;
