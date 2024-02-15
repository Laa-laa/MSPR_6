// Home.jsx
import React from 'react';
import { Link } from "react-router-dom";

import Register from './Register';
import Login from './Login';

const Home = ({ onLogin, onRegister }) => {
  
  return (
    <div className="homeContainer">
      <div className="logoContainer">
        <h1 className="logo">A'rosa-je</h1>
      </div>
      <div className="loginContainer">
        <h2 className="title">Bienvenue</h2>
        <p className="paragraph">Connectez-vous ou inscrivez-vous pour prendre soin de vos plantes!</p>
        <div className='buttonContainer'>
           <Link to="/login">
            <button className="loginButton">Se connecter</button>
          </Link>
          
          <Link to="/register">
          <button className="coloredButton" onClick={onRegister}>S'inscrire</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
