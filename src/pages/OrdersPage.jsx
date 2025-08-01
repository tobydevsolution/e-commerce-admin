// src/pages/OrdersPage.jsx
import React, { useState } from "react";
import { useOrders } from "../context/OrderContext"; // Import useOrders hook
import { useNotifications } from "../context/NotificationContext"; // For toasts
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal"; // Re-use delete modal

function OrdersPage() {
  // Access orders and CRUD functions from the OrderContext
  const { orders, updateOrder, deleteOrder } = useOrders();
  const { showToast } = useNotifications(); // Access the toast notification function

  // State for search and filter functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // State for the delete confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const [customerNameToDelete, setCustomerNameToDelete] = useState("");

  // Filter orders based on search term and selected status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle changing an order's status
  const handleStatusChange = (orderId, newStatus) => {
    const orderToUpdate = orders.find((o) => o.id === orderId);
    if (orderToUpdate) {
      updateOrder({ ...orderToUpdate, status: newStatus });
      showToast(
        `Order ${orderId.substring(0, 8)}... status updated to ${newStatus}!`,
        "success"
      );
    }
  };

  // Open the delete confirmation modal
  const handleDeleteClick = (orderId, customerName) => {
    setOrderIdToDelete(orderId);
    setCustomerNameToDelete(customerName);
    setIsModalOpen(true);
  };

  // Confirm and perform the deletion
  const handleConfirmDelete = () => {
    if (orderIdToDelete) {
      deleteOrder(orderIdToDelete);
      showToast(
        `Order ${orderIdToDelete.substring(0, 8)}... deleted successfully!`,
        "success"
      );
    }
    setIsModalOpen(false);
    setOrderIdToDelete(null);
    setCustomerNameToDelete("");
  };

  // Cancel the deletion process
  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setOrderIdToDelete(null);
    setCustomerNameToDelete("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-full overflow-hidden">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>

      {/* Search and Filter UI */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search orders by ID or customer name..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₦{parseFloat(order.total).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }
                        ${
                          order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                      `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      View Details
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteClick(order.id, order.customerName)
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        itemName={
          customerNameToDelete
            ? `order from "${customerNameToDelete}"`
            : "order"
        }
      />
    </div>
  );
}

export default OrdersPage;
