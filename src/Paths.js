import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import CreateTeam from "./CreateTeam";
import Home from "./Home";
import JoinTeam from "./JoinTeam";
import Teams from "./Team";
import Waiting from "./Waiting";

export default function Paths() {
  return (
    <Routes>
      <Route exact path="/game" element={<App />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/teams" element={<Teams />} />
      <Route exact path="/create" element={<CreateTeam />} />
      <Route exact path="/join" element={<JoinTeam />} />
      <Route exact path="/wait" element={<Waiting />} />
    </Routes>
  );
}
