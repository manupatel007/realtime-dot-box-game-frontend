import { Link, useNavigate } from "react-router-dom";

export default function CreateTeam() {
  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();
    var uid = Date.now(),
      tname = e.target.team.value,
      uname = e.target.username.value;
    console.log(tname);
    fetch("https://fastapi-websockets.vishwas007.repl.co/addteam", {
      method: "POST",
      body: JSON.stringify({
        name: tname,
        uid: uid
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        nextPage(tname, uname, uid);
      })
      .catch((error) => console.log(error));
  }

  const nextPage = (tname, uname, uid) => {
    console.log(tname, uname, uid);
    navigate("/wait", { state: { uid: uid, uname: uname, tname: tname } });
  };

  return (
    <>
      <form onSubmit={sendData}>
        <input type={Text} name="team" placeholder="Team Name" />
        <input type={Text} name="username" placeholder="Your Name" />
        <input type="submit" />
      </form>
    </>
  );
}
