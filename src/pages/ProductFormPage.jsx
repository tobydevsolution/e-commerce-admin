// src/pages/ProductFormPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductFormPage() {
  const { id } = useParams(); // Get the 'id' parameter from the URL if it exists
  const navigate = useNavigate(); // Hook to navigate programmatically

  const isEditing = id !== undefined; // Determine if we are in 'edit' mode or 'create' mode

  // Placeholder for product data state (will be populated from local storage for editing)
  const [productData, setProductData] = React.useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

  // Effect to load product data if in editing mode
  React.useEffect(() => {
    if (isEditing) {
      // In a real app, you'd fetch data from local storage here based on `id`
      // For now, let's simulate fetching:
      const dummyProduct = {
        name: `Edited Product ${id}`,
        category: "Electronics",
        price: 299.99,
        stock: 75,
        description: "This is a description for an edited product.",
        imageUrl: "https://placehold.co/100x100/A0B2C3/FFFFFF?text=Product",
      };
      setProductData(dummyProduct);
    } else {
      // Clear form if we're creating a new product
      setProductData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        imageUrl: "",
      });
    }
  }, [id, isEditing]); // Re-run when id changes (e.g., navigating from /new to /edit/1)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd save or update the product in local storage here
    console.log("Product Data Submitted:", productData);
    if (isEditing) {
      console.log(`Updating product with ID: ${id}`);
      // Call local storage update function
    } else {
      console.log("Creating new product");
      // Call local storage save function
    }
    // Navigate back to product list after submission
    navigate("/products");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {isEditing
          ? `Edit Product: ${productData.name || id}`
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
