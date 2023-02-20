import './FriendsList.css';
import FriendCard from '../FriendCard/FriendCard';
import { useLoaderData } from 'react-router-dom';
import { APIURL } from '../../../api';

export default function FriendsList() {
  const { friends } = useLoaderData();

  if (friends.length === 0) {
    return (
      <div className="friends-list">
        <div className="column">
          <div>This user doesn't have any friends yet!</div>
        </div>
      </div>
    );
  }
  return (
    <div className="friends-list">
      {friends && (
        <div className="column">
          {friends.map((friend) => {
            return (
              <FriendCard
                key={friend.friends._id}
                friendData={friend.friends}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export const FriendsListLoader = async (params) => {
  const response = await fetch(`${APIURL}/friends/${params.userID}/all`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
    },
  });

  if (response.status === 404) {
    throw new Response('Not Found', { status: 404 });
  }

  const data = await response.json();
  const friends = data.data;

  return {
    friends,
  };
};
