// Login.jsx
import React, { useState } from 'react';

const Login = ({ onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Envoie des données de login au serveur
    try {
      const response = await fetch('/api/login', {
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
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <button className="backButton" onClick={onBack}>
        Retour
      </button>
    </div>
  );
};

export default Login;
