import './Flipcard.css';
import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import Button from '../../Button/Button';
import RegisterStep from '../RegisterStep/RegisterStep';

export default function FlipCard({ toggleAuth }) {
  const [flipped, setFlipped] = useState(false);
  const [shake, setShake] = useState(false);

  // Toggles card flip state
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // Sets time out to trigger div shake to indicate invalid credentials
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
            <div>
              <h2>Log In</h2>
              <LoginForm toggleAuth={toggleAuth} triggerShake={triggerShake} />
            </div>
            <Button
              className="create-btn"
              label="Create Account"
              onClick={handleFlip}
            />
          </div>
          <div className="flip-card-back">
            <div>
              <h2>Create Account</h2>
              <RegisterStep triggerShake={triggerShake} />
            </div>
            <Button label="Log In" onClick={handleFlip} />
          </div>
        </div>
      </div>
    </div>
  );
}
