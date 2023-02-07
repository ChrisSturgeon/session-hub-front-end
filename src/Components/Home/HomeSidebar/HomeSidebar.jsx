import './HomeSidebar.css';
import { useContext } from 'react';
import { RequestContext, UserContext } from '../../../App';
import { Link } from 'react-router-dom';
import LatestUsers from '../../LatestUsers/LatestUsers';

export default function HomeSidebar() {
  const [friendRequests] = useContext(RequestContext);
  const user = useContext(UserContext);
  const updateProfileURL = `/profile/${user.ID}/edit`;
  return (
    <div className="home-sidebar">
      <h2>My Hub</h2>
      <div className="home-sidebar-actions">
        {friendRequests.count > 0 && (
          <Link to="/friends/requests" className="friends-request-notification">
            <span>
              <ion-icon name="person-add-outline"></ion-icon>
              <div>
                You have {friendRequests.count} pending
                {friendRequests.count > 1
                  ? ' friends requests'
                  : ' friend request'}
              </div>
            </span>
          </Link>
        )}
        <Link to="/new-session/about">
          <span>
            <ion-icon name="add-outline"></ion-icon>
            <div>Add a Session</div>
          </span>
        </Link>
        <Link to={updateProfileURL}>
          <span>
            <ion-icon name="brush-outline"></ion-icon>
            <div>Edit my Profile</div>
          </span>
        </Link>
      </div>
      <LatestUsers />
      <div className="test-height"></div>
    </div>
  );
}
