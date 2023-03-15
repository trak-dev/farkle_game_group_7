import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ladder from "./pages/ladder";
import "./styles/index.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/ladder" element={<Ladder />} />
        {/* <Route path="*" element={<About />} />  ICI ON PEUT METTRE UNE PAGE 404 PAR EXEMPLE SI L'URL NE CORRESPOND A RIEN DE DECLARER*/}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
