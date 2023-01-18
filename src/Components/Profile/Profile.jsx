import './Profile.css';
import { useLocation } from 'react-router-dom';

import ProfileHeader from './ProfileHeader/ProfileHeader';

export default function Profile() {
  const location = useLocation();
  const { profileData } = location.state;

  return (
    <div className="page-column-wrapper">
      <div className="profile">
        <ProfileHeader profileData={profileData} />
      </div>
    </div>
  );
}
