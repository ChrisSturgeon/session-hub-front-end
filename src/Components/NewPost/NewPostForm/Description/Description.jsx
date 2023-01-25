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
        <button
          className={expanded ? 'active' : null}
          onClick={(event) => expand(event)}
        >
          <span>
            <div>Wrap Up</div>
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
            <div
              className={
                expanded ? 'description-inputs active' : 'description-inputs'
              }
            >
              <label htmlFor="description">Wrap Up</label>
              <textarea
                id="description"
                value={description}
                onChange={onDescriptionChange}
                maxLength={450}
                placeholder={'A brief summary of your time on the water...'}
              ></textarea>
              <span className="character-count">
                {characterCount}/450 characters
              </span>
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
