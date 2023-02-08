import './SessionForm.css';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { APIURL } from '../../api';
import useCheckMobileScreen from '../../hooks/useWindowDimensions';

// Component imports
import SessionFormMobileNav from './SessionFormMobileNav/SessionFormMobileNav';
import SessionFormNav from './SessionFormNav/SessionFormNav';

const blankFormState = {
  about: {
    date: new Date(),
    sport: 'surfing',
  },
  location: {
    name: '',
    coords: [50.57422642679197, -4.915909767150879],
  },
  conditions: {
    wind: {
      direction: 0,
      speed: '',
      gust: '',
    },
    swell: {
      direction: 0,
      height: '',
      frequency: '',
    },
  },
  equipment: {
    board: '',
    sail: '',
    kite: '',
    wing: '',
  },
  wrapUp: '',
};

export default function SessionForm() {
  const navigate = useNavigate();
  const isMobile = useCheckMobileScreen();
  const [allSectionsComplete, setAllSectionsComplete] = useState(true);
  const [formState, setFormState] = useState(() => {
    if (window.sessionStorage.getItem('new-session-inputs')) {
      return JSON.parse(window.sessionStorage.getItem('new-session-inputs'));
    } else {
      return blankFormState;
    }
  });

  const [completed, setCompleted] = useState({
    about: false,
    location: false,
    conditions: false,
    equipment: false,
    wrapUp: false,
  });

  async function handleFormSubmit(event) {
    event.preventDefault();
    const allAreCompleted = Object.values(completed).every(
      (section) => section === true
    );

    if (!allAreCompleted) {
      console.log('not all sections completed');
      setAllSectionsComplete(false);
      return;
    }

    const sessionData = {
      description: formState.wrapUp,
      date: formState.about.date,
      sport: formState.about.sport,
      location: formState.location,
      equipment: formState.equipment,
      conditions: formState.conditions,
    };

    try {
      const response = await fetch(`${APIURL}/sessions/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
        body: JSON.stringify(sessionData),
      });

      if (response.status === 200) {
        const data = await response.json();
        const newPostURL = data.data;
        window.sessionStorage.removeItem('new-session-inputs');
        navigate(`/session/${newPostURL}`);
      } else {
        const data = await response.json();
        console.log('Something has gone wrong here...', data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="session-form-wrapper">
      <div className="session-form-layout">
        <div className="sticky">
          {isMobile ? (
            <SessionFormMobileNav completed={completed} />
          ) : (
            <SessionFormNav completed={completed} />
          )}
        </div>
        <form className="session-form">
          <Outlet
            context={[
              formState,
              setFormState,
              completed,
              setCompleted,
              handleFormSubmit,
              allSectionsComplete,
            ]}
          />
        </form>
      </div>
    </div>
  );
}
