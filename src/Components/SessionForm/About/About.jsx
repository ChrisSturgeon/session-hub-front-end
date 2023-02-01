import './About.css';
import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import uuid from 'react-uuid';

export default function About() {
  const navigate = useNavigate();

  const [formState, setFormState, completed, setCompleted] = useOutletContext();
  const { about } = formState;
  const [days, setDays] = useState([]);

  // Adds each day of last week into days state
  useEffect(() => {
    const today = new Date();
    let daysArr = [today];
    for (let i = 1; i < 3; i++) {
      const day = new Date(today - 60000 * 60 * 24 * i);
      daysArr.push(day);
    }
    setDays(daysArr);
  }, []);

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
        <h3>Date</h3>
        <div className="date-selection">
          {days.map((day, index) => {
            let labelText;
            if (index === 0) {
              labelText = 'Today';
            } else if (index === 1) {
              labelText = 'Yesterday';
            } else {
              labelText = format(day, 'EEEE');
            }
            const isChecked =
              day.toString().slice(3, 10) ===
              about.date.toString().slice(3, 10);
            return (
              <div key={day.toDateString()} className="date-input">
                <input
                  type="radio"
                  name="date "
                  value={day}
                  onChange={handleDateChange}
                  id={day.toDateString()}
                  checked={isChecked}
                />
                <label htmlFor={day.toDateString()}>{labelText}</label>
              </div>
            );
          })}
        </div>
      </div>

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

      <div className="next-previous-btns">
        <button onClick={(event) => next(event)}>Next</button>
      </div>
    </div>
  );
}
