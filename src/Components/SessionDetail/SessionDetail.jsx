import './SessionDetail.css';
import { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import { sanitize } from 'dompurify';
import { UserContext } from '../../App';

// Component imports
import EquipmentDetail from './EquipmentDetail/EquipmentDetail';
import DetailMap from './DetailMap/DetailMap';
import Conditions from './Conditions/Conditions';
import LikeForm from '../LikeForm/LikeForm';
import Comments from '../Comments/Comments';
import SessionDeleteForm from './SessionDeleteForm/SessionDeleteForm';

export default function SessionDetail() {
  const user = useContext(UserContext);
  const { session } = useLoaderData();
  const dateObj = new Date(session.activityDate);
  const title =
    session.sport.slice(0, 1).toUpperCase() +
    session.sport.slice(1) +
    ' at ' +
    session.locationName;

  const [liked, setLiked] = useState(session.hasLiked);
  const [totalLikes, setTotalLikes] = useState(session.likesCount);
  const [commentsCount] = useState(session.commentsCount);
  const userProfileURL = `/profile/${session.userID}/posts`;
  const isOwnSession = user.ID === session.userID[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="session-detail-wrapper">
      <main>
        <div className="session-detail-map">
          <DetailMap coords={session.coords} />
        </div>
        <div className="session-details">
          <div className="header">
            <div className="text">
              <div className="date-and-edit">
                <div className="date">{format(dateObj, 'EEEE do MMM yy')}</div>
                {isOwnSession && (
                  <Link to="edit/about">
                    <span>
                      <ion-icon name="brush-outline"></ion-icon>
                      <div>edit</div>
                    </span>
                  </Link>
                )}
              </div>
              <h1 className="title"> {title}</h1>
              {isOwnSession && <SessionDeleteForm sessionID={session._id} />}
              <div className="user-likes-comments">
                <Link to={userProfileURL} className="username">
                  {session.userDetails[0].thumbURL && (
                    <img
                      src={session.userDetails[0].thumbURL}
                      alt="profile"
                    ></img>
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
              <div className="title-and-edit">
                <h2 className="equipment-title">Conditions</h2>
                {isOwnSession && (
                  <Link to="edit/conditions">
                    <span>
                      <ion-icon name="brush-outline"></ion-icon>
                      <div>edit</div>
                    </span>
                  </Link>
                )}
              </div>
              <div className="conditions-wrapper">
                {session.conditions.wind && (
                  <Conditions type="wind" conditions={session.conditions} />
                )}
                {session.conditions.swell && (
                  <Conditions type="swell" conditions={session.conditions} />
                )}
              </div>
              <hr></hr>
              <div className="title-and-edit">
                <h2 className="equipment-title">Equipment</h2>
                {isOwnSession && (
                  <Link to="edit/equipment">
                    <span>
                      <ion-icon name="brush-outline"></ion-icon>
                      <div>edit</div>
                    </span>
                  </Link>
                )}
              </div>
              <EquipmentDetail
                sport={session.sport}
                equipment={session.equipment}
              />
              {session.description && (
                <div>
                  <hr></hr>
                  <div className="title-and-edit">
                    <h2 className="equipment-title">Wrap Up</h2>
                    {isOwnSession && (
                      <Link to="edit/equipment">
                        <span>
                          <ion-icon name="brush-outline"></ion-icon>
                          <div>edit</div>
                        </span>
                      </Link>
                    )}
                  </div>
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
      </main>
    </div>
  );
}
