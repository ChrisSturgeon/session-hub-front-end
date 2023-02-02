import './HomeSidebar.css';
import { useContext } from 'react';
import { RequestContext } from '../../../App';
import { Link } from 'react-router-dom';

export default function HomeSidebar() {
  const [friendRequests] = useContext(RequestContext);
  return (
    <div className="home-sidebar">
      <h2>My Hub</h2>
      {friendRequests.count > 0 && (
        <Link to="/friends/requests" className="friends-request-notification">
          <ion-icon name="person-add-outline"></ion-icon>
          <div>
            You have {friendRequests.count} pending
            {friendRequests.count > 1 ? ' friends requests' : ' friend request'}
          </div>
        </Link>
      )}
      <div className="test-height"></div>
    </div>
  );
}
