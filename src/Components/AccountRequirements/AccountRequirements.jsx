import './AccountRequirements.css';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.5,
      },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: {
        duration: 2,
      },
    },
  },
};

export default function AccountRequirements({ toggleRequirements }) {
  return (
    <AnimatePresence>
      <motion.div
        className="account-requirements"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        exit={fadeIn.exit}
      >
        <span className="form-top-row">
          <h3>Username</h3>
          <button className="close-btn" onClick={toggleRequirements}>
            Close
          </button>
        </span>

        <ul className="username-requirements">
          <li>Min. 3 characters</li>
          <li>Max. 20 characters</li>
        </ul>
        <h3>Password</h3>
        <ul>
          <li>Min. 8 characters</li>
          <li>Min. 1 uppercase character</li>
          <li>Min. 1 uppercase character</li>
          <li>Min. 1 number</li>
          <li>Min. 1 symbol</li>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}
