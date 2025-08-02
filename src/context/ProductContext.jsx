import React, { createContext, useContext } from "react";
import useProductsLocalStorage from "../hooks/useLocalStorage";

// Creates the context object
const ProductContext = createContext();

/**
 * ProductProvider component.
 * This component wraps your application (or a part of it)
 * and makes the product data and CRUD functions available to all its children.
 * It uses the useProductsLocalStorage hook to manage the actual data.
 * @param {Object} { children } - React children to be rendered within the provider.
 */
export const ProductProvider = ({ children }) => {
  // Use the custom hook to get products data and CRUD functions
  const { products, addProduct, updateProduct, deleteProduct, getProductById } =
    useProductsLocalStorage();

  // The value prop passes the data and functions down to consuming components
  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/**
 * Custom hook to easily consume the ProductContext.
 * Components will call this hook to access product data and functions.
 * @returns {Object} An object containing products array and CRUD functions.
 */
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    // This check ensures the hook is used within a ProductProvider
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
