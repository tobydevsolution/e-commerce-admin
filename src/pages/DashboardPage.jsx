import React from "react";
import { Link } from "react-router-dom";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { FaNairaSign } from "react-icons/fa6";
import { LuPackage } from "react-icons/lu";
import { useProducts } from "../context/ProductContext"; // Import useProducts hook
import { useOrders } from "../context/OrderContext"; // NEW: Import useOrders hook
import { useUsers } from "../context/UserContext"; // NEW: Import useUsers hook

function DashboardPage() {
  const { products } = useProducts(); // Get products from the context
  const { orders } = useOrders(); // NEW: Get orders from the context
  const { users } = useUsers(); // NEW: Get users from the context

  // Calculate dynamic stats based on actual data
  const totalProductsCount = products.length;
  const totalOrdersCount = orders.length; // Dynamic order count
  const totalUsersCount = users.length; // Dynamic user count

  // Calculate total revenue from orders (assuming each order has a 'total' property)
  const totalRevenueValue = orders.reduce(
    (sum, order) => sum + (parseFloat(order.total) || 0),
    0
  );

  const stats = [
    {
      title: "Products",
      value: totalProductsCount.toLocaleString(),
      change: "+12% from last month", // Placeholder for actual calculation
      progress: 65, // Placeholder
      bgColor: "bg-yellow-400",
      textColor: "text-white",
      icon: LuPackage,
    },
    {
      title: "Orders",
      value: totalOrdersCount.toLocaleString(),
      change: "+18% from last month", // Placeholder
      progress: 80, // Placeholder
      bgColor: "bg-emerald-500",
      textColor: "text-white",
      icon: ShoppingCart,
    },
    {
      title: "Users",
      value: totalUsersCount.toLocaleString(),
      change: "+8% from last month", // Placeholder
      progress: 45, // Placeholder
      bgColor: "bg-pink-500",
      textColor: "text-white",
      icon: Users,
    },
    {
      title: "Revenue",
      value: `₦${totalRevenueValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      change: "+22% from last quarter", // Placeholder
      progress: 72, // Placeholder
      bgColor: "bg-blue-500",
      textColor: "text-white",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-full overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
        Stats Summary Cards
      </h1>

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`${stat.bgColor} ${stat.textColor} p-5 rounded-xl shadow-lg flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1`}
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

      {/* Products Section (from Dashboard) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Products
          </h2>
          <Link
            to="/products/new"
            className="bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base"
          >
            <span className="mr-1">+</span> Add Product
          </Link>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Stock
                </th>
                <th className="px-4 py-2 sm:px-6 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.slice(0, 3).map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {product.id.substring(0, 8)}...
                    </td>
                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                      ₦{parseFloat(product.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock}
                    </td>
                    <td className="px-4 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/products/edit/${product.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        Edit
                      </Link>
                      {/* Note: Delete from dashboard preview is usually not recommended,
                          as it bypasses the confirmation modal on the list page.
                          Keeping it as a placeholder for now, but consider removing. */}
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No products found. Add some!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
