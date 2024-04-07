import React from 'react';
import { Link } from 'react-router-dom';
import PlantQuestionsList from "./PlantQuestionsList" 
import PlantOptionSwitchButton from "./PlantOptionSwitchButton"

interface HomeProps {
  onLogin?: () => void;
  onRegister?: () => void;
}

const Home: React.FC<HomeProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="flex flex-col items-center justify-end h-screen bg-green-900">
      <div className="bg-white p-8 rounded-t-3xl text-center w-full flex flex-col flex-wrap justify-center h-5/6 shadow-lg">
        <h1 className="text-3xl text-green-900">A'rosa-je</h1>
        <h2 className="text-xl mb-4 text-gray-700">Bienvenue</h2>
        <p className="text-lg mb-6 text-gray-700">Connectez-vous ou inscrivez-vous pour prendre soin de vos plantes!</p>
        <div className='buttonContainer'>
          <Link to="/login">
            <button className="bg-green-900 text-white border border-green-900 rounded-full py-2 px-6 mr-4 hover:bg-green-800 hover:border-green-800">Se connecter</button>
          </Link>
          <Link to="/register">
            <button className="bg-green-900 text-white rounded-full py-2 px-6 hover:bg-green-800">S'inscrire</button>
          </Link>
          <Link to="/plant-questions">
            <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800">Voir les questions sur les plantes</button>
          </Link>
          <Link to="/home">
            <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
