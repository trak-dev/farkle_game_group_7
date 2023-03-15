// import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// import axios from "axios";

const Dicehome = () => {
  // useEffect(() => {
  //   axios
  //     .get("")
  //     .then((res) => setData(res.data));
  // }, []);

  return (
    <div className="">
      <ul>
        <NavLink
          to="/register"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>S'INSCRIRE</li>
        </NavLink>
        <NavLink
          to="/login"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>SE CONNECTER</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Dicehome;
