import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserPage = () => {
    const defaultUserId = 1; // L'ID de l'utilisateur par défaut
  const [userData, setUserData] = useState({
    Name: '',
    Surname: '',
    Email: '',
    Birthday: '',
    Password: ''
  });

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
      alert('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <h2>Edit User Information</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="Name" value={userData.Name} onChange={handleChange} />
        <label>Surname:</label>
        <input type="text" name="Surname" value={userData.Surname} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="Email" value={userData.Email} onChange={handleChange} />
        <label>Birthday:</label>
        <input type="date" name="Birthday" value={userData.Birthday} onChange={handleChange} />
        <label>Password:</label>
        <input type="password" name="Password" value={userData.Password} onChange={handleChange} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUserPage;
