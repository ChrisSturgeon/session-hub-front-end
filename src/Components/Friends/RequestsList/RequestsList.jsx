import useFetch from '../../../hooks/useFetch';
import Request from '../Request/Request';
import { useContext } from 'react';
import { RequestContext } from '../../../App';

export default function RequestsList({ decrementRequests }) {
  const friendRequests = useContext(RequestContext);

  return (
    <div>
      {friendRequests && <p>You have {friendRequests.count} requests</p>}
      <button onClick={decrementRequests}>Decrement</button>
      <p>I'm the friends requests page</p>

      {friendRequests.count > 0 ? (
        <div>
          {' '}
          {friendRequests.requests.map((request) => {
            return (
              <Request
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
  );
}