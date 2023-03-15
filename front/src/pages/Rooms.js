import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rooms = ({ db }) => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Récupérer les informations de la table "games_status"
    db.query(
      `SELECT gs.*, g.current_status FROM games_status gs 
       JOIN games g ON gs.game_id = g.id`,
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la récupération des parties:", err);
        } else {
          // Mettre à jour l'état de la liste des parties
          setGames(results);
        }
      }
    );
  }, [db]);

  const handleJoinGame = (gameId) => {
    // Rediriger l'utilisateur vers la page de jeu
    navigate(`/game/${gameId}`);
  };

  return (
    <div>
      <h1>Liste des parties</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.current_status} {game.game_ended ? "(Terminé)" : ""}
            {game.game_ended || game.clicked_start ? (
              <button disabled={!game.clicked_start} onClick={() => handleJoinGame(game.game_id)}>
                Rejoindre
              </button>
            ) : (
              <p>En attente de joueurs</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;