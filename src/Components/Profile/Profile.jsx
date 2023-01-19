import './Profile.css';
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';

import ProfileHeader from './ProfileHeader/ProfileHeader';

export default function Profile() {
  const { profile } = useLoaderData();

  return (
    <div className="page-column-wrapper">
      <div className="profile">
        {/* <ProfileHeader profileData={profileData} /> */}
        <div>I'm the profile of {profile.username} </div>
        <Link to="friends">View friends</Link>
        <Outlet />
      </div>
    </div>
  );
}

export const ProfileLoader = async (params) => {
  const response = await fetch(
    `http://localhost:3000/api/users/profile/${params.userID}`,
    {
      method: 'GET',
      headers: {
        Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
      },
    }
  );

  if (response.status === 404) {
    throw new Response('Not Found', { status: 404 });
  }

  const data = await response.json();
  const profile = data.data;

  return {
    profile,
  };
};
