import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className="bg-green-900">
      <div className="container mx-auto flex justify-center items-center h-16">
        <div className="flex items-center">
          <NavLink
            to="/home"

            className="text-white px-6 py-2 mr-4 rounded hover:bg-green-800"
          >
            Home
          </NavLink>
          <NavLink
            to="/plant-questions"

            className="text-white px-6 py-2 mr-4 rounded hover:bg-green-800"
          >
            Questions
          </NavLink>
          <NavLink
            to="/plant-guards"

            className="text-white px-6 py-2 rounded hover:bg-green-800"
          >
            Demandes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

