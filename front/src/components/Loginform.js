import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Loginform = ({ db }) => {
  const [userinfos, setUserInfos] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleonchange = (value, property) => {
    setUserInfos((oldState) => ({ ...oldState, [property]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = userinfos;

    axios
      .post("http://127.0.0.1:8080/users/login", { email, password })
      .then((response) => {
        console.log(response);
        // if (response.data.isConnected) {
        navigate("../Rooms.js");
        console.log(navigate);
        // }
      })
      .catch((error) => {
        console.error("Error inserting user:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email :
        <input
          type="text"
          value={userinfos.email}
          onChange={(event) => handleonchange(event.target.value, "email")}
        />
      </label>
      <label>
        Mot de passe :
        <input
          type="password"
          value={userinfos.password}
          onChange={(event) => handleonchange(event.target.value, "password")}
        />
      </label>
      <button onClick={handleSubmit} type="submit">
        Se connecter
      </button>
    </form>
  );
};

export default Loginform;
