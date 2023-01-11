import './Flipcard.css';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { motion } from 'framer-motion';
import Button from '../../Button/Button';

export default function FlipCard({ toggleAuth }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div>
      <div className={!flipped ? 'flip-card' : 'flip-card flipped'}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h2>Log In</h2>
            <LoginForm toggleAuth={toggleAuth} />
            <Button label="Create Account" onClick={handleFlip} />
          </div>
          <div className="flip-card-back">
            <h2>Create Account</h2>
            <RegisterForm handleFlip={handleFlip} />
            <Button label="Back to Log In" onClick={handleFlip} />
          </div>
        </div>
      </div>
    </div>
  );
}
