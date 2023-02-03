import './ProfileHeader.css';

export default function ProfileHeader({ profile }) {
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
      </div>
    </div>
  );
}
