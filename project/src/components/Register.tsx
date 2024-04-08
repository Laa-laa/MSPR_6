import React, { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

interface RegisterProps {
  onClick: () => void;
}

const Register: React.FC<RegisterProps> = ({ onClick }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Add logic to handle registration
    console.log('Registration logic goes here');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg justify-center">
      <h2 className="text-2xl font-semibold mb-6">Inscription</h2>
      <div className="flex flex-col space-y-4">
        <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" className="border border-secondary rounded-full p-2 h-12" />
        <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Prénom" className="border border-secondary rounded-full p-2 h-12" />
        <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e-mail" className="border border-secondary rounded-full p-2 h-12" />
        <InputText value={password} onChange={(e) => setPassword(e.target.value)} placeholder="mot de passe" className="border border-secondary rounded-full p-2 h-12" />
        <Button label="Valider" className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800 mr-4" onClick={handleRegister} />
        <button className="bg-green-900 text-white rounded-full py-2 px-6 mt-4 hover:bg-green-800 mr-4" onClick={() => window.history.back()}>Retour</button>
      </div>
    </div>
  );
};

export default Register;
