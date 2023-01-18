import './ProfileHeader.css';

export default function ProfileHeader({ profileData }) {
  return (
    <div className="profile-header">
      <div className="profile-pic"></div>
      <h1>{profileData.name}</h1>
    </div>
  );
}
