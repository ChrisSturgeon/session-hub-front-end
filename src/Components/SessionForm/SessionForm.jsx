import './SessionForm.css';
import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import useCheckMobileScreen from '../../hooks/useWindowDimensions';
import SessionFormMobileNav from './SessionFormMobileNav/SessionFormMobileNav';
import SessionFormNav from './SessionFormNav/SessionFormNav';

export default function SessionForm() {
  const isMobile = useCheckMobileScreen();

  const [formState, setFormState] = useState({
    about: {
      date: new Date().toISOString().slice(0, 10),
      sport: 'surfing',
    },
    location: {
      name: 'Hellos',
      coords: [50.57422642679197, -4.915909767150879],
    },
    conditions: {
      wind: {
        direction: 0,
        speed: 0,
      },
      swell: {
        direction: 0,
        frequency: 0,
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
          <h3>Form here</h3>
          <button
            onClick={(event) => {
              event.preventDefault();
              testState();
            }}
          >
            Log State
          </button>
          <Outlet
            context={[formState, setFormState, completed, setCompleted]}
          />
        </form>
      </div>
    </div>
  );
}
