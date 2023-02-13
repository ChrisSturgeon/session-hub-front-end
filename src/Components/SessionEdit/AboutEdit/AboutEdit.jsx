import './AboutEdit.css';
import { useOutletContext } from 'react-router-dom';

export default function AboutEdit() {
  const [sessionState, setSessionState] = useOutletContext();
  const { about } = sessionState;
  const maxDateString = new Date().toISOString().substring(0, 10);

  function handleDateChange(event) {
    const amendedDate = new Date(event.target.value);
    setSessionState({
      ...sessionState,
      about: {
        ...sessionState.about,
        date: amendedDate,
      },
    });
  }

  function handleSportChange(event) {
    setSessionState({
      ...sessionState,
      about: {
        ...sessionState.about,
        sport: event.target.value,
      },
    });
  }

  return (
    <div className="about">
      <h2>Editing Session About</h2>
      <div className="date">
        <h3>Date</h3>
      </div>
      <input
        type="date"
        value={about.date.toISOString().substr(0, 10)}
        onChange={handleDateChange}
        max={maxDateString}
      ></input>

      <hr></hr>
      <h3>Sport</h3>
      <div className="sport-selection">
        <div className="sport-input">
          <input
            type="radio"
            name="sport"
            id="surfing"
            value="surfing"
            onChange={handleSportChange}
            defaultChecked={about.sport === 'surfing'}
          ></input>
          <label htmlFor="surfing">Surfing</label>
        </div>
        <div className="sport-input">
          <input
            type="radio"
            name="sport"
            id="windsurfing"
            value="windsurfing"
            onChange={handleSportChange}
            defaultChecked={about.sport === 'windsurfing'}
          ></input>
          <label htmlFor="windsurfing">Windsurfing</label>
        </div>
        <div className="sport-input">
          <input
            type="radio"
            name="sport"
            id="kitesurfing"
            value="kitesurfing"
            onChange={handleSportChange}
            defaultChecked={about.sport === 'kitesurfing'}
          ></input>
          <label htmlFor="kitesurfing">Kitesurfing</label>
        </div>
        <div className="sport-input">
          <input
            type="radio"
            name="sport"
            id="wingsurfing"
            value="wingsurfing"
            onChange={handleSportChange}
            defaultChecked={about.sport === 'wingsurfing'}
          ></input>
          <label htmlFor="wingsurfing">Wingsurfing</label>
        </div>
        <div className="sport-input">
          <input
            type="radio"
            name="sport"
            id="paddleboarding"
            value="paddleboarding"
            onChange={handleSportChange}
            defaultChecked={about.sport === 'paddleboarding'}
          ></input>
          <label htmlFor="paddleboarding">Paddleboarding</label>
        </div>
      </div>
    </div>
  );
}
