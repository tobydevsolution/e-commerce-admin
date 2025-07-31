// Define the key under which product data will be stored in localStorage
export const LOCAL_STORAGE_KEY = "ecommerce_products";

/**
 * Retrieves product data from local storage.
 * Parses the JSON string back into a JavaScript array.
 * Returns an empty array if no data is found or if there's an error.
 * @returns {Array<Object>} An array of product objects.
 */
export const getProductsFromLocalStorage = () => {
  try {
    const productsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    // If data exists, parse it; otherwise, return an empty array
    return productsJson ? JSON.parse(productsJson) : [];
  } catch (error) {
    console.error("Error reading products from local storage:", error);
    // Return empty array to prevent app crash if data is corrupted
    return [];
  }
};

/**
 * Saves the given array of products to local storage as a JSON string.
 * @param {Array<Object>} products - The array of product objects to save.
 */
export const saveProductsToLocalStorage = (products) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error writing products to local storage:", error);
    // In a production app, you might want to show a user-facing error here
  }
};

/**
 * Generates a simple unique ID for new products.
 * This is a basic approach; for a real-world app, consider UUID libraries.
 * @returns {string} A unique ID string.
 */
export const generateUniqueId = () => {
  // Combines timestamp and a random string for uniqueness
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};
