// Login.jsx
import React from 'react';

const Login = ({ onBack }) => {
  return (
    <div className="loginContainer">
      <h2 className="title">Connexion</h2>
      {/* Your login form elements can go here */}
      <button className="backButton" onClick={onBack}>Retour</button>
    </div>
  );
};

export default Login;
