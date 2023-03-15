import React, { useState } from "react";

const Registerform = ({ db }) => {
  const [userinfos, setUserInfos] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleonchange = (value, property) => {
    setUserInfos((oldState) => ({ ...oldState, [property]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, email } = userinfos;

    const regex = /^\S+@\S+\.\S+$/;

    if (!regex.test(email)) {
      alert("Adresse mail invalide !");
      return;
    }

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
  };

  return (
    <form className="formRegister" onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        placeholder="Pseudo"
        value={userinfos.username}
        onChange={(event) => handleonchange(event.target.value, "username")}
      />
      <input
        placeholder="Adresse mail"
        value={userinfos.email}
        onChange={(event) => handleonchange(event.target.value, "email")}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={userinfos.password}
        onChange={(event) => handleonchange(event.target.value, "password")}
      />
      <button type="submit"> S'inscrire</button>
    </form>
  );
};

export default Registerform;
