import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const webSocket = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // websocket for chats
    webSocket.current = new WebSocket(
      "wss://fastapi-websockets.vishwas007.repl.co/getteams"
    );
    webSocket.current.onmessage = (message) => {
      message = JSON.parse(message.data);
      console.log(message);
      setTeams([...teams, message]);
    };
    return () => webSocket.current.close();
  });

  function nextPage(team) {
    console.log(team);
    navigate("/join", { state: { team: team.team, uid: team.uid } });
  }

  return (
    <>
      {teams.length > 0 &&
        teams.map((team, i) => {
          return (
            <p
              onClick={() => {
                nextPage(team);
              }}
              id={team.uid}
            >
              {team.team}
            </p>
          );
        })}
    </>
  );
}
