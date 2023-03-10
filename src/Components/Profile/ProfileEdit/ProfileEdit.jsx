import './ProfileEdit.css';
import { useContext, useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import { useEffect } from 'react';
import InputWithCounter from '../../General/InputWithCounter/InputWithCounter';
import { APIURL } from '../../../api';
import { sanitize } from 'dompurify';

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { profile } = useLoaderData();
  const { userID } = useParams();
  const user = useContext(UserContext);
  const [bioCount, setBioCount] = useState(profile.bio.length);

  const [profileState, setProfileState] = useState({
    bio: sanitize(profile.bio),
    sports: profile.sports,
    profileImg: sanitize(profile.imgURL),
  });

  function handleBioAndImgChange(event) {
    setProfileState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  // Updates bio length count
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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const url = `${APIURL}/users/profile/${userID}`;
      const requestBody = JSON.stringify({
        bio: profileState.bio,
        sports: profileState.sports,
        imgURL: profileState.profileImg,
      });

      const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
        body: requestBody,
      });

      if (response.status === 200) {
        navigate(`/profile/${userID}/about`);
      } else {
        const data = await response.json();
        console.log('Something has gone wrong here...', data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (user.ID !== userID) {
    return <div>You don't have permission to edit this profile</div>;
  } else {
    return (
      <div className="profile-edit-wrapper">
        <main>
          <h3>Edit My Profile</h3>
          <form onSubmit={(event) => handleSubmit(event)}>
            <label>Favourite Sports</label>
            <div className="checkboxes">
              <div>
                <input
                  onChange={handleSportChange}
                  id="surfing"
                  type="checkbox"
                  name="surfing"
                  checked={
                    profileState.sports.includes('surfing') ? true : false
                  }
                ></input>
                <label htmlFor="surfing">Surfing</label>
              </div>
              <div>
                <input
                  onChange={handleSportChange}
                  id="windsurfing"
                  type="checkbox"
                  name="windsurfing"
                  checked={
                    profileState.sports.includes('windsurfing') ? true : false
                  }
                ></input>
                <label htmlFor="windsurfing">Windsurfing</label>
              </div>
              <div>
                <input
                  onChange={handleSportChange}
                  id="kitesurfing"
                  type="checkbox"
                  name="kitesurfing"
                  checked={
                    profileState.sports.includes('kitesurfing') ? true : false
                  }
                ></input>
                <label htmlFor="kitesurfing">Kitesurfing</label>
              </div>
              <div>
                <input
                  onChange={handleSportChange}
                  id="wingsurfing"
                  type="checkbox"
                  name="wingsurfing"
                  checked={
                    profileState.sports.includes('wingsurfing') ? true : false
                  }
                ></input>
                <label htmlFor="wingsurfing">Wingsurfing</label>
              </div>
              <div>
                <input
                  onChange={handleSportChange}
                  id="paddleboarding"
                  type="checkbox"
                  name="paddleboarding"
                  checked={
                    profileState.sports.includes('paddleboarding')
                      ? true
                      : false
                  }
                ></input>
                <label htmlFor="paddleboarding">Paddleboarding</label>
              </div>
            </div>
            <hr></hr>
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              value={profileState.bio}
              onChange={handleBioAndImgChange}
              maxLength={2000}
            ></textarea>
            <div className="bio-count">{bioCount} / 2000</div>
            <hr></hr>
            <label htmlFor="img-URL">Profile Image URL</label>
            <InputWithCounter
              id="img-url"
              name="profileImg"
              minLength={0}
              maxLength={1000}
              onChange={handleBioAndImgChange}
              value={profileState.profileImg}
            />
            <div className="buttons">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/profile/${userID}/about`);
                }}
              >
                Cancel
              </button>
              <button type="submit">Update Profile</button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}
