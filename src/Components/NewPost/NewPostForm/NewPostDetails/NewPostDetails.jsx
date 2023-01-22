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

export default function NewPostDetails({ handleDetailsChange }) {
  const [sport, setSport] = useState(null);
  const [equipment, setEquipment] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  console.log(today);

  const handleSelectSport = (event) => {
    setSport((prev) => event.target.value);
    setEquipment({});
    console.log(sport);
    handleDetailsChange(event);
  };

  const onEquipmentChange = (event) => {
    setEquipment((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const logEquipment = (event) => {
    event.preventDefault();
    handleDetailsChange('gear', equipment);
  };

  return (
    <div className="new-post-details">
      <button onClick={logEquipment}>Log equipment</button>
      <label htmlFor="date">When</label>
      <input
        name="date"
        id="date"
        type="date"
        onChange={handleDetailsChange}
        value={today}
      ></input>
      <fieldset className="sport">
        <legend>Sport</legend>
        <div>
          <input
            type="radio"
            name="sport"
            id="surfing"
            value="surfing"
            onChange={handleSelectSport}
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
        <AnimatePresence mode="wait">
          {sport === 'surfing' && (
            <motion.div
              initial={expandDown.initial}
              animate={expandDown.animate}
              exit={expandDown.exit}
              key="surfing"
              className="equipment"
            >
              <label>Board</label>
              <input type="text"></input>
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
                onChange={onEquipmentChange}
                type="text"
              ></input>
              <label>Sail</label>
              <input type="text"></input>
            </motion.div>
          )}
        </AnimatePresence>
      </fieldset>
    </div>
  );
}
