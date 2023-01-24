import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Button from '../../../Button/Button';
import './About.css';

const expandDown = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.4,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.2,
      },
      opacity: {
        duration: 0.1,
      },
    },
  },
};

export default function About({ details, setDetails, setEquipment }) {
  const today = new Date();
  const weekAgo = new Date(today - 60000 * 60 * 24 * 7);
  const [expanded, setExpanded] = useState(true);

  const expand = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  const addInputs = (event) => {
    event.preventDefault();
    setExpanded(false);
  };

  const handleDetailsChange = (event) => {
    // Clear equipment state if change of sport
    if (event.target.name === 'sport') {
      setEquipment({
        board: '',
        sail: '',
        kite: '',
        wing: '',
      });
    }

    setDetails((prevDetails) => ({
      ...prevDetails,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <div className="section-header">
        <button
          className={expanded ? 'active' : null}
          onClick={(event) => expand(event)}
        >
          <span>
            <div>About</div>
            <div className={expanded ? 'arrow-expanded' : 'arrow'}>
              <ion-icon name="arrow-down-outline"></ion-icon>
            </div>
          </span>
        </button>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {expanded && (
          <motion.div
            className="new-post-about"
            initial={expandDown.initial}
            animate={expandDown.animate}
            exit={expandDown.exit}
          >
            <div className={expanded ? 'about-inputs active' : 'about-inputs'}>
              <div className="date">
                <label htmlFor="date">Session Date</label>
                <input
                  name="date"
                  id="date"
                  type="date"
                  min={weekAgo.toISOString().slice(0, 10)}
                  max={today.toISOString().slice(0, 10)}
                  onChange={handleDetailsChange}
                  value={details.date}
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
                    onChange={handleDetailsChange}
                    defaultChecked={details.sport === 'surfing'}
                  ></input>
                  <label htmlFor="surfing">Surfing</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="sport"
                    id="windsurfing"
                    value="windsurfing"
                    onChange={handleDetailsChange}
                    defaultChecked={details.sport === 'windsurfing'}
                  ></input>
                  <label htmlFor="windsurfing">Windsurfing</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="sport"
                    id="kitesurfing"
                    value="kitesurfing"
                    onChange={handleDetailsChange}
                    defaultChecked={details.sport === 'kitesurfing'}
                  ></input>
                  <label htmlFor="kitesurfing">Kitesurfing</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="sport"
                    id="wingsurfing"
                    value="wingsurfing"
                    onChange={handleDetailsChange}
                    defaultChecked={details.sport === 'wingsurfing'}
                  ></input>
                  <label htmlFor="wingsurfing">Wingsurfing</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="sport"
                    id="paddleboarding"
                    value="paddleboarding"
                    onChange={handleDetailsChange}
                    defaultChecked={details.sport === 'paddleboarding'}
                  ></input>
                  <label htmlFor="paddleboarding">Paddleboarding</label>
                </div>
              </fieldset>

              <button
                className="add-section-btn"
                onClick={(event) => addInputs(event)}
              >
                Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
