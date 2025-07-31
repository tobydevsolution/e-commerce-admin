// src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";
import {
  getProductsFromLocalStorage,
  saveProductsToLocalStorage,
  generateUniqueId,
} from "../utils/localStorageHelpers";

/**
 * Custom React Hook to manage product data with local storage persistence.
 * Provides state for products and CRUD operations that automatically sync.
 * @returns {Object} An object containing products array and CRUD functions.
 */
const useProductsLocalStorage = () => {
  // Initialize 'products' state by trying to load from local storage on first render
  const [products, setProducts] = useState(() => {
    return getProductsFromLocalStorage();
  });

  // useEffect to save 'products' to local storage whenever the 'products' state changes
  useEffect(() => {
    saveProductsToLocalStorage(products);
  }, [products]); // Dependency array: runs when 'products' array reference changes

  // --- CRUD Operations ---

  /**
   * Adds a new product to the state and local storage.
   * A unique ID is generated for the new product.
   * @param {Object} newProductData - The product object to add (without an ID).
   */
  const addProduct = (newProductData) => {
    const productWithId = { ...newProductData, id: generateUniqueId() };
    setProducts((prevProducts) => [...prevProducts, productWithId]);
  };

  /**
   * Updates an existing product in the state and local storage.
   * Matches product by its 'id'.
   * @param {Object} updatedProduct - The updated product object (must contain an 'id').
   */
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  /**
   * Deletes a product from the state and local storage by its ID.
   * @param {string} id - The ID of the product to delete.
   */
  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  /**
   * Retrieves a single product by its ID from the current state.
   * @param {string} id - The ID of the product to retrieve.
   * @returns {Object | undefined} The product object if found, otherwise undefined.
   */
  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  // Return the products state and the CRUD functions
  return { products, addProduct, updateProduct, deleteProduct, getProductById };
};

export default useProductsLocalStorage;
