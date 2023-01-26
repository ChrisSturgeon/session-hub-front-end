import './SessionDetail.css';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { format } from 'date-fns';
import EquipmentDetail from './EquipmentDetail/EquipmentDetail';
import DetailMap from './DetailMap/DetailMap';
import { sanitize } from 'dompurify';
import Conditions from './Conditions/Conditions';

import Comments from '../Comments/Comments';

export default function SessionDetail() {
  const { session } = useLoaderData();
  const dateObj = new Date(session.activityDate);
  const title =
    session.sport.slice(0, 1).toUpperCase() +
    session.sport.slice(1) +
    ' at ' +
    session.locationName;

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
          <div className="username">Username here</div>
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
