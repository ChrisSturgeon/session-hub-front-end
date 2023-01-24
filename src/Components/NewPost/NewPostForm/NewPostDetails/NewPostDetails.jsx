import './NewPostDetails.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function NewPostDetails({
  details,
  handleDetailsChange,
  setEquipment,
}) {
  const [sport, setSport] = useState('surfing');
  const today = new Date();
  const weekAgo = new Date(today - 60000 * 60 * 24 * 7);

  const handleSelectSport = (event) => {
    setSport((prev) => event.target.value);
    setEquipment({});
    handleDetailsChange(event);
  };

  const handleEquipmentChange = (event) => {
    setEquipment((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="new-post-details">

      <fieldset className="sport">
        <legend>Sport</legend>
        <div>
          <input
            type="radio"
            name="sport"
            id="surfing"
            value="surfing"
            onChange={handleSelectSport}
            defaultChecked={true}
          ></input>
          <label htmlFor="surfing">Surfing</label>
        </div>
        <div>
          <input
            type="radio"
            name="sport"
            id="windsurfing"
            value="windsurfing"
            onChange={handleSelectSport}
          ></input>
          <label htmlFor="windsurfing">Windsurfing</label>
        </div>
        <div>
          <input
            type="radio"
            name="sport"
            id="kitesurfing"
            value="kitesurfing"
            onChange={handleSelectSport}
          ></input>
          <label htmlFor="kitesurfing">Kitesurfing</label>
        </div>
        <div>
          <input
            type="radio"
            name="sport"
            id="wingsurfing"
            value="wingsurfing"
            onChange={handleSelectSport}
          ></input>
          <label htmlFor="wingsurfing">Wingsurfing</label>
        </div>
        <div>
          <input
            type="radio"
            name="sport"
            id="paddleboarding"
            value="paddleboarding"
            onChange={handleSelectSport}
          ></input>
          <label htmlFor="paddleboarding">Paddleboarding</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipment</legend>
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
      </fieldset>
    </div>
  );
}
