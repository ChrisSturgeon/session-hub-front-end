import './ProfileEdit.css';
import { useContext, useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import { UserContext } from '../../../App';
import { useEffect } from 'react';
import InputWithCounter from '../../General/InputWithCounter/InputWithCounter';

export default function ProfileEdit() {
  const { profile } = useLoaderData();
  const { userID } = useParams();
  const user = useContext(UserContext);
  const [bioCount, setBioCount] = useState(profile.bio.length);

  const [profileState, setProfileState] = useState({
    bio: profile.bio,
    sports: profile.sports,
    profileImg: profile.imgURL,
  });

  function handleBioAndImgChange(event) {
    setProfileState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    setBioCount((prev) => profileState.bio.length);
  }, [profileState.bio]);

  function handleSportChange(event) {
    const isFavourite = profileState.sports.includes(event.target.name);
    if (isFavourite) {
      const sports = [...profileState.sports];
      const removed = sports.filter((sport) => sport !== event.target.name);
      setProfileState((prev) => ({
        ...prev,
        sports: removed,
      }));
    } else {
      const sports = [...profileState.sports];
      sports.push(event.target.name);
      setProfileState((prev) => ({
        ...prev,
        sports: sports,
      }));
    }
  }

  if (user.ID !== userID) {
    return <div>You don't have permission to edit this profile</div>;
  } else {
    return (
      <div className="profile-edit-wrapper">
        <button onClick={() => console.log(profileState)}>Click me</button>
        <main>
          <h3>Edit My Profile</h3>
          <form onSubmit={(event) => handleSubmit(event)}>
            <label>Favourite Sports</label>
            <div className="checkboxes">
              <label htmlFor="surfing">Surfing</label>
              <input
                onChange={handleSportChange}
                id="surfing"
                type="checkbox"
                name="surfing"
                checked={profileState.sports.includes('surfing') ? true : false}
              ></input>
              <label htmlFor="windsurfing">Windsurfing</label>
              <input
                onChange={handleSportChange}
                id="windsurfing"
                type="checkbox"
                name="windsurfing"
                checked={
                  profileState.sports.includes('windsurfing') ? true : false
                }
              ></input>
              <label htmlFor="kitesurfing">Kitesurfing</label>
              <input
                onChange={handleSportChange}
                id="kitesurfing"
                type="checkbox"
                name="kitesurfing"
                checked={
                  profileState.sports.includes('kitesurfing') ? true : false
                }
              ></input>
              <label htmlFor="wingsurfing">Wingsurfing</label>
              <input
                onChange={handleSportChange}
                id="wingsurfing"
                type="checkbox"
                name="wingsurfing"
                checked={
                  profileState.sports.includes('wingsurfing') ? true : false
                }
              ></input>
              <label htmlFor="paddleboarding">Paddleboarding</label>
              <input
                onChange={handleSportChange}
                id="paddleboarding"
                type="checkbox"
                name="paddleboarding"
                checked={
                  profileState.sports.includes('paddleboarding') ? true : false
                }
              ></input>
            </div>
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              value={profileState.bio}
              onChange={handleBioAndImgChange}
              maxLength={2000}
            ></textarea>
            <div>{bioCount} / 2000</div>
            <label htmlFor="img-URL">Profile Image URL</label>
            <InputWithCounter
              id="img-url"
              name="profileImg"
              minLength={0}
              maxLength={1000}
              onChange={handleBioAndImgChange}
              value={profileState.profileImg}
            />
            <button type="submit">Update Profile</button>
          </form>
        </main>
      </div>
    );
  }
}
