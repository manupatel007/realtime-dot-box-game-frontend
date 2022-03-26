import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link to="/create">
        <button>Create Team</button>
      </Link>
      <Link to="/teams">
        <button>Join Team</button>
      </Link>
    </>
  );
}
