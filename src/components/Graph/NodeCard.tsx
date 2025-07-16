import React from "react";
import type { NodeCardProps } from "../../types";

const NodeCard: React.FC<NodeCardProps> = ({ node, relationship, onClose }) => {
  if (!node) return null;

  const getRelationshipColor = (rel?: string) => {
    switch (rel) {
      case "friend":
        return "text-blue-600";
      case "family":
        return "text-red-600";
      case "acquaintance":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg font-medium text-gray-700">
              {node.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{node.name}</h3>
              {relationship && (
                <p
                  className={`text-sm ${getRelationshipColor(
                    relationship
                  )} capitalize`}
                >
                  {relationship}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Network Depth:</span>
            <span className="text-gray-900">
              {node.depth === 0
                ? "You"
                : `${node.depth} degree${node.depth > 1 ? "s" : ""}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeCard;
