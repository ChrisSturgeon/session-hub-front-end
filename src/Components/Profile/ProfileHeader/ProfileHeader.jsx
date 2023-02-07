import './ProfileHeader.css';
import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../../../App';

export default function ProfileHeader({ profile }) {
  const { userID } = useParams();
  const user = useContext(UserContext);

  return (
    <div className="profile-header">
      {profile.imgURL ? (
        <img src={profile.imgURL} alt="profile" className="profile-pic"></img>
      ) : (
        <div className="profile-pic"></div>
      )}
      <div className="filler-box"></div>

      <div className="username">
        <h1>{profile.username}</h1>

        {userID === user.ID && (
          <Link to="edit">
            <span>
              <ion-icon name="brush-outline"></ion-icon>Edit my profile
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
