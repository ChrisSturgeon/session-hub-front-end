import './RequestsList.css';
import { useContext } from 'react';
import { RequestContext } from '../../../App';
import FriendRequestReply from '../FriendRequestReply/FriendRequestReply';
export default function RequestsList() {
  const [friendRequests, decrementRequests] = useContext(RequestContext);

  if (friendRequests.count === 0) {
    return <div>You don't have any friends requests at the moment</div>;
  }

  return (
    <div>
      {friendRequests && <p>You have {friendRequests.count} requests</p>}
      <button onClick={decrementRequests}>Decrement</button>
      <p>I'm the friends requests page</p>

      {friendRequests.count > 0 ? (
        <div className="requests-column">
          {friendRequests.requests.map((request) => {
            return (
              <FriendRequestReply
                key={request._id}
                requestData={request}
                decrementRequests={decrementRequests}
              />
            );
          })}
        </div>
      ) : (
        'no rquest'
      )}
    </div>

    // <div>I'm the friends request page</div>
  );
}
