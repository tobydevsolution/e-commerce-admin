// src/components/layout/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { Search, Bell, User } from "lucide-react"; // Import Lucide icons

function Header() {
  const location = useLocation(); // Get the current location object

  // Function to get the page title based on the current path
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/products":
        return "Products";
      case "/products/new":
        return "Add New Product";
      case pathname.startsWith("/products/edit/") ? pathname : "": // Matches dynamic edit route
        return "Edit Product";
      case "/orders":
        return "Orders";
      case "/customers":
        return "Customers";
      case "/settings":
        return "Settings";
      default:
        return "Admin Panel"; // Default for other or unknown routes
    }
  };

  const currentPageTitle = getPageTitle(location.pathname);

  return (
    <header className="bg-white p-4 md:p-6 shadow-sm flex items-center justify-between rounded-bl-lg rounded-br-lg z-10 relative">
      {/* Left section: Page Title */}
      <div className="flex items-center">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          {currentPageTitle}
        </h1>
      </div>

      {/* Center section: Search Bar */}
      <div className="relative flex-grow mx-4 md:mx-8 max-w-lg">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for information..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Right section: Icons and User Menu */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {/* Notifications Icon */}
        <button
          className="relative text-gray-600 hover:text-gray-800 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
          {/* Optional: Notification badge */}
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
        </button>

        {/* User Profile/Menu */}
        <button
          className="flex items-center space-x-2 text-gray-800 hover:text-gray-900 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
          aria-label="User Menu"
        >
          <User className="h-6 w-6" />
          <span className="hidden md:inline font-medium">User Menu</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
