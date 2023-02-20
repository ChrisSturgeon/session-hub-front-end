import './UserCard.css';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../../../App';
import { useEffect } from 'react';
import FriendRequestForm from '../../Friends/FriendRequestForm/FriendRequestForm';

export default function UserCard({ userData }) {
  const profileURL = `/profile/${userData._id}/posts`;
  const { ID, friends, pendingRequests } = useContext(UserContext);
  const [isPendingRequest, setIsPendingRequest] = useState(null);
  const [isFriend, setIsFriend] = useState(null);

  // Checks if ID is existing or pending friend of logged-in user.
  useEffect(() => {
    if (pendingRequests) {
      const pendingRequest = pendingRequests.find((request) => {
        return request.requestee.ID.toString() === userData._id;
      });

      if (pendingRequest) {
        setIsPendingRequest(true);
        return;
      }
    }

    if (friends) {
      const usersFriend = friends.find((friend) => {
        return friend.ID === userData._id;
      });
      if (usersFriend) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
    }
  }, [friends, userData._id, pendingRequests]);

  // Remove self from list
  if (ID === userData._id) {
    return null;
  }

  // A pending friend request exists
  if (isPendingRequest) {
    return (
      <Link to={profileURL} className="user-card">
        <div className="left">
          {userData.thumbURL ? (
            <img src={userData.thumbURL} alt="profile-pic"></img>
          ) : (
            <div className="profile-img"></div>
          )}
        </div>
        <div className="right">
          <div className="username">{userData.username}</div>
          <button className="pending-request" disabled={true}>
            Request Pending
          </button>
        </div>
      </Link>
    );
  }

  if (isFriend === true) {
    return (
      <Link to={profileURL} className="user-card">
        <div className="left">
          {userData.thumbURL ? (
            <img src={userData.thumbURL} alt="profile-pic"></img>
          ) : (
            <div className="profile-img"></div>
          )}
        </div>
        <div className="right">
          <div className="username">{userData.username}</div>
          <button className="pending-request" disabled={true}>
            Your Friend
          </button>
        </div>
      </Link>
    );
  }

  // Postpone render until friends/pending friend check completed
  if (isFriend === false) {
    return (
      <Link to={profileURL} className="user-card">
        <div className="left">
          {userData.thumbURL ? (
            <img src={userData.thumbURL} alt="profile-pic"></img>
          ) : (
            <div className="profile-img"></div>
          )}
        </div>
        <div className="right">
          <div className="username">{userData.username}</div>
          {!isFriend && <FriendRequestForm userID={userData._id} />}
        </div>
      </Link>
    );
  }
}
