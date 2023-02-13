import './FriendRequestReply.css';
import { Link } from 'react-router-dom';
import { APIURL } from '../../../api';

export default function FriendRequestReply({ requestData, decrementRequests }) {
  const requester = requestData.requesterDetails[0];
  const profileURL = `/profile/${requester._id}/posts`;

  async function handleResponse(event, hasAccepted) {
    event.preventDefault();
    const url = `${APIURL}/friends/request/${requestData._id}`;
    let fetchMethod;
    if (hasAccepted) {
      fetchMethod = 'PUT';
    } else {
      fetchMethod = 'DELETE';
    }

    try {
      const response = await fetch(url, {
        method: fetchMethod,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
        },
      });

      if (response.status === 200) {
        console.log('Success');
        decrementRequests();
        return;
      }

      console.log('An error has occured');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="request-card">
      <Link to={profileURL} className="upper">
        {requester.thumbURL ? (
          <img src={requester.thumbURL} alt="profile-pic"></img>
        ) : (
          <div className="profile-img"></div>
        )}
        <div>{requester.username} wants to be your friend!</div>
      </Link>
      <div className="forms">
        <form onSubmit={(event) => handleResponse(event, true)}>
          <button className="accept">Accept</button>
        </form>
        <form onSubmit={(event) => handleResponse(event, false)}>
          <button className="decline">Decline</button>
        </form>
      </div>
    </div>
  );
}
