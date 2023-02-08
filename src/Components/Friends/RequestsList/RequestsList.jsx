import './RequestsList.css';
import { useContext } from 'react';
import { RequestContext } from '../../../App';
import FriendRequestReply from '../FriendRequestReply/FriendRequestReply';

export default function RequestsList() {
  const [friendRequests, decrementRequests] = useContext(RequestContext);

  if (friendRequests.count === 0) {
    return (
      <div className="friends-request-wrapper">
        You don't have any friends requests at the moment
      </div>
    );
  }

  return (
    <div className="friends-request-wrapper">
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
  );
}
