// src/context/NotificationContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/notifications/Toast"; // Import the Toast component

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toast, setToast] = useState(null); // State to hold toast message and type

  // Function to show a toast notification
  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    // Automatically hide the toast after a few seconds
    setTimeout(() => {
      setToast(null);
    }, 3000); // Toast disappears after 3 seconds
  }, []);

  return (
    <NotificationContext.Provider value={{ showToast }}>
      {children}
      {/* Render the Toast component if a toast message exists */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
