import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";


const App: React.FC = () => {
  const handleBack = () => {
    // Handle back action
  };
  const handleRegister = () => {
    // Add logic to handle registration
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onBack={handleBack}/>} />
        <Route path="/register" element={<Register onClick={handleRegister} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
