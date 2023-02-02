import './Conditions.css';
import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

// Component imports
import ArrowSlider from '../ArrowSlider/ArrowSlider';
import SessionValidationError from '../ValidationError/SessionValidationError';

export default function Conditions() {
  const navigate = useNavigate();
  const [formState, setFormState, completed, setCompleted] = useOutletContext();
  const { conditions } = formState;
  const [valid, setValid] = useState({
    speed: true,
    gust: true,
    height: true,
    frequency: true,
  });

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

  // Validates wind speed float on input change
  useEffect(() => {
    if (conditions.wind.speed > 201) {
      setValid((prev) => ({
        ...prev,
        speed: false,
      }));
      return;
    }
    setValid((prev) => ({
      ...prev,
      speed: true,
    }));
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

  // Validates wind gust float on input change
  useEffect(() => {
    if (conditions.wind.gust > 201) {
      setValid((prev) => ({
        ...prev,
        gust: false,
      }));
      return;
    }
    setValid((prev) => ({
      ...prev,
      gust: true,
    }));
  }, [conditions.wind.gust]);

  function handleHeightChange(event) {
    setFormState({
      ...formState,
      conditions: {
        ...formState.conditions,
        [event.target.name]: {
          ...formState.conditions.swell,
          height: Number(event.target.value),
        },
      },
    });
  }

  // Validates swell height on input change
  useEffect(() => {
    if (conditions.swell.height > 50) {
      setValid((prev) => ({
        ...prev,
        height: false,
      }));
      return;
    }
    setValid((prev) => ({
      ...prev,
      height: true,
    }));
  }, [conditions.swell.height]);

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
      setValid((prev) => ({
        ...prev,
        frequency: false,
      }));
      return;
    }
    setValid((prev) => ({
      ...prev,
      frequency: true,
    }));
  }, [conditions.swell.frequency]);

  function nextSection(event) {
    event.preventDefault();

    const allValid = Object.values(valid).every((input) => input === true);
    if (!allValid) {
      console.log('not all valid');
      return;
    }
    window.sessionStorage.setItem(
      'new-session-inputs',
      JSON.stringify(formState)
    );
    setCompleted({
      ...completed,
      conditions: true,
    });
    navigate('/new-session/equipment');
  }

  function previousSection(event) {
    event.preventDefault();
    window.sessionStorage.setItem(
      'new-session-inputs',
      JSON.stringify(formState)
    );
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
            <SessionValidationError
              isVisible={!valid.speed}
              message="Speed must be less than 200mph"
            />
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
            <SessionValidationError
              isVisible={!valid.gust}
              message="Gust speed must be less than 200mph"
            />
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
        <div className="height-frequency">
          <div className="">
            <div>
              <label htmlFor="swell-height">Swell Height (m)</label>
              <input
                onChange={handleHeightChange}
                name="swell"
                id="swell-height"
                type="number"
                value={conditions.swell.height}
                min={0}
                max={50}
              />
              <SessionValidationError
                isVisible={!valid.height}
                message="Height must be less than 50 metres"
              />
            </div>
          </div>
          <div>
            <label htmlFor="swell-frequency">Swell Period (second)</label>
            <input
              onChange={handleFrequencyChange}
              name="swell"
              id="swell-frequency"
              type="number"
              value={conditions.swell.frequency}
              min={0}
              max={50}
            />

            <SessionValidationError
              isVisible={!valid.frequency}
              message="Frequency must be less than 50 seconds"
            />
          </div>
        </div>
        <ArrowSlider
          type={'swell'}
          handleDirectionChange={handleDirectionChange}
          degree={conditions.swell.direction}
        />
      </div>
      <div className="next-previous-btns">
        <button onClick={(event) => nextSection(event)}>Next</button>
        <button onClick={(event) => previousSection(event)}>Previous</button>
      </div>
    </div>
  );
}
