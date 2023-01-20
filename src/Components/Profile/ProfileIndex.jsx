import './ProfileIndex.css';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileNav from './ProfileNav/ProfileNav';

export default function ProfileIndex() {
  const { profile } = useLoaderData();
  const user = useContext(UserContext);
  const { userID } = useParams();

  return (
    <div className="page-column-wrapper">
      <div className="profile">
        <ProfileHeader profile={profile} />

        {user.ID === userID && <div>This is your profile!</div>}

        <ProfileNav />
        <Outlet />
      </div>
    </div>
  );
}
