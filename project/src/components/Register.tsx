import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RegisterProps {
  onClick: () => void;
}

const Register: React.FC<RegisterProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBack = () => {
    navigate(-1); // Utilisez -1 pour revenir à la page précédente
  };

  const handleRegister = async () => {
    try {
      // Vérifier si l'âge est supérieur ou égal à 18
      const age = calculateAge(birthdate);
      if (age < 18) {
        setError('Vous devez avoir au moins 18 ans pour vous inscrire.');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/users/login', {
        Name: firstName,
        Surname: lastName,
        Email: email,
        Password: password,
        IsBotanist: false,
        Birthday: birthdate
      });
      // Ici vous pouvez traiter la réponse, par exemple en redirigeant l'utilisateur
      setSuccessMessage('Inscription réussie !');
      onClick(); // Appeler la fonction onClick fournie par le parent pour naviguer vers la page suivante
    } catch (error) {
      setError('Une erreur s\'est produite lors de l\'inscription.');
    }
  };

  // Fonction pour calculer l'âge à partir de la date de naissance
  const calculateAge = (birthdate: string): number => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg justify-center">
      <h2 className="text-2xl font-semibold mb-6">Inscription</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Nom"
          className="border border-secondary rounded-full p-2 h-12"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prénom"
          className="border border-secondary rounded-full p-2 h-12"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <input
          type="date"
          placeholder="Date de naissance"
          className="border border-secondary rounded-full p-2 h-12"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <button
          className="bg-color-secondary text-white rounded-full p-2 hover:bg-green-600"
          onClick={handleRegister}
        >
          Inscription
        </button>
        <button className="backButton" onClick={handleBack}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default Register;