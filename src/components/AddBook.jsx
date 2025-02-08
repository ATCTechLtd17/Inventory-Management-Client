import axios from "axios";
import { useState ,useEffect } from "react";
import Swal from "sweetalert2";

const ibb_key = import.meta.env.VITE_IBB_KEY;
const ibb_api = `https://api.imgbb.com/1/upload?key=${ibb_key}`;

const AddBook = () => {
  const [entryDate, setEntryDate] = useState("");
  const [bookName, setBookName] = useState("");
  const [writerName, setWriterName] = useState("");
  const [category, setCategory] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [purchaseCommission, setPurchaseCommission] = useState("");
  const [purchaseValue, setPurchaseValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sellRate, setSellRate] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const[countries, setCountries]= useState([]);
  const[madeIn, setMadeIn]=useState("");

  useEffect(() => {
    // Fetch data from rest API
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryList = data.map((country) => country.name.common).sort();
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fectching Countries : ", error));

    }, []);


  
  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookImage(reader.result); // Store base64 preview
      };
      reader.readAsDataURL(file); // Convert file to data URL
    }
  };

  

  const handleAddBook = async () => {
    if (
      !entryDate ||
      !bookName ||
      !writerName ||
      !category ||
      !purchaseRate ||
      !purchaseCommission ||
      !purchaseValue ||
      !quantity ||
      !bookImage //Ensure Image Seleted
    ) {
      alert("All fields are required!");
      return;
    }

    const res = await axios.post(ibb_api, bookImage, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const newBook = {
        entryDate,
        bookName,
        writerName,
        category,
        purchaseRate: +purchaseRate,
        purchaseCommission: +purchaseCommission,
        purchaseValue: +purchaseValue,
        quantity: +quantity,
        sellRate: +purchaseRate,
        bookImageUrl: res.data.data.display_url,
      };

      fetch(`https://libraryserver.atctechlimited.com/api/addbooks`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newBook),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire({
            title: "Good job!",
            text: "Book Added Successfully!",
            icon: "success",
          });
          resetForm();
        })
        .catch((err) => {
          Swal.fire({
            title: "Something Wrong!",
            text: err.message || "Failed to add book.",
            icon: "error",
          });
        });
    }
  };

  const resetForm = () => {
    setEntryDate("");
    setBookName("");
    setWriterName("");
    setCategory("");
    setPurchaseRate("");
    setPurchaseCommission("");
    setPurchaseValue("");
    setQuantity("");
    setSellRate("");
    setBookImage(null); //Reset the image selection
  };

  return (
    <div className="bg-white p-6 shadow-md text-black mx-auto h-[200vh]">
      <h2 className="md:text-2xl font-extrabold mb-6 text-purple-900">
        Add Your Product
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
          {/* Entry Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Entry Date</label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-700 rounded text-black focus:ring-2 focus:ring-purple-900"
            placeholder="Entry Date"
          />
        </div>

        {/* Book Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-black focus:ring-2 focus:ring-purple-900"
            placeholder="Product Name"
          />
        </div>

        {/* Writer Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Brand Name</label>
          <input
            type="text"
            value={writerName}
            onChange={(e) => setWriterName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-black focus:ring-2 focus:ring-purple-900"
            placeholder="Brand Name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-black focus:ring-2 focus:ring-purple-900"
            placeholder="Category"
          />
        </div>
        <div className="flex flex-col relative mb-4">
          <label className="block text-sm font-medium mb-1 ">Made In</label>
          <select
           value="made in"
           onChange={(e) => setMadeIn(e.target.value)}
           className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-black focus:ring-2 focus:ring-purple-900">
             <option value="">Select Country</option>
             {countries.map((country, index) => (
             <option key={index} value={country}>
              {country}
             </option>
            ))}

           </select>
          
        </div>

        {/* Purchase Rate */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Cover Rate</label>
          <input
            type="text"
            value={purchaseRate}
            onChange={(e) => {
              setPurchaseRate(e.target.value);
              if (purchaseCommission) {
                setPurchaseValue(
                  Math.round(
                    (+e.target.value * (+100 - +purchaseCommission)) / 100
                  )
                );
              }
            }}
            className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-black focus:ring-2 focus:ring-purple-900"
            placeholder="Product Cover Rate"
          />
        </div>

        {/* Purchase Commission */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Purchase Commision
          </label>
          <input
            type="number"
            value={purchaseCommission}
            onChange={(e) => {
              setPurchaseCommission(e.target.value);
              if (purchaseRate) {
                setPurchaseValue(
                  Math.round((+purchaseRate * (+100 - +e.target.value)) / 100)
                );
              }
            }}
            className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-black focus:ring-2 focus:ring-purple-900"
            placeholder="Purchase Commission"
          />
        </div>

        {/* Purchase Value */}
        <div>
          <label className="block text-sm font-medium mb-1">
           Actual Purchase Rate
          </label>
          <input
            type="number"
            value={purchaseValue}
            readOnly
            className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-gray-500 cursor-not-allowed"
            placeholder="Purchase Value"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Package/Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-black focus:ring-2 focus:ring-purple-900"
            placeholder="Quantity"
          />
        </div>

        {/* Sell Rate */}
        <div>
          <label className="block text-sm font-medium mb-1">Sell Rate</label>
          <input
            type="number"
            value={purchaseRate}
            readOnly
            className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-gray-500 cursor-not-allowed"
            placeholder="Sell Rate"
          />
        </div>
        
        
      <div className="flex flex-row items-center ">
          {/* Image Upload */}
          <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full px-3 py-2 border border-gray-700 rounded bg-white text-black focus:ring-2 focus:ring-purple-900"
            placeholder="Select Image " required
          />
          {bookImage && (
            <div>
              <img src={bookImage} 
              alt="Product Preview" 
              className="w-60 h-60 my-5   object-cover rounded-lg shadow-lg border-2 border-gray-300"/>
            </div>
          )}
        </div>
      </div>
       
        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="button"
            onClick={handleAddBook}
            className="w-full bg-gradient-to-r from-gray-800 to-purple-600 hover:bg-purple-600 text-white font-semibold py-2 rounded focus:ring-2 focus:ring-purple-900"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
