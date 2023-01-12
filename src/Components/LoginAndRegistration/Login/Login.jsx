import './Login.css';
import React, { useState } from 'react';
import FlipCard from '../LoginFlipCard/Flipcard';
import Surfers from '../../../images/landing-page-surfers.jpeg';
import PartyWave from '../../../images/ripping.jpeg';

export default function Login({ toggleAuth }) {
  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${PartyWave})`, backgroundSize: 'cover' }}
    >
      {/* <header>
        <h1>Session Hub</h1>
      </header> */}
      <div></div>

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

      {/* <main>
        <div className="hero-wrapper">
          <div className="hero">
            <p>
              Welcome to Session Hub! A site to post about your latest surfing,
              windsurfing, and kitesurfing sessions. Connect with your friends
              to follow their activities, plan meet ups and discuss gear.
            </p>
          </div>
          <div className="flip-card-wrapper">
            <FlipCard toggleAuth={toggleAuth} />
          </div>
        </div>
      </main>
      <footer>
        <div className="custom-shape-divider-bottom-1673444937">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </footer> */}
    </div>
  );
}
