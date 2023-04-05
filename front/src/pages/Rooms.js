import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const Rooms = ({ db }) => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [socket, setSocket] = useState(null);
  const [dices_number, setDices_number] = useState(4);
  const [max_players, setMax_players] = useState(0);
  const token = localStorage.getItem("token");
  // if (!token) {
  //   navigate("/");
  // }
  // useEffect(() => {

  // }, []);
  const createGame = () => {
    axios
      .put(
        "http://localhost:8080/games",
        {
          dices_number,
          max_players: +max_players,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
    // socket.emit("createGame", game);
  };
  const handleJoinGame = (gameId) => {
    // Rediriger l'utilisateur vers la page de jeu
    // navigate(`/game/${gameId}`);
  };

  return (
    <div>
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
        <input
          value={dices_number}
          onChange={(e) => setDices_number(e.target.value)}
          type="number"
        />
        <input
          value={max_players}
          onChange={(e) => setMax_players(e.target.value)}
          type="number"
        />
        <button onClick={createGame}>Créer une partie</button>
      </div>

      <p>Veuillez vous reconnecter</p>
    </div>
  );
};

export default Rooms;
