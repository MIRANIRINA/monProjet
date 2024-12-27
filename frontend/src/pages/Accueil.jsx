
import React from 'react';
import { Link } from 'react-router-dom';

const Accueil = () => (
  <div style={{textAlign:'center',backgroundColor:'beige'}}>
    <h1 style={{
      color:'red',
    }}>
      Bienvenue sur l'application de gestion de produits</h1><br/>
    <h3><li><Link to="/pages">Page d'Accueil</Link></li></h3>
  </div>
);

export default Accueil;

