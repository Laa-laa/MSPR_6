// Register.jsx
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

const Register = ({ onClick }) => {
  const [value, setValue] = useState('');
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg justify-center">
      <h2 className="text-2xl font-semibold mb-6">Inscription</h2>

      <div className="flex flex-col space-y-4">
            <InputText value={value} onChange={(e) => setValue(e.target.value) } placeholder="Nom" className="border border-secondary rounded-full p-2 h-12"/>
            <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder="Prénom" className="border border-secondary rounded-full p-2 h-12" />
            <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder="e-mail" className="border border-secondary rounded-full p-2 h-12"/>
            <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder="mot de passe" className="border border-secondary rounded-full p-2 h-12"/>
            <Button label="Submit" className="bg-color-secondary text-white rounded-full p-2 hover:bg-green-600" />
            <button className="backButton" onClick={onClick}>Retour</button>
        </div>
      {/* Your registration form elements can go here */}
      
    </div>
  );
};

export default Register;
