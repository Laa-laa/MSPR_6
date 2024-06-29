import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer>
      <Link to="/privacy-policy">Politique de Confidentialité</Link>
      <Link to="/cookies-policy">Politique des Cookies</Link>
    </footer>
  );
};

export default Footer;
