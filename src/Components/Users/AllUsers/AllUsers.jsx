import './AllUsers.css';
import UserCard from '../UserCard/UserCard';

import { useLoaderData } from 'react-router-dom';
export default function AllUsers() {
  const { users } = useLoaderData();

  return (
    <div className="all-users">
      {users.map((user) => {
        return <UserCard key={user._id} userData={user} />;
      })}
    </div>
  );
}
