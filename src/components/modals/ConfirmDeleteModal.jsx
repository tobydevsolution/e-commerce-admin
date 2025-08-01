// src/components/modals/ConfirmDeleteModal.jsx
import React from "react";

/**
 * A reusable confirmation modal for delete actions.
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onConfirm - Function to call when the user confirms.
 * @param {function} props.onCancel - Function to call when the user cancels.
 * @param {string} props.itemName - The name of the item being deleted (e.g., "product").
 */
function ConfirmDeleteModal({
  isOpen,
  onConfirm,
  onCancel,
  itemName = "item",
}) {
  if (!isOpen) return null; // Don't render if not open

  return (
    // Overlay for the modal
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal content box */}
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full transform transition-all scale-100 opacity-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this {itemName}? This action cannot be
          undone.
        </p>
        {/* Action buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
