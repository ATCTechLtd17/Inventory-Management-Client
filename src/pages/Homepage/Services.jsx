

const Services = () => {
  return (
    <div>
      {/* Services Section */}
      <section className="bg-gradient-to-r from-teal-400 to-teal-700 text-white py-12">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Our Services</h2>
          <p className="text-lg mb-10">We offer a wide range of services designed to meet your needs. Whether you're planning a trip, dining out, shopping for gifts, or buying groceries, we have it all!</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Offline Book Library */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Offline Book Library</h3>
              <p className="text-gray-700 mb-4">Our offline book library provides you with a wide variety of books, from fiction to non-fiction, for all age groups. Visit us to explore books, borrow, and enjoy reading at your leisure.</p>
              <a href="error" className="text-teal-500 hover:underline">Visit Library</a>
            </div>
            {/* Tours & Travels */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Tours & Travels</h3>
              <p className="text-gray-700 mb-4">Explore exotic destinations, relax on beautiful beaches, or take an adventurous trek. We offer tailor-made tours and travel packages for every type of traveler.</p>
              <a href="error" className="text-teal-500 hover:underline">Learn More</a>
            </div>

            {/* Restaurant */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Restaurant</h3>
              <p className="text-gray-700 mb-4">Indulge in delicious cuisines from around the world. Our restaurant serves a variety of mouthwatering dishes made from fresh, high-quality ingredients.</p>
              <a href="error" className="text-teal-500 hover:underline">Explore Menu</a>
            </div>

            {/* Gifts */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Gifts</h3>
              <p className="text-gray-700 mb-4">Find the perfect gift for your loved ones. From personalized gifts to thoughtful presents, our collection has something for everyone.</p>
              <a href="error" className="text-teal-500 hover:underline">Shop Gifts</a>
            </div>

            {/* Grocery Items */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-teal-600 mb-4">Grocery Items</h3>
              <p className="text-gray-700 mb-4">Get your daily essentials delivered to your door with our online grocery service. Fresh produce, dairy, snacks, and more available at your convenience.</p>
              <a href="error" className="text-teal-500 hover:underline">Browse Groceries</a>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections for Each Service */}
      <section className="py-12 px-5 bg-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-8">Service Details</h2>

          {/* Tours & Travels Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">Tours & Travels</h3>
            <p className="text-lg text-gray-700 mb-4">
              We offer exclusive travel packages to some of the most sought-after destinations. Whether you're into adventure, culture, or relaxation, our tours are designed to create lasting memories. We take care of everything from flight bookings, hotels, sightseeing, and local experiences, ensuring your trip is stress-free.
            </p>
            <a href="error" className="text-teal-500 hover:underline">Explore Tours & Packages</a>
          </div>

          {/* Restaurant Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">Restaurant</h3>
            <p className="text-lg text-gray-700 mb-4">
              Our restaurant offers a variety of cuisines, from local specialties to international dishes. Whether you're in the mood for a quick bite or a full-course meal, we have the perfect options for you. Enjoy dining in a cozy, friendly environment with excellent service.
            </p>
            <a href="error" className="text-teal-500 hover:underline">See Our Menu</a>
          </div>

          {/* Gifts Details */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">Gifts</h3>
            <p className="text-lg text-gray-700 mb-4">
              Looking for the perfect gift? Our store offers a wide selection of unique gifts for any occasion. From personalized items to premium gift sets, you're sure to find something your loved ones will adore.
            </p>
            <a href="error" className="text-teal-500 hover:underline">Browse Gift Options</a>
          </div>

          {/* Grocery Items Details */}
          <div>
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">Grocery Items</h3>
            <p className="text-lg text-gray-700 mb-4">
              We make shopping for groceries easy! Our online grocery store provides a wide range of fresh fruits, vegetables, snacks, beverages, and more. Get everything you need from one place and have it delivered straight to your doorstep.
            </p>
            <a href="error" className="text-teal-500 hover:underline">Start Shopping</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
