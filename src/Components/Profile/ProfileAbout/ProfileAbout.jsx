import './ProfileAbout.css';
import { useLoaderData } from 'react-router-dom';
import format from 'date-fns/format';
import { sanitize } from 'dompurify';

export default function ProfileAbout() {
  const { profile } = useLoaderData();
  const joinedDate = format(new Date(profile.joined), 'dd MMM yyyy');
  return (
    <main className="profile-about">
      <div className="joined">Member since {joinedDate}</div>
      <h3>Favourite Sports</h3>
      <ul className="favourite-sports">
        {profile.sports.map((sport) => {
          const capitalised = sport.slice(0, 1).toUpperCase() + sport.slice(1);
          return <li key={sport}>{capitalised}</li>;
        })}
      </ul>
      <h3>Bio</h3>
      <div dangerouslySetInnerHTML={{ __html: sanitize(profile.bio) }}></div>
    </main>
  );
}
