import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Equipment.css';

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

export default function Equipment({ details, equipment, setEquipment }) {
  const [expanded, setExpanded] = useState(false);
  const { sport } = details;

  const expand = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  const handleEquipmentChange = (event) => {
    setEquipment((prevDetails) => ({
      ...prevDetails,
      [event.target.name]: event.target.value,
    }));
  };

  const addInputs = (event) => {
    event.preventDefault();
    setExpanded(false);
  };

  return (
    <>
      <div className="section-header">
        <button onClick={(event) => expand(event)}>
          <span>
            <div>Equipment</div>
            <div className={expanded ? 'arrow-expanded' : 'arrow'}>
              <ion-icon name="arrow-down-outline"></ion-icon>
            </div>
          </span>
        </button>
      </div>
      <AnimatePresence mode="wait">
        {expanded && (
          <motion.div
            className={'new-post-equipment'}
            initial={expandDown.initial}
            animate={expandDown.animate}
            exit={expandDown.exit}
          >
            <div className="equipment-inputs">
              <AnimatePresence mode="wait" initial={false}>
                {sport === 'surfing' && (
                  <motion.div
                    initial={expandDown.initial}
                    animate={expandDown.animate}
                    exit={expandDown.exit}
                    key="surfing"
                    className="equipment"
                  >
                    <label>Board</label>
                    <input
                      onChange={handleEquipmentChange}
                      name="board"
                      type="text"
                    ></input>
                  </motion.div>
                )}
                {sport === 'windsurfing' && (
                  <motion.div
                    initial={expandDown.initial}
                    animate={expandDown.animate}
                    exit={expandDown.exit}
                    key="windsurfing"
                    className="equipment"
                  >
                    <label htmlFor="board">Board</label>
                    <input
                      id="board"
                      name="board"
                      onChange={handleEquipmentChange}
                      type="text"
                    ></input>
                    <label htmlFor="board">Sail</label>
                    <input
                      id="sail"
                      name="sail"
                      onChange={handleEquipmentChange}
                      type="text"
                    ></input>
                  </motion.div>
                )}
                {sport === 'kitesurfing' && (
                  <motion.div
                    initial={expandDown.initial}
                    animate={expandDown.animate}
                    exit={expandDown.exit}
                    key="kitesurfing"
                    className="equipment"
                  >
                    <label htmlFor="board">Board</label>
                    <input
                      id="board"
                      name="board"
                      onChange={handleEquipmentChange}
                      type="text"
                    ></input>
                    <label htmlFor="board">Kite</label>
                    <input
                      id="kite"
                      name="kite"
                      onChange={handleEquipmentChange}
                      type="text"
                    ></input>
                  </motion.div>
                )}
                {sport === 'wingsurfing' && (
                  <motion.div
                    initial={expandDown.initial}
                    animate={expandDown.animate}
                    exit={expandDown.exit}
                    key="wingsurfing"
                    className="equipment"
                  >
                    <label htmlFor="board">Board</label>
                    <input
                      id="board"
                      name="board"
                      onChange={handleEquipmentChange}
                      type="text"
                    ></input>
                    <label htmlFor="board">Wing</label>
                    <input
                      id="wing"
                      name="wing"
                      onChange={handleEquipmentChange}
                      type="text"
                    ></input>
                  </motion.div>
                )}
                {sport === 'paddleboarding' && (
                  <motion.div
                    initial={expandDown.initial}
                    animate={expandDown.animate}
                    exit={expandDown.exit}
                    key="paddleboarding"
                    className="equipment"
                  >
                    <label htmlFor="board">Board</label>
                    <input
                      id="board"
                      name="board"
                      onChange={handleEquipmentChange}
                      type="text"
                    ></input>
                  </motion.div>
                )}
              </AnimatePresence>
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
