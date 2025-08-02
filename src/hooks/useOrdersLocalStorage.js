import { useState, useEffect } from "react";
import {
  getOrdersFromLocalStorage,
  saveOrdersToLocalStorage,
  generateUniqueId,
} from "../utils/localStorageHelpers";

const useOrdersLocalStorage = () => {
  const [orders, setOrders] = useState(() => {
    const storedOrders = getOrdersFromLocalStorage();
    // If local storage is empty, initialize with some dummy orders
    if (storedOrders.length === 0) {
      return [
        {
          id: generateUniqueId(),
          customerName: "Alice Smith",
          total: 125.5,
          status: "Delivered",
          orderDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        },
        {
          id: generateUniqueId(),
          customerName: "Bob Johnson",
          total: 30.75,
          status: "Shipped",
          orderDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        },
        {
          id: generateUniqueId(),
          customerName: "Charlie Brown",
          total: 250.0,
          status: "Pending",
          orderDate: new Date().toISOString(), // Today
        },
        {
          id: generateUniqueId(),
          customerName: "David Lee",
          total: 500.25,
          status: "Shipped",
          orderDate: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
        },
        {
          id: generateUniqueId(),
          customerName: "Eve Davis",
          total: 75.99,
          status: "Cancelled",
          orderDate: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
        },
      ];
    }
    return storedOrders;
  });

  useEffect(() => {
    saveOrdersToLocalStorage(orders);
  }, [orders]);

  // CRUD operations for Orders
  const addOrder = (newOrderData) => {
    const orderWithId = {
      ...newOrderData,
      id: generateUniqueId(),
      status: "Pending",
      orderDate: new Date().toISOString(),
    };
    setOrders((prevOrders) => [...prevOrders, orderWithId]);
  };

  const updateOrder = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
    );
  };

  const deleteOrder = (id) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o.id !== id));
  };

  const getOrderById = (id) => {
    return orders.find((o) => o.id === id);
  };

  return { orders, addOrder, updateOrder, deleteOrder, getOrderById };
};

export default useOrdersLocalStorage;
