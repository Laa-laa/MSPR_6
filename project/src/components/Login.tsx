import React, { useState } from 'react';

interface LoginProps {
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Login successful!');
        // Add redirection or other actions after successful login
      } else {
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
    <div className="flex flex-col items-center justify-end h-screen bg-green-900">
      <div className="bg-white p-8 rounded-t-3xl text-center w-full flex flex-col flex-wrap justify-center h-5/6 shadow-lg">
      <h1 className="text-3xl text-green-900">A'rosa-je</h1>
        <h2 className="text-xl mb-4 text-gray-700">Connexion</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-full p-2 mb-4"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-full p-2 mb-4"
            />
          </label>
          <br />
          <div className='buttonContainer'>
            <button className="bg-green-900 text-white rounded-full py-2 px-6 mr-4 hover:bg-green-800" type="button" onClick={handleLogin}>
              Se connecter
            </button>
          </div>
        </form>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <button className="bg-green-900 text-white rounded-full py-1 px-4 mt-4 m-2" onClick={() => window.history.back()}>Retour</button>
      </div>
    </div>
  );
};

export default Login;
