import './Location.css';
import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

// Component imports
import Map from './Map/Map';
import InputWithCounter from '../../General/InputWithCounter/InputWithCounter';
import SessionValidationError from '../ValidationError/SessionValidationError';

export default function Location() {
  const navigate = useNavigate();
  const [formState, setFormState, completed, setCompleted] = useOutletContext();
  const { location } = formState;
  const [nameIsValid, setNameIsValid] = useState(true);

  function handleNameChange(event) {
    setFormState({
      ...formState,
      location: {
        ...formState.location,
        name: event.target.value,
      },
    });
  }

  function handleCoordsChange(coords) {
    setFormState({
      ...formState,
      location: {
        ...formState.location,
        coords: coords,
      },
    });
  }

  function nextSection(event) {
    event.preventDefault();
    if (location.name.length < 2) {
      setNameIsValid(false);
      return;
    }
    window.sessionStorage.setItem(
      'new-session-inputs',
      JSON.stringify(formState)
    );
    setCompleted({
      ...completed,
      location: true,
    });
    navigate('/new-session/conditions');
  }

  function previousSection(event) {
    event.preventDefault();
    window.sessionStorage.setItem(
      'new-session-inputs',
      JSON.stringify(formState)
    );
    navigate('/new-session/about');
  }

  return (
    <div className="location">
      <h3>Location</h3>
      <label htmlFor="location-name">Name</label>
      <InputWithCounter
        id={'location-name'}
        value={location.name}
        onChange={handleNameChange}
        placeholder={'e.g. Polzeath'}
        name={'name'}
        maxLength={30}
      />
      <SessionValidationError
        isVisible={!nameIsValid}
        message={'Location name required'}
      />
      <hr></hr>
      <h3>Drop a Pin</h3>
      <Map
        id="location-map"
        coords={location.coords}
        handleCoordsChange={handleCoordsChange}
      />
      <div className="next-previous-btns">
        <button onClick={(event) => nextSection(event)}>Next</button>
        <button onClick={(event) => previousSection(event)}>Previous</button>
      </div>
    </div>
  );
}
