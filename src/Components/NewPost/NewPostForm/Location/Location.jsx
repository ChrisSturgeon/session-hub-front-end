import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Location.css';
import Map from '../../Map/Map';

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
        duration: 0.3,
      },
      opacity: {
        duration: 0.5,
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
        duration: 0.2,
      },
    },
  },
};

export default function Location({ location, setLocation }) {
  const [expanded, setExpanded] = useState(false);

  const expand = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  const addInputs = (event) => {
    event.preventDefault();
    setExpanded(false);
  };

  const handleLocationChange = (event) => {
    setLocation((prevDetails) => ({
      ...prevDetails,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCoordsChange = (coordinates) => {
    setLocation((prevDetails) => ({
      ...prevDetails,
      coords: coordinates,
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
            <div>Location</div>
            <div className={expanded ? 'arrow-expanded' : 'arrow'}>
              <ion-icon name="arrow-down-outline"></ion-icon>
            </div>
          </span>
        </button>
      </div>
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            className="new-post-location"
            initial={expandDown.initial}
            animate={expandDown.animate}
            exit={expandDown.exit}
          >
            <div
              className={
                expanded ? 'location-inputs active' : 'location-inputs'
              }
            >
              <div className="location-name">
                <label htmlFor="location-name">Location Name</label>
                <input
                  id="location-name"
                  name="name"
                  type="text"
                  value={location.name}
                  onChange={handleLocationChange}
                  placeholder="e.g. Polzeath "
                ></input>
              </div>
              <Map
                location={location}
                handleCoordsChange={handleCoordsChange}
              />

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
