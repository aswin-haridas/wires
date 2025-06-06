"use client";
import Header from "./components/ui/Header";
import ForceDirectedTree from "./components/Graph/ForceDirectedTree";
import data from "./components/Graph/data";
import AddNewNode from "./components/Graph/AddNewNode";
import AddRelationshipSidebar from "./components/Graph/AddRelationshipSidebar";
import { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main>
      <Header />
      <div>
        <ForceDirectedTree data={data} />
        <AddNewNode />
        <button
          onClick={toggleSidebar}
          className="fixed top-20 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Relationship
        </button>
      </div>
      <AddRelationshipSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </main>
  );
}
