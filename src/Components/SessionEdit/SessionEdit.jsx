import './SessionEdit.css';
import { useState } from 'react';
import {
  Outlet,
  useLoaderData,
  useParams,
  useNavigate,
} from 'react-router-dom';
import { APIURL } from '../../api';

export default function SessionEdit() {
  const { session } = useLoaderData();
  const { sessionID } = useParams();
  const navigate = useNavigate();
  const [sessionState, setSessionState] = useState({
    about: {
      date: new Date(session.activityDate),
      sport: session.sport,
    },
    location: {
      name: session.locationName,
      coords: session.coords,
    },
    conditions: {
      wind: session.conditions.wind,
      swell: session.conditions.swell,
    },
    equipment: {
      board: session.equipment.board ? session.equipment.board : '',
      sail: session.equipment.sail ? session.equipment.sail : '',
      kite: session.equipment.kite ? session.equipment.kite : '',
      wing: session.equipment.wing ? session.equipment.wing : '',
    },
    wrapUp: session.description,
  });

  async function handleSubmit(event) {
    console.log('submitting!');
    event.preventDefault();
    console.log(sessionState);

    const sessionData = {
      description: sessionState.wrapUp,
      date: sessionState.about.date,
      sport: sessionState.about.sport,
      location: sessionState.location,
      equipment: sessionState.equipment,
      conditions: sessionState.conditions,
    };

    try {
      const response = await fetch(`${APIURL}/sessions/${sessionID}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
        body: JSON.stringify(sessionData),
      });

      if (response.status === 200) {
        navigate(`/session/${sessionID}`);
      } else {
        const data = await response.json();
        console.log('Something has gone wrong here...', data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="session-edit-wrapper">
      <form onSubmit={handleSubmit}>
        <Outlet context={[sessionState, setSessionState]} />
        <button>Update</button>
      </form>
    </div>
  );
}
