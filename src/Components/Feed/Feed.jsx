import './Feed.css';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../App';

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
        const response = await fetch(
          `http://localhost:3000/api/sessions/feed/${user.ID}`,
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 200) {
          setIsLoading(false);
          setFeedData(data.data);
        } else {
          console.log(data.message);
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
    return (
      <div id="feed" className="feed-wrapper">
        <div className="feed-column">
          {feedData.map((session) => {
            if (session.post.length) {
              return (
                <SessionCard
                  key={session._id}
                  session={session.post[0]}
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
