import { warning } from '@remix-run/router';
import './Conditions.css';

export default function Conditions({ type, conditions }) {
  const { wind, swell } = conditions;
  const windArrowDirection = `rotate(${-45 + wind.direction}deg)`;
  const swellArrowDirection = `rotate(${-45 + swell.direction}deg)`;

  if (type === 'wind') {
    return (
      <div className="conditions-detail">
        <h4>Wind</h4>
        <div className="arrow-wrapper">
          <ion-icon
            style={{ transform: windArrowDirection }}
            name="navigate"
          ></ion-icon>
        </div>
        <div>{wind.speed} mph avg.</div>
        <div>{wind.gust} mph gust</div>
      </div>
    );
  }

  if (type === 'swell') {
    return (
      <div className="conditions-detail">
        <h4>Swell</h4>
        <div className="arrow-wrapper">
          <ion-icon
            style={{ transform: swellArrowDirection }}
            name="navigate"
          ></ion-icon>
        </div>
        <div>{swell.height}m height</div>
        <div>{swell.frequency}/s frequency</div>
      </div>
    );
  }
}
