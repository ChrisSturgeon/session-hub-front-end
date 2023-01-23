import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useState } from 'react';
import './Description.css';

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
        duration: 0.1,
      },
    },
  },
};
export default function Description({ description, setDescription }) {
  const [expanded, setExpanded] = useState(false);
  const [characterCount, setCharacterCount] = useState(description.length);

  const expand = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  const addInputs = (event) => {
    event.preventDefault();
    setExpanded(false);
  };
  const onDescriptionChange = (event) => {
    setDescription((prev) => event.target.value);
  };

  // Updates character count after description state change
  useEffect(() => {
    setCharacterCount((prev) => description.length);
  }, [description]);

  return (
    <>
      <div className="section-header">
        <button onClick={(event) => expand(event)}>
          <span>
            <div>Add Description</div>
            <div className={expanded ? 'arrow-expanded' : 'arrow'}>
              <ion-icon name="arrow-down-outline"></ion-icon>
            </div>
          </span>
        </button>
      </div>
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            className="new-post-description"
            initial={expandDown.initial}
            animate={expandDown.animate}
            exit={expandDown.exit}
          >
            <div className="description-inputs">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={onDescriptionChange}
                maxLength={2000}
              ></textarea>
              <span className="character-count">
                {characterCount}/2000 characters
              </span>
            </div>
            <button
              className="add-section-btn"
              onClick={(event) => addInputs(event)}
            >
              Add
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
