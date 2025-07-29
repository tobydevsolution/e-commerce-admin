// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-gray-700 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Page Not Found</p>
      <p className="text-lg text-center mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;
