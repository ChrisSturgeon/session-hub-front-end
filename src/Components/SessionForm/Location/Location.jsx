import { useOutletContext, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Location.css';
import InputWithCounter from '../../General/InputWithCounter/InputWithCounter';
import Map from './Map/Map';
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

  function next(event) {
    event.preventDefault();

    if (location.name.length < 2) {
      setNameIsValid(false);
      return;
    }
    setCompleted({
      ...completed,
      location: true,
    });
    navigate('/new-session/conditions');
  }

  function previous(event) {
    event.preventDefault();

    navigate('/new-session/about');
  }

  return (
    <div className="location">
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
      <Map coords={location.coords} handleCoordsChange={handleCoordsChange} />
      <div className="next-previous-btns">
        <button onClick={(event) => next(event)}>Next</button>
        <button onClick={(event) => previous(event)}>Previous</button>
      </div>
    </div>
  );
}
