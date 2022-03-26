import { Link, useLocation } from "react-router-dom";

export default function JoinTeam() {
  const location = useLocation();

  return (
    <>
      <h1>{location.state.team}</h1>
      <input type="text" placeholder="your nane" />
      <input type="submit" />
    </>
  );
}
