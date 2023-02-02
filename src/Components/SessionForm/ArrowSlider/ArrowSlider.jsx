import './ArrowSlider.css';

export default function ArrowSlider({ type, handleDirectionChange, degree }) {
  return (
    <div className="arrow-slider-wrapper">
      <div className="arrow-slider">
        <div className="top">
          <div className="north-south"></div>
          <div className="east-west"></div>
          <div className="compass-symbol north">N</div>
          <div className="compass-symbol south">S</div>
          <div className="compass-symbol east">E</div>
          <div className="compass-symbol west">W</div>
          <div className="rose">
            <div
              className="arrow-wrapper"
              style={{ transform: `rotate(${degree}deg) rotate(180deg)` }}
            >
              <ion-icon
                style={{ transform: 'rotate(-45deg)' }}
                name="navigate"
              ></ion-icon>
            </div>
          </div>
        </div>
        <div className="bottom">
          <label>Direction</label>
          <input
            name={type}
            type="range"
            min="0"
            max="360"
            value={degree}
            onChange={handleDirectionChange}
          ></input>
        </div>
      </div>
    </div>
  );
}
