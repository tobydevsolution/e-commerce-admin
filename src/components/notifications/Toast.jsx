// src/components/notifications/Toast.jsx
import React from "react";

/**
 * A simple toast notification component.
 * @param {Object} props - Component props.
 * @param {string} props.message - The message to display in the toast.
 * @param {'success' | 'error' | 'info'} props.type - The type of toast (determines color).
 */
function Toast({ message, type }) {
  let bgColor = "bg-gray-700"; // Default info color
  if (type === "success") {
    bgColor = "bg-green-500";
  } else if (type === "error") {
    bgColor = "bg-red-500";
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg text-sm transition-all duration-300 transform translate-y-0 opacity-100`}
      >
        {message}
      </div>
    </div>
  );
}

export default Toast;
