import './Home.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import Feed from '../Feed/Feed';
import useCheckMobileScreen from '../../hooks/useWindowDimensions';

export default function Home() {
  const user = useContext(UserContext);
  const isMobile = useCheckMobileScreen();

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
