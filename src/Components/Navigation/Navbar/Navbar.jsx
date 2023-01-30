import './Navbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../App';

export default function Navbar({ logOut }) {
  const user = useContext(UserContext);
  const userURL = `profile/${user.ID}`;
  return (
    <nav className="top-nav">
      <h1>Session Hub</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/friends">My Friends</Link>
        <Link to="/new-session/about">NEW SESSION </Link>
        <Link to="/new-post">New Session</Link>
        <Link to={userURL}>My Profile</Link>
      </div>
      <button onClick={logOut}>Log Out</button>
    </nav>
  );
}
