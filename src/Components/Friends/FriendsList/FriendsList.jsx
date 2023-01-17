import './FriendsList.css';
import useFetch from '../../../hooks/useFetch';
import Spinner from '../../Spinner/Spinner';
import FriendCard from '../FriendCard/FriendCard';

export default function FriendsList({ userID }) {
  const URL = `http://localhost:3000/api/friends/${userID}/all`;
  const { isLoading, APIData, error } = useFetch(URL);
  return (
    <div className="friends-list">
      <h2>Your friends</h2>
      {isLoading && <Spinner />}
      {APIData && (
        <div className="column">
          {APIData.data.map((friend) => {
            return <FriendCard key={friend.name} friendData={friend} />;
          })}
        </div>
      )}
    </div>
  );
}
