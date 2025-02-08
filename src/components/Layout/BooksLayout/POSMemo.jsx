const POSMemo = ({ salesData, customerName, customerContact }) => {
  const handleShowPOSMemo = () => {
    if (salesData.length === 0) {
      alert("No sales data to display in the POS memo!");
      return;
    }

    const companyDetails = {
      name: "অংশু গ্রন্থ কুটির",
      address: "Majidia Shopping Center, Ganakpara,, Ghoramara, Boalia, Rajshahi",
      contact: {
        email: "aungshusale123@gmail.com",
        phone: "+8801322929527",
        website: "www.abcbd.com",
      },
    };

    const date = new Date().toLocaleString();
    const calculateTotals = () => {
      let subtotal = 0;
      let totalDiscount = 0;

      salesData.forEach((item) => {
        const totalAmount = item.sellRate * item.quantity;
        const discount = (totalAmount * item.discount) / 100;
        subtotal += totalAmount;
        totalDiscount += discount;
      });

      const netPayable = subtotal - totalDiscount;

      return {
        subtotal: subtotal.toFixed(2),
        discount: totalDiscount.toFixed(2),
        netPayable: Math.round(netPayable),
      };
    };

    const { subtotal, discount, netPayable } = calculateTotals()

    const generateInvoiceNumber = () => {
      const now = new Date();
      const year = now.getFullYear().toString().slice(-2); // Last two digits of the year
      const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Month with leading zero
      const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, "0"); // Random 4-digit number
      return `${year}${month}${randomNum}`;
    };

    const invoiceNumber = generateInvoiceNumber();

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
          <html>
            <head>
              <style>
                 body  { font-family: Arial, sans-serif; font-size: 10px; margin: 0; padding: 10px; }
                .receipt { max-width: 300px; margin: auto; text-align: center; }
                .header { text-align: center; margin-top: 30px;}
                .header h1 { margin: 0; font-size: 11px; }
                .header p { margin: 5px 0; font-size: 9px; }
                .items { margin-top: 10px; text-align: left; }
                .items table { width: 100%; border-collapse: collapse; }
                .items th { 
                  padding: 5px; 
                  border-top: 1px dotted #000; 
                  border-bottom: 1px dotted #000; 
                  text-align: left; 
                  font-size: 8px;
                }

                .items td { 
                padding: 5px; 
                font-size: 5px; 
                text-align:center;
                 }
                
              </style>
            </head>
            <body>
              <div class="receipt">
                <div class="header">
                  <h1>${companyDetails.name}</h1>
                  <p>${companyDetails.address}</p>
                  <p> Email: ${
                    companyDetails.contact.email
                  } <br>
                  Phone: ${companyDetails.contact.phone}</p>
                 
                  <h4 style=""text-sm">- - - - - - - - -RETAIL INVOICE- - - - - - - - -</h4>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px padding-right:10px;">
             <div style="text-align: left;">
           <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Contact:</strong> ${customerContact}</p>
           </div>
               <div style="text-align: right;">
             <p><strong>Invoice No:</strong> ${invoiceNumber}</p>
              <p><strong>Date:</strong> ${date}</p>
           </div>
            </div>
                <div class="items">
                  <table>
                    <thead>
                      <tr>
                      <th>SL</th>
                        <th>Book Name</th>
                        <th>Writer Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
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
             <div class="totals" style="display: inline-block; text-align: right; width: 100%;">
               <p style="margin: 5px 0; font-size: 8px;">Subtotal:    ${subtotal}</p>
              <div style="border-top: 1px dotted black; margin: 5px 0; width: 100%;"></div>
                 <p style="margin: 5px 0; font-size: 8px;">Discount (%): ${discount}</p>
                
                 <div style="border-top: 1px dotted black; margin: 5px 0; width: 50%; margin-left: auto; display: block;"></div>
    
                 <p style="margin: 5px 0; font-size: 8px; font-weight: bold;">Net Payable: ${netPayable}</p>
               <div style="border-top: 1px dotted black; margin: 5px 0; width: 100%;"></div>
                    </div>
                <p style="text-align:center">Thank you for your visit!</p>
              </div>
            </body>
          </html>
        `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="pos-memo text-sm ">
      <button onClick={handleShowPOSMemo} className="print-button">
        POS Memo
      </button>
    </div>
  );
};

POSMemo.defaultProps = {
  salesData: "No data available",
  customerDetails: "Something went wrong",
};

export default POSMemo;
