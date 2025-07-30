import React from "react";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

function DashboardPage() {
  const stats = [
    {
      title: "Sales",
      value: "2,500",
      change: "+12% from last month",
      progress: 65,
      bgColor: "bg-yellow-400",
      textColor: "text-white",
      icon: DollarSign,
    },
    {
      title: "Orders",
      value: "$2,200",
      change: "+18% from last month",
      progress: 80,
      bgColor: "bg-emerald-500",
      textColor: "text-white",
      icon: ShoppingCart,
    },
    {
      title: "Users",
      value: "2,140",
      change: "+8% from last month",
      progress: 45,
      bgColor: "bg-pink-500",
      textColor: "text-white",
      icon: Users,
    },
    {
      title: "Revenue",
      value: "$950",
      change: "+22% from last quarter",
      progress: 72,
      bgColor: "bg-blue-500",
      textColor: "text-white",
      icon: TrendingUp,
    },
  ];

  const products = [
    { id: 1, name: "Premium Headphones", price: "$500", percentage: "190%" },
    { id: 2, name: "Smart Watch", price: "$350", percentage: "250%" },
    { id: 3, name: "Wireless Earbuds", price: "$200", percentage: "190%" },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-full overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Dashboard Stats
      </h1>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} ${stat.textColor}  p-5 rounded-xl shadow-lg flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm sm:text-lg font-medium uppercase tracking-wider opacity-90">
                  {stat.title}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-black bg-opacity-10`}>
                <stat.icon size={24} />
              </div>
            </div>

            {/* Progress bar container */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{stat.progress}%</span>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full"
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
              <p className="text-xs mt-2 opacity-90">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Products Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Products
          </h2>
          <button className="bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base">
            <span className="mr-1">+</span> Add Product
          </button>
        </div>

        {/* Responsive Table Container */}
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                    <input type="checkbox" className="form-checkbox h-4 w-4" />
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.price}
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {product.percentage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
