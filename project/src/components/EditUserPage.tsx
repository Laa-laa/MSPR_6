import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from './NavigationBar';
import PlantOptionSwitchButton from './PlantOptionSwitchButton';

const EditUserPage = () => {
  const defaultUserId = 1; // L'ID de l'utilisateur par défaut
  const [userData, setUserData] = useState({
    Name: '',
    Surname: '',
    Email: '',
    Birthday: '',
    Password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data from backend when component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${defaultUserId}`); // Fetch current user data
      setUserData(response.data); // Set fetched user data to state
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/users/${defaultUserId}`, userData); // Update user data
      alert('Vos informations ont été modifiées!');
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Error updating user data');
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="bg-white p-8 rounded-t-3xl text-center w-full flex flex-col flex-wrap justify-center h-full shadow-lg">
        <div className="addPlantQuestionHeader mb-8">
          <h1 className="text-3xl text-green-900">Modifier votre Profil</h1>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form className="addPlantQuestionForm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Name" className="block">Prénom:</label>
            <input type="text" id="Name" name="Name" className="border border-gray-300 rounded-md p-2 w-full" value={userData.Name} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label htmlFor="Surname" className="block">Nom:</label>
            <input type="text" id="Surname" name="Surname" className="border border-gray-300 rounded-md p-2 w-full" value={userData.Surname} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label htmlFor="Email" className="block">Email:</label>
            <input type="email" id="Email" name="Email" className="border border-gray-300 rounded-md p-2 w-full" value={userData.Email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label htmlFor="Birthday" className="block">Anniversaire:</label>
            <input type="date" id="Birthday" name="Birthday" className="border border-gray-300 rounded-md p-2 w-full" value={userData.Birthday} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label htmlFor="Password" className="block">Mots de passe:</label>
            <input type="password" id="Password" name="Password" className="border border-gray-300 rounded-md p-2 w-full" value={userData.Password} onChange={handleChange} required />
          </div>
          <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800" type="submit">Sauvegarder</button>
        </form>
        <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800" onClick={() => window.history.back()}>Annuler</button>
        <button className="bg-red-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-red-800">Supprimer votre compte</button>
      </div>
    </div>
  );
};

export default EditUserPage;
