import './MobileNav.css';
import { NavLink } from 'react-router-dom';

export default function MobileNav() {
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
          <NavLink to="/profile">
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
