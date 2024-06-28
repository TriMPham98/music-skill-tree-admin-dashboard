import React from "react";
import InstrumentSelection from "./components/InstrumentSelection";
import StudentManagement from "./components/StudentManagement";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Music Master Dashboard
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <InstrumentSelection />
        <StudentManagement />
      </div>
    </div>
  );
};

export default App;
