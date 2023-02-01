import './SessionForm.css';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useCheckMobileScreen from '../../hooks/useWindowDimensions';
import SessionFormMobileNav from './SessionFormMobileNav/SessionFormMobileNav';
import SessionFormNav from './SessionFormNav/SessionFormNav';
import { APIURL } from '../../api';

export default function SessionForm() {
  const navigate = useNavigate();
  const isMobile = useCheckMobileScreen();
  const [allSectionsComplete, setAllSectionsComplete] = useState(true);
  const [formState, setFormState] = useState({
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
  });

  const [completed, setCompleted] = useState({
    about: false,
    location: false,
    conditions: false,
    equipment: false,
    wrapUp: false,
  });

  function testState() {
    console.log(formState);
  }

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

    console.log('submitting form...');

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
        console.log('Success!');
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
          {!isMobile && <h2>New Session</h2>}
          <button
            onClick={(event) => {
              event.preventDefault();
              testState();
            }}
          >
            Log State
          </button>
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
