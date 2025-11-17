import React from "react";
import MoodForm from "./pages/MoodForm";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <MoodForm />
    </div>
  );
};

export default App;