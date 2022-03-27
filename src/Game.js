import { Link, useLocation } from "react-router-dom";

import App from "./App";

export default function Temp() {
  const location = useLocation();

  return (
    <>
      <App
        team={location.state.tname}
        name={location.state.uname}
        color={location.state.ucolor}
      />
    </>
  );
}
