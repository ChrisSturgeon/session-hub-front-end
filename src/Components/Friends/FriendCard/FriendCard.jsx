import './FriendCard.css';
import { Link } from 'react-router-dom';

export default function FriendCard({ friendData }) {
  const profileURL = `/profile/${friendData.name}`;
  return (
    <Link
      to={profileURL}
      state={{ profileData: friendData }}
      className="friend-card"
    >
      <div className="profile-img"></div>
      <div>{friendData.name}</div>
    </Link>
  );
}
