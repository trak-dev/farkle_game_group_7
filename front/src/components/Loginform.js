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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = userinfos;
      if (!email || !password) throw "missing properties !";
      const response = await axios.post("http://127.0.0.1:8080/users/login", {
        email,
        password,
      });
      const token = response.data.token;
      if (!token) throw "no token !";
      localStorage.setItem("token", token);
      console.log("zfeu,nuijaz");
      navigate("/rooms");
    } catch (error) {
      console.error("Error inserting user:", error);
      // use somethign to make an alert like sweetalert or something else
    }
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
