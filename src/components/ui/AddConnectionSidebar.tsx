import React, { useState } from "react";
import { X, User, Heart, Users } from "lucide-react";
import Button from "./Button";
import type { Node } from "../../types";

interface AddConnectionSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onAddConnection: (
    connection: Omit<Node, "depth"> & {
      relationship: "friend" | "family" | "acquaintance";
    }
  ) => void;
}

const AddConnectionSidebar: React.FC<AddConnectionSidebarProps> = ({
  isOpen,
  onClose,
  onAddConnection,
}) => {
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState<
    "friend" | "family" | "acquaintance"
  >("friend");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Create a unique ID from the name
      const id = name.toLowerCase().replace(/\s+/g, "_");

      onAddConnection({
        id,
        name: name.trim(),
        relationship,
      });

      // Reset form
      setName("");
      setRelationship("friend");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/10"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Add Connection
            </h2>
            <Button onClick={onClose} icon={X} variant="secondary" size="sm">
              Close
            </Button>
          </div>

          {/* Form */}
          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter person's name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Relationship Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="relationship"
                      value="friend"
                      checked={relationship === "friend"}
                      onChange={(e) =>
                        setRelationship(
                          e.target.value as "friend" | "family" | "acquaintance"
                        )
                      }
                      className="w-4 h-4 text-black focus:ring-black"
                    />
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Friend
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="relationship"
                      value="family"
                      checked={relationship === "family"}
                      onChange={(e) =>
                        setRelationship(
                          e.target.value as "friend" | "family" | "acquaintance"
                        )
                      }
                      className="w-4 h-4 text-black focus:ring-black"
                    />
                    <Heart className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Family
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="relationship"
                      value="acquaintance"
                      checked={relationship === "acquaintance"}
                      onChange={(e) =>
                        setRelationship(
                          e.target.value as "friend" | "family" | "acquaintance"
                        )
                      }
                      className="w-4 h-4 text-black focus:ring-black"
                    />
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Acquaintance
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={() => {}} className="flex-1">
                  Add Connection
                </Button>
                <Button
                  onClick={onClose}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-blue-700">
                  First Degree Connection
                </span>
              </div>
              <p className="text-sm text-blue-600">
                This will add a direct connection between you and this person.
                They will appear as a first-degree connection in your network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddConnectionSidebar;
