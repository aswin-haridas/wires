import React from "react";

const Legend: React.FC = () => {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-xs">
      <h3 className="text-sm font-medium text-gray-900 mb-3">
        Relationship Types
      </h3>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-blue-500"></div>
          <span className="text-sm text-gray-600">Friend</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-red-500"></div>
          <span className="text-sm text-gray-600">Family</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-4 h-0.5 bg-green-500"></div>
          <span className="text-sm text-gray-600">Acquaintance</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <h4 className="text-xs font-medium text-gray-700 mb-2">
          Network Depth
        </h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <span className="text-xs text-gray-600">You</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-full"></div>
            <span className="text-xs text-gray-600">Direct connections</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded-full"></div>
            <span className="text-xs text-gray-600">2nd degree</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Click on any node to see details
        </p>
      </div>
    </div>
  );
};

export default Legend;
