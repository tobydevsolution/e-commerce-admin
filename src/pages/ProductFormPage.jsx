// src/pages/ProductFormPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useNotifications } from "../context/NotificationContext"; // <-- NEW: Import useNotifications

function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, getProductById } = useProducts();
  const { showToast } = useNotifications(); // <-- NEW: Get showToast function from context

  const isEditing = id !== undefined;

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (isEditing) {
      const existingProduct = getProductById(id);
      if (existingProduct) {
        setProductData(existingProduct);
      } else {
        // <-- UPDATED: Use showToast for error if product not found
        showToast(`Product with ID ${id} not found.`, "error");
        navigate("/products", { replace: true });
      }
    } else {
      setProductData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        imageUrl: "",
      });
    }
  }, [id, isEditing, getProductById, navigate, showToast]); // <-- UPDATED: Add showToast to dependencies

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? parseFloat(value) : value;

    setProductData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation - <-- UPDATED: Use showToast for validation errors
    if (
      !productData.name ||
      !productData.category ||
      productData.price === "" ||
      productData.stock === ""
    ) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    if (isNaN(productData.price) || productData.price <= 0) {
      showToast("Price must be a positive number.", "error");
      return;
    }
    if (isNaN(productData.stock) || productData.stock < 0) {
      showToast("Stock must be a non-negative number.", "error");
      return;
    }

    if (isEditing) {
      updateProduct(productData);
      showToast("Product updated successfully!", "success"); // <-- NEW: Show success toast
    } else {
      addProduct(productData);
      showToast("Product added successfully!", "success"); // <-- NEW: Show success toast
    }
    navigate("/products");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {isEditing
          ? `Edit Product: ${productData.name || "Loading..."}`
          : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Apparel">Apparel</option>
              <option value="Home Goods">Home Goods</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
              step="0.01"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
          ></textarea>
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-3 py-2"
            placeholder="e.g., https://example.com/image.jpg"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-md"
          >
            {isEditing ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductFormPage;
