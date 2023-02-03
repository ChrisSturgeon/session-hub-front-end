import './ProfileSidebar.css';
import { NavLink } from 'react-router-dom';

export default function ProfileSidebar() {
  return (
    <div className="profile-sidebar">
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
    </div>
  );
}
