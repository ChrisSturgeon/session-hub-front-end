import './FriendRequestReply.css';
import { Link } from 'react-router-dom';

export default function FriendRequestReply({ requestData, decrementRequests }) {
  const responseURL = `http://localhost:3000/api/friends/request/${requestData._id}/response`;
  const requester = requestData.requesterDetails[0];
  const profileURL = `/profile/${requester._id}/posts`;

  const handleSubmit = (reply) => (event) => {
    event.preventDefault();

    // Define response function
    const giveReply = async (reply) => {
      try {
        const response = await fetch(responseURL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
          },
          body: JSON.stringify({
            accepted: reply.toString(),
          }),
        });

        if (response.status === 200) {
          console.log('Response successfully submitted!');
          decrementRequests();
        }

        if (response.status === 404) {
          console.log('The user who sent this request no longer exists');
        }

        if (response.status === 400) {
          console.log('Something has gone wrong...');
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Invoke with response
    giveReply(reply);
  };

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
        <form onSubmit={handleSubmit(true)}>
          <button className="accept">Accept</button>
        </form>
        <form onSubmit={handleSubmit(false)}>
          <button className="decline">Decline</button>
        </form>
      </div>
    </div>
  );
}
