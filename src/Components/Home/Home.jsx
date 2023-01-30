import './Home.css';
import Feed from '../Feed/Feed';
import useCheckMobileScreen from '../../hooks/useWindowDimensions';

export default function Home() {
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
