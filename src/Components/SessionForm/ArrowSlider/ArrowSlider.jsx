import './ArrowSlider.css';
import { useState } from 'react';

export default function ArrowSlider() {
  const [degree, setDegree] = useState(180);

  function handleChange(event) {
    setDegree(event.target.value);
  }
  return (
    <div className="arrow-slider">
      <div className="top">
        <div className="compass-symbol north">N</div>
        <div className="compass-symbol south">S</div>
        <div className="north-south"></div>
        <div className="rose">
          <div
            className="arrow-wrapper"
            style={{ transform: `rotate(${degree}deg)` }}
          >
            <ion-icon
              style={{ transform: 'rotate(-45deg)' }}
              name="navigate"
            ></ion-icon>
          </div>
        </div>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="360"
          value={degree}
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
}
