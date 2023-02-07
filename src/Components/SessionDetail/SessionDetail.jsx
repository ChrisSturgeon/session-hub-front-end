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
          <div className="user-likes-comments">
            <Link to={userProfileURL} className="username">
              {session.userDetails[0].thumbURL ? (
                <img src={session.userDetails[0].thumbURL} alt="profile"></img>
              ) : (
                <div>Hi</div>
              )}
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
          </div>
          <hr></hr>
          <h2 className="equipment-title">Conditions</h2>
          <div className="conditions-wrapper">
            {session.conditions.wind && (
              <Conditions type="wind" conditions={session.conditions} />
            )}

            {session.conditions.swell && (
              <Conditions type="swell" conditions={session.conditions} />
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
