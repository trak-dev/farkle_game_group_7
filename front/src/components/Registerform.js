import React, { useState } from "react";

const Registerform = ({ db }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    db.query(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, password],
      (err) => {
        if (err) {
          console.error("Error inserting user:", err);
        } else {
          console.log("User added to database");
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pseudo"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Registerform;
