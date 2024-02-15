// Register.jsx
import React from 'react';

const Register = ({ onClick }) => {
  return (
    <div className="registerContainer">
      <h2 className="title">Inscription</h2>
      {/* Your registration form elements can go here */}
      <button className="backButton" onClick={onClick}>Retour</button>
    </div>
  );
};

export default Register;
