import { Link, useLocation, useNavigate } from "react-router-dom";

export default function JoinTeam() {
  const location = useLocation();
  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();
    navigate("/temp", {
      state: {
        uname: e.target.uname.value,
        tname: location.state.team,
        ucolor: "blue"
      }
    });
  }

  return (
    <>
      <h1>{location.state.team}</h1>
      <form onSubmit={sendData}>
        <input type="text" name="uname" placeholder="your nane" />
        <input type="submit" />
      </form>
    </>
  );
}
