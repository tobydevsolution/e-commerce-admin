// Define keys for all data types in localStorage
export const LOCAL_STORAGE_PRODUCT_KEY = "ecommerce_products";
export const LOCAL_STORAGE_ORDER_KEY = "ecommerce_orders";
export const LOCAL_STORAGE_USER_KEY = "ecommerce_users";

/**
 * Generic function to retrieve data from local storage.
 * @param {string} key - The localStorage key (e.g., LOCAL_STORAGE_PRODUCT_KEY).
 * @returns {Array<Object>} An array of objects.
 */
const getDataFromLocalStorage = (key) => {
  try {
    const json = localStorage.getItem(key);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error(`Error reading from local storage for key "${key}":`, error);
    return [];
  }
};

/**
 * Generic function to save data to local storage.
 * @param {string} key - The localStorage key.
 * @param {Array<Object>} data - The array of objects to save.
 */
const saveDataToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to local storage for key "${key}":`, error);
  }
};

// --- Product Specific Functions ---
export const getProductsFromLocalStorage = () =>
  getDataFromLocalStorage(LOCAL_STORAGE_PRODUCT_KEY);
export const saveProductsToLocalStorage = (products) =>
  saveDataToLocalStorage(LOCAL_STORAGE_PRODUCT_KEY, products);

// --- Order Specific Functions ---
export const getOrdersFromLocalStorage = () =>
  getDataFromLocalStorage(LOCAL_STORAGE_ORDER_KEY);
export const saveOrdersToLocalStorage = (orders) =>
  saveDataToLocalStorage(LOCAL_STORAGE_ORDER_KEY, orders);

// --- User Specific Functions ---
export const getUsersFromLocalStorage = () =>
  getDataFromLocalStorage(LOCAL_STORAGE_USER_KEY);
export const saveUsersToLocalStorage = (users) =>
  saveDataToLocalStorage(LOCAL_STORAGE_USER_KEY, users);

/**
 * Generates a simple unique ID for new items.
 * @returns {string} A unique ID string.
 */
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};
