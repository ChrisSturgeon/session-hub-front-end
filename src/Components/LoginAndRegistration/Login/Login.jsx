import './Login.css';
import FlipCard from '../LoginFlipCard/Flipcard';
import Surfer from '../../../images/ripping.jpeg';

export default function Login({ toggleAuth }) {
  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${Surfer})`, backgroundSize: 'cover' }}
    >
      <div className="sidebar">
        <h1>Session Hub</h1>
        <p>
          Welcome to Session Hub! A site to post about your latest surfing,
          windsurfing, and kitesurfing sessions. Connect with your friends to
          follow their activities, plan meet ups and discuss gear.
        </p>
        <div className="flip-card-wrapper">
          <FlipCard toggleAuth={toggleAuth} />
        </div>
      </div>
    </div>
  );
}
