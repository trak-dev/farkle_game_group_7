import React, { useState } from "react";
import axios from "axios";

const Registerform = ({ db }) => {
  const [userinfos, setUserInfos] = useState({
    pseudo: "",
    password: "",
    email: "",
  });

  const handleonchange = (value, property) => {
    setUserInfos((oldState) => ({ ...oldState, [property]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { pseudo, password, email } = userinfos;

    const regex = /^\S+@\S+\.\S+$/;

    if (!regex.test(email)) {
      alert("Adresse mail invalide !");
      return;
    }
    axios
      .post("http://127.0.0.1:8080/users/register", { pseudo, email, password })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error inserting user:", error);
      });
  };

  return (
    <form className="formRegister" onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        placeholder="Pseudo"
        value={userinfos.pseudo}
        onChange={(event) => handleonchange(event.target.value, "pseudo")}
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
