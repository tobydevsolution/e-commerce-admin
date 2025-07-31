import React from "react";
import { Link } from "react-router-dom";

function ProductListPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Link
          to="/products/new"
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-md"
        >
          Add New Product
        </Link>
      </div>
      <p className="text-gray-700 mb-4">
        This page will display your list of products, with options to search,
        filter, and manage them.
      </p>

      {/* Placeholder for search/filter bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Placeholder for product table/cards */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Sample Product 1
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Electronics
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                $199.99
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                150
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to="/products/edit/1"
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
            {/* More product rows will go here */}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center text-gray-500">
        No products found yet. Add some!
      </div>
    </div>
  );
}

export default ProductListPage;
