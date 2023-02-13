import './SessionCard.css';
import { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import SessionCardMap from './SessionCardMap/SessionCardMap';
import LikeForm from '../LikeForm/LikeForm';

export default function SessionCard({ session, feed, thumbURL }) {
  const detailURL = `/session/${session._id}`;
  const dateObj = new Date(session.activityDate);
  const sportFormatted =
    session.sport.slice(0, 1).toUpperCase() + session.sport.slice(1);
  const [liked, setLiked] = useState(session.hasLiked);
  const [totalLikes, setTotalLikes] = useState(session.likesCount);

  return (
    <Link to={detailURL} className="session-card">
      <div className="overview-details">
        <div className="upper">
          <div className="date">{format(dateObj, 'EEEE do MMM yy')}</div>
          <div className="title">
            {sportFormatted} at {session.locationName}
          </div>
          {feed && (
            <div className="user-details ">
              {thumbURL && <img src={thumbURL} alt="profile"></img>}

              <div>{session.username}</div>
            </div>
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="lower"
        >
          <div className="likes-comments">
            <LikeForm
              sessionID={session._id}
              type={'session'}
              liked={liked}
              setLiked={setLiked}
              totalLikes={totalLikes}
              setTotalLikes={setTotalLikes}
            />
            <div>
              <ion-icon name="chatbox-outline"></ion-icon>
              {session.commentsCount}
            </div>
          </div>
        </div>
      </div>
      <SessionCardMap coords={session.coords} />
    </Link>
  );
}
