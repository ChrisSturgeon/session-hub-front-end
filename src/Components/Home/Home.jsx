import './Home.css';
import useCheckMobileScreen from '../../hooks/useWindowDimensions';

// Component imports
import Feed from '../Feed/Feed';
import HomeSidebar from './HomeSidebar/HomeSidebar';

export default function Home() {
  const isMobile = useCheckMobileScreen();

  return (
    <div className="home-wrapper">
      <main className="home-main">
        <div className="sticky-column">{!isMobile && <HomeSidebar />}</div>
        <div className="feed-wrapper">
          <Feed />
        </div>
      </main>
    </div>
  );
}
