import { Link, useLocation } from "react-router-dom";

export default function Waiting() {
  const location = useLocation();

  return (
    <>
      <h1>{location.state.tname}</h1>
      <p>Waiting for other member to join....</p>
    </>
  );
}
