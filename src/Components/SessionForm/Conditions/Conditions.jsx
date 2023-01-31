import './Conditions.css';
import { useEffect, useState } from 'react';
import { useOutletContext, navigate, useNavigate } from 'react-router-dom';
import ArrowSlider from '../ArrowSlider/ArrowSlider';
import SessionValidationError from '../ValidationError/SessionValidationError';

export default function Conditions() {
  const navigate = useNavigate();
  const [formState, setFormState, completed, setCompleted] = useOutletContext();
  const { conditions } = formState;
  const [speedIsValid, setSpeedIsValid] = useState(true);
  const [gustIsValid, setGustIsValid] = useState(true);
  const [frequencyIsValid, setFrequencyIsValid] = useState(true);

  function handleDirectionChange(event) {
    if (event.target.name === 'wind') {
      setFormState({
        ...formState,
        conditions: {
          ...formState.conditions,
          [event.target.name]: {
            ...formState.conditions.wind,
            direction: Number(event.target.value),
          },
        },
      });
    } else {
      setFormState({
        ...formState,
        conditions: {
          ...formState.conditions,
          [event.target.name]: {
            ...formState.conditions.swell,
            direction: Number(event.target.value),
          },
        },
      });
    }
  }

  function handleSpeedChange(event) {
    setFormState({
      ...formState,
      conditions: {
        ...formState.conditions,
        [event.target.name]: {
          ...formState.conditions.wind,
          speed: Number(event.target.value),
        },
      },
    });
  }

  // Validates wind speed on input change
  useEffect(() => {
    if (conditions.wind.speed > 201) {
      setSpeedIsValid(false);
      return;
    }
    setSpeedIsValid(true);
  }, [conditions.wind.speed]);

  function handleGustChange(event) {
    setFormState({
      ...formState,
      conditions: {
        ...formState.conditions,
        [event.target.name]: {
          ...formState.conditions.wind,
          gust: Number(event.target.value),
        },
      },
    });
  }

  // Validates wind gust on input change
  useEffect(() => {
    if (conditions.wind.gust > 201) {
      setGustIsValid(false);
      return;
    }
    setGustIsValid(true);
  }, [conditions.wind.gust]);

  function handleFrequencyChange(event) {
    setFormState({
      ...formState,
      conditions: {
        ...formState.conditions,
        [event.target.name]: {
          ...formState.conditions.swell,
          frequency: Number(event.target.value),
        },
      },
    });
  }

  // Validates swell frequency on input change
  useEffect(() => {
    if (conditions.swell.frequency > 50) {
      setFrequencyIsValid(false);
      return;
    }
    setFrequencyIsValid(true);
  }, [conditions.swell.frequency]);

  function next(event) {
    event.preventDefault();

    if (!speedIsValid || !gustIsValid || !frequencyIsValid) {
      return;
    }
    setCompleted({
      ...completed,
      conditions: true,
    });
    navigate('/new-session/equipment');
  }

  function previous(event) {
    event.preventDefault();

    navigate('/new-session/location');
  }

  return (
    <div className="conditions">
      <h3>Wind</h3>
      <div className="wind-conditions">
        <div className="speed-gust">
          <div>
            <label htmlFor="wind-speed">Wind Speed (mph)</label>
            <input
              value={conditions.wind.speed}
              onChange={handleSpeedChange}
              name="wind"
              id="wind-speed"
              type="number"
              min={0}
              max={200}
            />
            {!speedIsValid && (
              <SessionValidationError
                isVisible={!speedIsValid}
                message="Speed must be less than 200mph"
              />
            )}
          </div>
          <div>
            <label htmlFor="wind-gust">Wind Gust (mph)</label>
            <input
              value={conditions.wind.gust}
              onChange={handleGustChange}
              name="wind"
              id="wind-gust"
              type="number"
              min={0}
              max={200}
            />
            {!gustIsValid && (
              <SessionValidationError
                isVisible={!gustIsValid}
                message="Gust speed must be less than 200mph"
              />
            )}
          </div>
        </div>
        <ArrowSlider
          type={'wind'}
          handleDirectionChange={handleDirectionChange}
          degree={conditions.wind.direction}
        />
      </div>
      <hr></hr>
      <h3>Swell</h3>
      <div className="swell-conditions">
        <div className="frequency">
          <div>
            <label htmlFor="swell-frequency">Swell Period (second)</label>
            <input
              onChange={handleFrequencyChange}
              name="swell"
              id="swell-frequency"
              type="number"
              value={Number(conditions.swell.frequency).toString()}
              min={0}
              max={50}
            />
            {!frequencyIsValid && (
              <SessionValidationError
                isVisible={!frequencyIsValid}
                message="Frequency must be less than 50 seconds"
              />
            )}
          </div>
        </div>
        <ArrowSlider
          type={'swell'}
          handleDirectionChange={handleDirectionChange}
          degree={conditions.swell.direction}
        />
      </div>
      <div className="next-previous-btns">
        <button onClick={(event) => next(event)}>Next</button>
        <button onClick={(event) => previous(event)}>Previous</button>
      </div>
    </div>
  );
}
