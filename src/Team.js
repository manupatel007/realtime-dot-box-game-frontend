import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const ws = useRef(null);
  const [cnt, setCnt] = useState(0);
  const [retry, setRetry] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // websocket for chats
    connect();
  }, [cnt]);

  function connect() {
    ws.current = new WebSocket(
      "ws://127.0.0.1:8000/getteams"
    );
    ws.current.onopen = function () {
      // subscribe to some channels
      console.log("connected");
    };

    ws.current.onmessage = function (message) {
      message = JSON.parse(message.data);
      console.log(message);
      setTeams([...teams, message]);
    };

    ws.current.onclose = function (e) {
      if (retry) {
        console.log(
          "Socket is closed. Reconnect will be attempted in 1 second.",
          e.reason
        );
        setTimeout(function () {
          connect();
        }, 1000);
      }
    };

    ws.current.onerror = function (err) {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      setRetry(false);
      ws.current.close();
    };
  }

  // const changeCnt = () => {
  //   setCnt(cnt + 1);
  // };

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
