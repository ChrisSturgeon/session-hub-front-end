import './Friends.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { RequestContext } from '../../App';

export default function Friends() {
  const user = useContext(UserContext);
  const [requests] = useContext(RequestContext);

  return (
    <div className="friends-page-wrapper">
      <main>
        <nav>
          <div className="friends-sticky">
            <div className="friends-links">
              <NavLink to={user.ID}>My Friends</NavLink>
              <NavLink className="friends-requests-link" to="requests">
                <span>
                  <div>Friends requests</div>
                  {requests.count > 0 && (
                    <div className="request-count">{requests.count}</div>
                  )}
                </span>
              </NavLink>
              <NavLink to="all-users">See all users</NavLink>
            </div>
          </div>
        </nav>
        <Outlet />
      </main>
    </div>
  );
}
