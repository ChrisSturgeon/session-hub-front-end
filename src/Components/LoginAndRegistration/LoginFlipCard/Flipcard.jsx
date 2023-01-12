import './Flipcard.css';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import { motion } from 'framer-motion';
import Button from '../../Button/Button';

export default function FlipCard({ toggleAuth }) {
  const [flipped, setFlipped] = useState(false);
  const [shake, setShake] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const triggerShake = () => {
    setShake(!shake);
    setTimeout(() => {
      setShake(!setShake);
    }, 2000);
  };

  return (
    <div className={!shake ? '' : 'shake'}>
      <div className={!flipped ? 'flip-card' : 'flip-card flipped'}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h2>Log In</h2>
            <LoginForm toggleAuth={toggleAuth} triggerShake={triggerShake} />
            <Button
              className="create-btn"
              label="Create Account"
              onClick={handleFlip}
            />
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
