// src/context/OrderContext.jsx
import React, { createContext, useContext } from "react";
import useOrdersLocalStorage from "../hooks/useOrdersLocalStorage";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { orders, addOrder, updateOrder, deleteOrder, getOrderById } =
    useOrdersLocalStorage();

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrder, deleteOrder, getOrderById }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
