import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomeUser from "./components/HomeUser";
import WelcomePage from "./components/WelcomePage";
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
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login onBack={handleBack}/>} />
        <Route path="/register" element={<Register onClick={handleRegister} />} />
        <Route path="/home" element={<HomeUser />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
