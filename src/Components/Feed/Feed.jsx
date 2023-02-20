import './Feed.css';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { APIURL } from '../../api';

// Component imports
import SessionCard from '../SessionCard/SessionCard';
import Spinner from '../Spinner/Spinner';

export default function Feed() {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [feedData, setFeedData] = useState(null);

  // Fetches user's feeds posts
  useEffect(() => {
    async function getFeedPosts() {
      try {
        const response = await fetch(`${APIURL}/sessions/feed/${user.ID}`, {
          method: 'GET',
          headers: {
            Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setIsLoading(false);
          setFeedData(data.data);
        } else {
          console.log('Something has gone wrong...');
        }
      } catch (err) {
        console.log(err);
      }
    }
    getFeedPosts();
  }, [user.ID]);

  if (isLoading) {
    return <Spinner />;
  }

  if (feedData) {
    if (feedData.length === 0) {
      return (
        <div className="feed-wrapper">
          <div className="feed-column" style={{ textAlign: 'center' }}>
            Add some friends to start creating a feed!
            <Link className="feed-to-users-link" to="/friends/all-users">
              See all users
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div id="feed" className="feed-wrapper">
        <div className="feed-column">
          {feedData.map((session) => {
            if (session.session[0]) {
              return (
                <SessionCard
                  key={session._id}
                  session={session.session[0]}
                  feed={true}
                  thumbURL={session.thumbURL}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}
