import './Home.css';
import Feed from '../Feed/Feed';
import useCheckMobileScreen from '../../hooks/useWindowDimensions';
import { useState, useContext } from 'react';
import { UserContext } from '../../App';

export default function Home() {
  const isMobile = useCheckMobileScreen();
  const user = useContext(UserContext);

  return (
    <div className="home-wrapper">
      <main className="home-main">
        {!isMobile && <div>Do I dissapear?</div>}
        <div className="feed-wrapper">
          <Feed />
        </div>
      </main>
    </div>
  );
}
