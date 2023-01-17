import { Link, Outlet } from 'react-router-dom';

export default function Friends() {
  return (
    <div>
      <Link to="all-users">See all users</Link>
      <Link to="requests">Friends requests</Link>
      <p>I'm the friends home page</p>
      <Outlet />
    </div>
  );
}
