import { useState } from "react";
import SocialNetworkGraph from "./components/Graph/SocialNetworkGraph";
import Header from "./components/ui/Header";
import AddConnectionSidebar from "./components/ui/AddConnectionSidebar";
import data from "./components/Graph/data";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddConnection = (connection: {
    name: string;
    relationship: "friend" | "family" | "acquaintance";
  }) => {
    // TODO: Implement adding connection to the graph data
    console.log("Adding connection:", connection);
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col">
      <Header onAddConnection={() => setIsSidebarOpen(true)} />
      <div className="flex-1">
        <SocialNetworkGraph data={data} />
      </div>
      <AddConnectionSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAddConnection={handleAddConnection}
      />
    </div>
  );
}

export default App;
