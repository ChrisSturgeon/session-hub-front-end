import './About.css';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function About() {
  const [formState, setFormState, completed, setCompleted] = useOutletContext();
  const { about } = formState;
  const today = new Date();
  const weekAgo = new Date(today - 60000 * 60 * 24 * 7);
  const navigate = useNavigate();

  function handleDateChange(event) {
    setFormState({
      ...formState,
      about: {
        ...formState.about,
        date: event.target.value,
      },
    });
  }

  function handleSportChange(event) {
    setFormState({
      ...formState,
      about: {
        ...formState.about,
        sport: event.target.value,
      },
    });
  }

  function next(event) {
    event.preventDefault();
    console.log('hi');
    setCompleted({
      ...completed,
      about: true,
    });
    navigate('/new-session/location');
  }

  return (
    <div className="about">
      <div className="date">
        <label htmlFor="date">Session Date</label>
        <input
          name="date"
          id="date"
          type="date"
          min={weekAgo.toISOString().slice(0, 10)}
          max={today.toISOString().slice(0, 10)}
          onChange={handleDateChange}
          value={about.date}
        ></input>
      </div>
      <fieldset className="sport">
        <legend>Sport</legend>
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
      </fieldset>
      <div className="next-previous-btns">
        <button onClick={(event) => next(event)}>Next</button>
      </div>
    </div>
  );
}
