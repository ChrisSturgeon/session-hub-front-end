import { Link, Outlet } from 'react-router-dom';
export default function Friends() {
  return (
    <div>
      <Link to="">My Friends</Link>
      <Link to="requests">Friends requests</Link>
      <Link to="all-users">See all users</Link>
      <Outlet />
    </div>
  );
}
