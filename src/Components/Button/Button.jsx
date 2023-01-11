import { motion } from 'framer-motion';
import './Button.css';
export default function Button({ label, onClick }) {
  return (
    <motion.button
      className="btn"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      {label}
    </motion.button>
  );
}
