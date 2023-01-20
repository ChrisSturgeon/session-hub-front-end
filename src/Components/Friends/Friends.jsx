import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

export default function Friends() {
  const user = useContext(UserContext);

  return (
    <div className="page-wrapper">
      <Link to={user.ID}>My Friends</Link>
      <Link to="requests">Friends requests</Link>
      <Link to="all-users">See all users</Link>
      <Outlet />
    </div>
  );
}
