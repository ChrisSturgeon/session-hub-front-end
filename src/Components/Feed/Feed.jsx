import './Feed.css';
import { useState, useContext } from 'react';
import { UserContext } from '../../App';
import useFetch from '../../hooks/useFetch';
import SessionCard from '../SessionCard/SessionCard';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function Feed() {
  const user = useContext(UserContext);
  const url = `http://localhost:3000/api/sessions/feed/${user.ID}`;
  const { isLoading, APIData: data, error } = useFetch(url);

  if (isLoading) {
    return <Spinner />;
  }

  if (data.data) {
    return (
      <div className="feed-wrapper">
        <h3>Your feed</h3>
        <div className="feed-column">
          {data.data.map((session) => {
            return (
              <SessionCard
                key={session._id}
                session={session.post[0]}
                feed={true}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
