import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './Equipment.css';
import InputWithCounter from '../../../General/InputWithCounter/InputWithCounter';

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
        <button
          className={expanded ? 'active' : null}
          onClick={(event) => expand(event)}
        >
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
            <div
              className={
                expanded ? 'equipment-inputs active' : 'equipment-inputs'
              }
            >
              <AnimatePresence mode="wait" initial={false}>
                {sport === 'surfing' && (
                  <motion.div
                    initial={expandDown.initial}
                    animate={expandDown.animate}
                    exit={expandDown.exit}
                    key="surfing"
                    className="equipment"
                  >
                    <label htmlFor="board">Board</label>
                    <InputWithCounter
                      id={'board'}
                      value={equipment.board}
                      onChange={handleEquipmentChange}
                      placeholder={"e.g. Maluku Quad Fish 6'2"}
                      name={'board'}
                      maxLength={40}
                    />
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
                    <InputWithCounter
                      id={'board'}
                      value={equipment.board}
                      onChange={handleEquipmentChange}
                      placeholder={'e.g. JP Freestyle 93'}
                      name={'board'}
                      maxLength={40}
                    />
                    <label htmlFor="sail">Sail</label>
                    <InputWithCounter
                      id={'sail'}
                      value={equipment.sail}
                      onChange={handleEquipmentChange}
                      placeholder={'e.g. Neilpryde Wizard 5.4m'}
                      name={'sail'}
                      maxLength={40}
                    />
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
                    <InputWithCounter
                      id={'board'}
                      value={equipment.board}
                      onChange={handleEquipmentChange}
                      placeholder={'e.g. Duotone Gambler 142cm'}
                      name={'board'}
                      maxLength={40}
                    />
                    <label htmlFor="board">Kite</label>
                    <InputWithCounter
                      id={'kite'}
                      value={equipment.kite}
                      onChange={handleEquipmentChange}
                      placeholder={'e.g. Dice SLS 12m'}
                      name={'kite'}
                      maxLength={40}
                    />
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
                    <InputWithCounter
                      id={'board'}
                      value={equipment.board}
                      onChange={handleEquipmentChange}
                      placeholder={"e.g. F-One Rocket Surf 4'6"}
                      name={'board'}
                      maxLength={40}
                    />
                    <label htmlFor="board">Wing</label>
                    <InputWithCounter
                      id={'wing'}
                      value={equipment.wing}
                      onChange={handleEquipmentChange}
                      placeholder={'e.g. North Nova 2.5m'}
                      name={'wing'}
                      maxLength={40}
                    />
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
                    <InputWithCounter
                      id={'board'}
                      value={equipment.board}
                      onChange={handleEquipmentChange}
                      placeholder={"e.g. Fantic Fly 10'4"}
                      name={'board'}
                      maxLength={40}
                    />
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
