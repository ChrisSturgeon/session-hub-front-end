import './MobileNav.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
// import { RequestContext } from '../../../App';
import { UserContext } from '../../../App';

export default function MobileNav() {
  // const friendRequests = useContext(RequestContext);
  const user = useContext(UserContext);
  const userURL = `profile/${user.ID}`;

  return (
    <nav className="mobile-nav">
      <ul>
        <li>
          <NavLink to="/">
            <span className="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span className="text">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/friends">
            <span className="icon">
              <ion-icon name="people-outline"></ion-icon>
              {/* {friendRequests.count > 0 && (
                <div className="friend-request-notification">
                  {friendRequests.count}
                </div>
              )} */}
            </span>

            <span className="text">Friends</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/new-post">
            <span className="icon">
              <ion-icon name="add-outline"></ion-icon>
            </span>
            <span className="text">Add</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={userURL}>
            <span className="icon">
              <ion-icon name="person-outline"></ion-icon>
            </span>
            <span className="text">Profile</span>
          </NavLink>
        </li>
        <div className="indicator"></div>
      </ul>
    </nav>
  );
}
