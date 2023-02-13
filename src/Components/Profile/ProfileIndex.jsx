import './ProfileIndex.css';
import { Outlet, useLoaderData } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileNav from './ProfileNav/ProfileNav';
import useCheckMobileScreen from '../../hooks/useWindowDimensions';

export default function ProfileIndex() {
  const { profile } = useLoaderData();
  const isMobile = useCheckMobileScreen();

  return (
    <div className="profile-wrapper">
      <ProfileHeader profile={profile} />
      <div className="profile-layout">
        <div className="sticky-column">
          {isMobile ? <ProfileNav /> : <ProfileSidebar />}
        </div>
        <div className="main-column">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
