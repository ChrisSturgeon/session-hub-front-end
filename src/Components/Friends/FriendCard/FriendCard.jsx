import './FriendCard.css';
import { Link } from 'react-router-dom';

export default function FriendCard({ friendData }) {
  const profileURL = `/profile/${friendData._id}/posts`;
  return (
    <Link to={profileURL} className="friend-card">
      {friendData.thumbURL ? (
        <img src={friendData.thumbURL} alt="display-pic"></img>
      ) : (
        <div className="profile-dummy-img"></div>
      )}

      <div>{friendData.username}</div>
    </Link>
  );
}
