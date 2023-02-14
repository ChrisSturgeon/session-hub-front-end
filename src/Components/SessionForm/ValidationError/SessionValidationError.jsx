import './SessionValidationError.css';
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
        duration: 0.2,
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.5,
      },
      opacity: {
        duration: 0.2,
      },
    },
  },
};

export default function SessionValidationError({ isVisible, message }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={expandDown.initial}
          animate={expandDown.animate}
          exit={expandDown.exit}
          className="validation-error"
          data-testid="validation-error"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
