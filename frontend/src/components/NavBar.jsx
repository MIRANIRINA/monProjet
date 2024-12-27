import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (

  <nav >
    <ul style={{ display: 'flex', listStyle: 'none',textAlign:'center',gap:10 }}>
      <li><Link to="/">Accueil</Link></li>
      <li><Link to="/inscription">Inscription</Link></li>
      <li><Link to="/connexion">Connexion</Link></li>
      <li><Link to="/produits">Produits</Link></li>
    </ul>
  </nav>
);

export default Navbar;
