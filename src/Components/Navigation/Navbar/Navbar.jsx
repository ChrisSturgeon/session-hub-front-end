import './Navbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { RequestContext } from '../../../App';

export default function Navbar({ logOut }) {
  const user = useContext(UserContext);
  const [friendRequests] = useContext(RequestContext);
  const userURL = `profile/${user.ID}`;
  const friendsURL = `friends/${user.ID}`;

  return (
    <nav className="top-nav">
      <Link to="/" className="hero-link">
        Session Hub
      </Link>
      <div className="links">
        <ul>
          <li>
            <Link to="/">
              <span>
                <ion-icon name="home"></ion-icon>
                <div>Home</div>
              </span>
            </Link>
          </li>
          <li>
            <Link to={friendsURL}>
              <span style={{ position: 'relative' }}>
                <ion-icon name="people"></ion-icon>
                {friendRequests.count > 0 && (
                  <div className="friend-request-notification">
                    <div>{friendRequests.count}</div>
                  </div>
                )}
                <div>Friends</div>
              </span>
            </Link>
          </li>
          <li>
            <Link to="new-session/about">
              <span>
                <ion-icon name="add"></ion-icon>
                <div>New Session</div>
              </span>
            </Link>
          </li>
          <li>
            <Link to={userURL}>
              <span>
                <ion-icon name="person"></ion-icon>
                <div>Profile</div>
              </span>
            </Link>
          </li>
        </ul>
        <button onClick={logOut}>
          <span>
            <ion-icon name="log-out-outline"></ion-icon>
            <div>Log Out</div>
          </span>
        </button>
      </div>
    </nav>
  );
}
