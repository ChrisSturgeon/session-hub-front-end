import './FriendsList.css';
import FriendCard from '../FriendCard/FriendCard';
import { useLoaderData } from 'react-router-dom';

export default function FriendsList() {
  const { friends } = useLoaderData();
  return (
    <div className="friends-list">
      {friends && (
        <div className="column">
          {friends.map((friends) => {
            return <FriendCard key={friends.name} friendData={friends} />;
          })}
        </div>
      )}
    </div>
  );
}

export const FriendsListLoader = async (params) => {
  const response = await fetch(
    `http://localhost:3000/api/friends/${params.userID}/all`,
    {
      method: 'GET',
      headers: {
        Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
      },
    }
  );

  if (response.status === 404) {
    throw new Response('Not Found', { status: 404 });
  }

  const data = await response.json();
  const friends = data.data;

  return {
    friends,
  };
};
