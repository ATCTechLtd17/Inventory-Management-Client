const PrintInvoice = ({ salesData, customerName, customerContact }) => {
  const handlePrint = () => {
    if (salesData.length === 0) {
      alert("No sales data to print!");
      return;
    }

    const formattedDate = new Date().toLocaleDateString();
    const companyDetails = {
      name: "অংশু গ্রন্থ কুটির",
      address: "Majidia Shopping Center, Ganakpara,, Ghoramara, Boalia, Rajshahi",
      contact: {
        email: "aungshusale123@gmail.com",
        phone: "+8801322929527",
        website: "www.abcbd.com",
      },
    };

    const calculateTotals = () => {
      let subtotal = 0;
      let totalDiscount = 0;

      salesData.forEach((item) => {
        const totalAmount = item.sellRate * item.quantity;
        const discount = (totalAmount * item.discount) / 100;
        subtotal += totalAmount;
        totalDiscount += discount;
      });

      const payableAmount = subtotal - totalDiscount;

      return {
        subtotal: subtotal.toFixed(2),
        discount: totalDiscount.toFixed(2),
        payableAmount: payableAmount.toFixed(2),
      };
    };

    const { subtotal, discount, payableAmount } = calculateTotals();

    // Generate a unique invoice number
    const generateInvoiceNumber = () => {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month with leading zero
      const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Random number with leading zeros
      return `${year}${month}${randomNum}`;
    };

    const invoiceNumber = generateInvoiceNumber();

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .invoice-container { max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 16px; }
            .header p { margin: 5px 0; font-size: 12px; }
            .details { margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 8px; text-align: left; border: 1px solid #ddd; font-size: 9px; }
            th { background-color: #f2f2f2; }
            .total-row td { text-align: right; font-weight: bold;}
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <h1>${companyDetails.name}</h1>
              <p>${companyDetails.address}</p>
              <p>Contact: ${companyDetails.contact.phone} | Email: ${companyDetails.contact.email}</p>
             
              <h3>Invoice</h3>
            </div>

            <div class="details">
              <p><strong>Customer Name:</strong> ${customerName}</p>
              <p><strong>Contact:</strong> ${customerContact}</p>
              <p><strong>Invoice No:</strong> ${invoiceNumber}</p>
              <p><strong>Invoice Date:</strong> ${formattedDate}</p>

              <table>
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Book Name</th>
                    <th>Writer Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total Amount</th>
                    

                  </tr>
                </thead>
                 <tbody>
                    ${salesData
                      .map(
                        (item, index) => {
                          const totalAmount = item.sellRate * item.quantity;
                          const discount = (totalAmount * item.discount) / 100;
                          return `
                            <tr>
                              <td>${index + 1}</td>
                              <td>${item.bookName}</td>
                              <td>${item.writerName}</td>
                              <td>${item.category}</td>
                              <td>${item.quantity}</td>
                              <td>${item.sellRate.toFixed(2)}</td>
                              <td>${totalAmount.toFixed(2)}</td>
                              
                            </tr>
                          `;
                        }
                      )
                      .join("")}
                  </tbody>
              </table>

              <table style="margin-top: 20px;">
                <tbody>
                  <tr><td><strong>Subtotal:</strong></td><td>${subtotal}</td></tr>
                  <tr><td><strong> Discount (%):</strong></td><td>${discount}</td></tr>
                  <tr class="total-row"><td><strong>Payable Amount:</strong></td><td>${payableAmount}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div >
    <button
      onClick={handlePrint}
      className="print-btn "
    >
      Print Invoice
    </button>
    </div>
  );
};

PrintInvoice.propTypes = {	
  salesData: "No sales data to print!",
  customerName: "No customer name to print!",
  customerContact: "No customer contact to print!",
};

export default PrintInvoice;
