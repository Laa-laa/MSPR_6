// Home.jsx
import React from 'react';
import Register from './Register';

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
          <button className="loginButton" onClick={onLogin}>Se connecter</button>
          <button className="coloredButton" onClick={onRegister}>S'inscrire</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
