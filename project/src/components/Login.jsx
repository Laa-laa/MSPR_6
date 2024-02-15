// Login.jsx
import React, { useState } from 'react';

const Login = ({ onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    // Envoie des données de login au serveur
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Gestion de la réussite de la connexion
        console.log('Login successful!');
        // Ajoutez ici des redirections ou d'autres actions après la connexion réussie
      } else {
        // Gestion des erreurs de connexion
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Login failed');
        console.error('Login failed:', errorData.error || 'Unknown error');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setErrorMessage('An error occurred during login');
    }
  };

  return (
    <div className="homeContainer">
       <div className="logoContainer">
        <h1 className="logo">A'rosa-je</h1>
      </div>
    <div className="loginContainer">
      <h2 className="title">Connexion</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <div className='buttonContainer'>
        <button className="coloredButton" type="button" onClick={handleLogin}>
          Se connecter
        </button>
        </div>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button className="backButton" onClick={onBack}>
        Retour
      </button>
    </div>
    </div>
  );
};

export default Login;