import React from "react";

const About = () => {
  return (
    <div className="bg-white p-6 shadow-sm text-black">
      <h2 className="text-2xl font-semibold text-teal-900 mb-4">About   অংশু <span className="text-red-500">গ্রন্থ</span> কুটির</h2>
      
      <p className="text-gray-700 text-lg mb-6">
        Welcome to the <strong>Library Management System (LMS)</strong>, a comprehensive solution to help you efficiently manage all aspects of your library.
      </p>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-teal-900 mb-2">Overview</h3>
        <p className="text-gray-700">
          The Library Management System is a web-based application designed to assist administrators in managing the day-to-day operations of a library. It allows administrators to manage books, members, staff, transactions, and other key aspects of library administration. The goal of the system is to improve the efficiency of library management and to create an easy-to-use interface for library staff and patrons.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-teal-900 mb-2">Features</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li><strong>Book Management:</strong> Add, update, and remove books from the library catalog.</li>
          <li><strong>Transaction Management:</strong> Track books borrowed and returned by members.</li>
          <li><strong>Search Functionality:</strong> A robust search feature to quickly find books based on different criteria like author, title, or category.</li>
          <li><strong>Reports:</strong> Generate detailed reports on books, members, and transactions for administrative analysis.</li>
          <li><strong>User Management:</strong> Admins can manage system users, including staff and other admins, to ensure proper access control.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-teal-900 mb-2">Why Use This System?</h3>
        <p className="text-gray-700">
          The Library Management System is built with simplicity and efficiency in mind. It reduces the complexity of library administration by automating essential tasks such as book tracking, member management, and transaction logs. Key benefits include:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li><strong>Improved Efficiency:</strong> Automates key processes to save time for the library staff.</li>
          <li><strong>Enhanced Organization:</strong> Keeps all books and transactions neatly organized and easy to manage.</li>
          <li><strong>Convenient Reports:</strong> Generate reports for informed decision-making and easier library audits.</li>
          <li><strong>Easy-to-Use Interface:</strong> Intuitive and user-friendly for admins and library staff, requiring minimal training.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-teal-900 mb-2">Support</h3>
        <p className="text-gray-700">
          For any issues or queries, our support team is always ready to assist. You can reach us at:
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> support@librarysystem.com
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> +1 (800) 123-4567
        </p>
      </section>

     
    </div>
  );
};

export default About;