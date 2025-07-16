import SocialNetworkGraph from "./components/Graph/SocialNetworkGraph";
import Header from "./components/ui/Header";
import data from "./components/Graph/data";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-[calc(100vh-80px)] p-8">
        <div className="max-w-7xl mx-auto h-full">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full p-6">
            <SocialNetworkGraph data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
