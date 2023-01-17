import { useState, useEffect } from 'react';
import './AllUsers.css';
import useFetch from '../../../hooks/useFetch';
import UserCard from '../UserCard/UserCard';
import Spinner from '../../Spinner/Spinner';

export default function AllUsers() {
  const { isLoading, APIData, error } = useFetch(
    'http://localhost:3000/api/users/all'
  );

  return (
    <div className="all-users">
      <h1>All users</h1>
      {APIData && (
        <div>
          {APIData.data.map((user) => {
            return <UserCard key={user._id} userData={user} />;
          })}
        </div>
      )}
      {isLoading && <Spinner />}
    </div>
  );
}
