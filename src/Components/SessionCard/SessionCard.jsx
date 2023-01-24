import './SessionCard.css';
import { format } from 'date-fns';
import SessionCardMap from './SessionCardMap/SessionCardMap';

export default function SessionCard({ session }) {
  const dateObj = new Date(session.activityDate);
  const sportFormatted =
    session.sport.slice(0, 1).toUpperCase() + session.sport.slice(1);

  return (
    <div className="session-card">
      <div className="overview-details">
        <div className="upper">
          <div className="date">{format(dateObj, 'EEEE do MMM yy')}</div>
          <div className="title">
            {sportFormatted} at {session.locationName}
          </div>
        </div>
        <div className="lower">
          <div className="likes-comments">
            <div>
              <ion-icon name="thumbs-up-outline"></ion-icon>
              {session.likes.length}
            </div>
            <div>
              <ion-icon name="chatbox-outline"></ion-icon>25
            </div>
          </div>
        </div>
      </div>
      <SessionCardMap coords={session.coords} />
    </div>
  );
}
