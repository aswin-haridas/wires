"use client";

import React from "react";

interface AddRelationshipSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddRelationshipSidebar: React.FC<AddRelationshipSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-800 text-white p-6 shadow-xl transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-80 z-50`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Add Relationship</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Form elements will go here */}
      <form>
        <div className="mb-4">
          <label
            htmlFor="sourceNode"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Source Node
          </label>
          <input
            type="text"
            id="sourceNode"
            name="sourceNode"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter source node ID"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="targetNode"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Target Node
          </label>
          <input
            type="text"
            id="targetNode"
            name="targetNode"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter target node ID"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="relationshipType"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Relationship Type
          </label>
          <input
            type="text"
            id="relationshipType"
            name="relationshipType"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 'connects_to', 'depends_on'"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Add Relationship
        </button>
      </form>
      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 -z-10"
          onClick={onClose}
        ></div>
      )}
    </div>
  );
};

export default AddRelationshipSidebar;
