import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Rooms = ({ db }) => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/users/isUserConnected", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setIsConnected(response.data.logged);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleJoinGame = (gameId) => {
    // Rediriger l'utilisateur vers la page de jeu
    navigate(`/game/${gameId}`);
  };
  if (!isConnected) {
    navigate("/");
    alert("Veuillez vous connecter !");
  }
  return (
    <div>
      {isConnected && (
        <div>
          <h1>Liste des parties</h1>
          <ul>
            {games.map((game) => (
              <li key={game.id}>
                {game.current_status} {game.game_ended ? "(Terminé)" : ""}
                {game.game_ended || game.clicked_start ? (
                  <button
                    disabled={!game.clicked_start}
                    onClick={() => handleJoinGame(game.game_id)}
                  >
                    Rejoindre
                  </button>
                ) : (
                  <p>En attente de joueurs</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>Veuillez vous reconnecter</p>
    </div>
  );
};

export default Rooms;
