import './LatestUsers.css';
import useFetch from '../../hooks/useFetch';
import { APIURL } from '../../api';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

export default function LatestUsers() {
  const { isLoading, APIData: latestUsers } = useFetch(
    `${APIURL}/users/latest`
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="latest-users">
      <h3>New Users</h3>
      <div className="latest-users-list">
        {latestUsers.data.map((user) => {
          const profileURL = `/profile/${user._id}/posts`;
          return (
            <div className="new-users" key={user._id}>
              <Link className="new-user-link" to={profileURL}>
                {user.thumbURL ? (
                  <img src={user.thumbURL} alt="user-"></img>
                ) : (
                  <div className="placeholder-img"></div>
                )}
                <div>{user.username}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
