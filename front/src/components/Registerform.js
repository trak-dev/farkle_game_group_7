import React, { useState } from "react";

const Registerform = ({ db }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    db.query(
      `INSERT INTO users (username, password, email) VALUES (?, ?)`,
      [username, password, email],
      (err) => {
        if (err) {
          console.error("Error inserting user:", err);
        } else {
          console.log("User added to database");
        }
      }
    );

    const value = event.target.value;
    const regex = /^\S+@\S+\.\S+$/;

    if (regex.test(value)) {
      setEmail(value);
    } else {
      alert("Adresse mail invalide !");
      setEmail(alert);
    }
  };

  //   Pour vérifier que le format de l'email est correct
  //   function handleEmailChange(event) {
  //     const value = event.target.value;
  //     const regex = /^\S+@\S+\.\S+$/;

  //     if (regex.test(value)) {
  //       setMail(value);
  //     } else {
  //       alert("Adresse mail invalide !");
  //       setMail(alert);
  //     }
  //   }

  return (
    <form className="formRegister" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pseudo"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="email"
        placeholder="Adresse mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        // onSubmit={handleEmailChange}
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
