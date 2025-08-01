import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useNotifications } from "../context/NotificationContext"; // <-- NEW: Import useNotifications
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";

function ProductListPage() {
  const { products, deleteProduct } = useProducts();
  const { showToast } = useNotifications(); // <-- NEW: Get showToast function

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [productNameToDelete, setProductNameToDelete] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (productId, productName) => {
    setProductIdToDelete(productId);
    setProductNameToDelete(productName);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      deleteProduct(productIdToDelete);
      showToast("Product deleted successfully!", "success"); // <-- NEW: Show success toast after deletion
    }
    setIsModalOpen(false);
    setProductIdToDelete(null);
    setProductNameToDelete("");
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
    setProductNameToDelete("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Link
          to="/products/new"
          className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-md flex items-center"
        >
          <span className="mr-1">+</span> Add New Product
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products by name or category..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₦{parseFloat(product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/products/edit/${product.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        handleDeleteClick(product.id, product.name)
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
                  No products found. Add some or adjust your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        itemName={
          productNameToDelete ? `product "${productNameToDelete}"` : "item"
        }
      />
    </div>
  );
}

export default ProductListPage;
