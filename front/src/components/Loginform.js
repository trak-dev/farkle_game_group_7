import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

const Loginform = ({ db }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate =  useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Envoyer les données à la base de données SQL
    db.query(
      `SELECT * FROM users WHERE pseudo = ? AND password = ?`,
      [username, password],
      (err, results) => {
        if (err) {
          console.error("Erreur de connexion à la base de données:", err);
        } else {
          if (results.length > 0) {
            console.log("Authentification réussie");
            // Rediriger l'utilisateur vers la page d'accueil
            navigate('/Rooms')
          } else {
            console.error("Nom d'utilisateur ou mot de passe incorrect");
            // Ajouter le code pour afficher un message d'erreur à l'utilisateur ici
          }
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pseudo :
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Mot de passe :
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Loginform;
