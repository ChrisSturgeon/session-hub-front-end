import './ProfileHeader.css';

export default function ProfileHeader({ profile }) {
  return (
    <div className="profile-header">
      <div className="profile-pic"></div>
      <h1>{profile.username}</h1>
    </div>
  );
}
