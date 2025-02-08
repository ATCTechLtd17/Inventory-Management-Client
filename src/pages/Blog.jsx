import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
 
  const blogPosts = [
    {
      title: "The Benefits of a Library Management System",
      date: "December 1, 2024",
      excerpt: "A Library Management System helps streamline library operations, improve efficiency, and automate key tasks like book tracking and member management.",
      link: "/blog/benefits-library-management-system"
    },
    {
      title: "How to Manage Library Transactions Effectively",
      date: "November 25, 2024",
      excerpt: "Learn how to effectively track and manage library transactions, including book checkouts, returns, and overdue books using the Library Management System.",
      link: "/blog/manage-library-transactions"
    },
    {
      title: "Library Management System Features You Should Know",
      date: "November 15, 2024",
      excerpt: "Explore the key features of a Library Management System, from cataloging books to managing member accounts and generating detailed reports.",
      link: "/blog/library-management-system-features"
    },
    {
      title: "Why Cloud-Based Library Management Systems Are the Future",
      date: "November 5, 2024",
      excerpt: "Discover the advantages of using cloud-based Library Management Systems, including data security, remote access, and scalability.",
      link: "/blog/cloud-based-library-management-system"
    }
  ];

  return (
    <div className="bg-white p-6 shadow-sm text-black">
      <h2 className="text-2xl font-semibold text-teal-900 mb-4">Library Management System Blog</h2>
      <p className="text-gray-700 text-lg mb-6">
        Stay updated with the latest news, tips, and articles about the Library Management System. Here, we share valuable information to help you get the most out of the system and enhance your library operations.
      </p>

      {/* Blog Posts List */}
      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <div key={index} className="border-b pb-6">
            <h3 className="text-xl font-semibold text-teal-900">
              <Link to={post.link} className="hover:text-indigo-600">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <p className="text-gray-700 mt-2">{post.excerpt}</p>
            <Link
              to={post.link}
              className="text-indigo-500 mt-4 inline-block hover:text-indigo-600"
            >
              Read More &rarr;
            </Link>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default Blog;