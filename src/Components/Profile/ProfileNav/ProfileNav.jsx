import { Link } from 'react-router-dom';

export default function ProfileNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="posts">Posts</Link>
        </li>
        <li>
          <Link to="about">About</Link>{' '}
        </li>
        <li>
          <Link to="friends">Friends</Link>
        </li>
      </ul>
    </nav>
  );
}
