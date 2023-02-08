import './ProfileNav.css';
import { NavLink } from 'react-router-dom';

export default function ProfileNav() {
  return (
    <nav className="profile-nav">
      <ul>
        <li>
          <NavLink to="posts">Posts</NavLink>
        </li>
        <li>
          <NavLink to="about">About</NavLink>
        </li>
        <li>
          <NavLink to="friends">Friends</NavLink>
        </li>
      </ul>
    </nav>
  );
}
