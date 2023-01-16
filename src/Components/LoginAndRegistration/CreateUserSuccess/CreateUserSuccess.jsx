import './CreateUserSuccess.css';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.25,
      },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.25,
      },
    },
  },
};

export default function CreateUserSuccess() {
  return (
    <motion.div
      className="create-user-success"
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      exit={fadeIn.exit}
    >
      <div className="success-tick">
        <ion-icon name="checkmark-circle-outline"></ion-icon>
      </div>
      <div className="succcess-message">Account Created</div>
    </motion.div>
  );
}
