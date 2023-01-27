import './SessionDetail.css';
import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import EquipmentDetail from './EquipmentDetail/EquipmentDetail';
import DetailMap from './DetailMap/DetailMap';
import { sanitize } from 'dompurify';
import Conditions from './Conditions/Conditions';
import LikeForm from '../LikeForm/LikeForm';

import Comments from '../Comments/Comments';

export default function SessionDetail() {
  const { session } = useLoaderData();
  const dateObj = new Date(session.activityDate);
  const title =
    session.sport.slice(0, 1).toUpperCase() +
    session.sport.slice(1) +
    ' at ' +
    session.locationName;

  const [liked, setLiked] = useState(session.hasLiked);
  const [totalLikes, setTotalLikes] = useState(session.likesCount);
  const [commentsCount, setCommentsCount] = useState(session.commentsCount);
  const userProfileURL = `/profile/${session.userID}`;

  const conditions = {
    wind: {
      direction: 210,
      speed: 20,
      gust: 25,
    },
    swell: {
      direction: 32,
      height: 0.4,
      frequency: 12,
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="session-detail">
      <div className="header">
        <DetailMap coords={session.coords} />
        <div className="text">
          <div className="date">{format(dateObj, 'EEEE do MMM yy')}</div>
          <h1 className="title"> {title}</h1>
          <Link to={userProfileURL} className="username">
            {session.username}
          </Link>
          <div className="likes-comments">
            <LikeForm
              sessionID={session._id}
              type={'session'}
              liked={liked}
              setLiked={setLiked}
              totalLikes={totalLikes}
              setTotalLikes={setTotalLikes}
            />
            <div className="comments-count">
              <ion-icon name="chatbox-outline"></ion-icon>
              <div>{commentsCount}</div>
            </div>
          </div>
          <hr></hr>
          <h2 className="equipment-title">Conditions</h2>
          <div className="conditions-wrapper">
            {conditions.wind && (
              <Conditions type="wind" conditions={conditions} />
            )}

            {conditions.swell && (
              <Conditions type="swell" conditions={conditions} />
            )}
          </div>
          <hr></hr>
          <h2 className="equipment-title">Equipment</h2>
          <EquipmentDetail
            sport={session.sport}
            equipment={session.equipment}
          />
          {session.description && (
            <div>
              <hr></hr>
              <h2 className="equipment-title">Wrap Up</h2>
              <p
                className="session-description"
                dangerouslySetInnerHTML={{
                  __html: sanitize(session.description),
                }}
              ></p>
            </div>
          )}
          <hr></hr>
          <Comments />
        </div>
      </div>
    </div>
  );
}
