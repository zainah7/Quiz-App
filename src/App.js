// src/App.js
import React from "react";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          {/* Quiz Application */}
        </h1>
        <Quiz />
      </div>
    </div>
  );
}

export default App;
