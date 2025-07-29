// src/components/layout/Sidebar.jsx
import React from "react";
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg rounded-tr-lg rounded-br-lg">
      <div className="text-2xl font-bold mb-8 text-indigo-300">
        {/* Link to the dashboard */}
        <Link to="/">Admin Panel</Link>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            {/* NavLink for Dashboard: 'end' prop ensures it only matches the exact path '/' */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-700 text-white shadow-inner"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
            >
              <span className="mr-3">📊</span> Dashboard
            </NavLink>
          </li>
          <li>
            {/* NavLink for Products */}
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-700 text-white shadow-inner"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
            >
              <span className="mr-3">📦</span> Products
            </NavLink>
          </li>
          {/* Add more navigation links as your app grows */}
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-700 text-white shadow-inner"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
            >
              <span className="mr-3">🛒</span> Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-700 text-white shadow-inner"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
            >
              <span className="mr-3">🧑‍🤝‍🧑</span> Customers
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* Bottom section of the sidebar */}
      <div className="mt-auto pt-4 border-t border-gray-700 text-sm text-gray-400">
        <p className="text-center">&copy; 2025 E-commerce Admin</p>
      </div>
    </aside>
  );
}

export default Sidebar;
