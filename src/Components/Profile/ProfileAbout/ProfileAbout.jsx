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
      <div className="favourite-sports">
        {profile.sports.length > 0 ? (
          <ul>
            {profile.sports.map((sport) => {
              const capitalised =
                sport.slice(0, 1).toUpperCase() + sport.slice(1);
              return <li key={sport}>{capitalised}</li>;
            })}
          </ul>
        ) : (
          <div>{profile.username} hasn't added any favourite sports yet.</div>
        )}
      </div>
      <h3>Bio</h3>
      {profile.bio ? (
        <div dangerouslySetInnerHTML={{ __html: sanitize(profile.bio) }}></div>
      ) : (
        <div>{profile.username} hasn't written a bio yet.</div>
      )}
    </main>
  );
}
