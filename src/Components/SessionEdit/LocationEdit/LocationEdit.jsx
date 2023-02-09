import './LocationEdit.css';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// Component imports
import Map from '../../SessionForm/Location/Map/Map';
import InputWithCounter from '../../General/InputWithCounter/InputWithCounter';
import SessionValidationError from '../../SessionForm/ValidationError/SessionValidationError';

export default function LocationEdit() {
  const [sessionState, setSessionState] = useOutletContext();
  const { location } = sessionState;
  const [nameIsValid, setNameIsValid] = useState(true);

  function handleNameChange(event) {
    setSessionState({
      ...sessionState,
      location: {
        ...sessionState.location,
        name: event.target.value,
      },
    });
  }

  function handleCoordsChange(coords) {
    setSessionState({
      ...sessionState,
      location: {
        ...sessionState.location,
        coords: coords,
      },
    });
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
    </div>
  );
}
