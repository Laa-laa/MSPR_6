import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginProps {
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBack = () => {
    navigate(-1); // Utilisez -1 pour revenir à la page précédente
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/signin', {  // Assurez-vous que le chemin de l'API est correct
        email,
        password
      });
      // Ici vous pouvez traiter la réponse, par exemple en redirigeant l'utilisateur
      setSuccessMessage('Connexion réussie ! Redirection vers le tableau de bord...'); // Message de succès
      setTimeout(() => {
        navigate('/dashboard'); // Rediriger l'utilisateur vers le tableau de bord après la connexion réussie
      }, 2000); // Redirection après 2 secondes
    } catch (error) {
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg justify-center">
      <h2 className="text-2xl font-semibold mb-6">Connexion</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Email"
          className="border border-secondary rounded-full p-2 h-12"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border border-secondary rounded-full p-2 h-12"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-color-secondary text-white rounded-full p-2 hover:bg-green-600"
          onClick={handleLogin}
        >
          Connexion
        </button>
        <button className="backButton" onClick={handleBack}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default Login;