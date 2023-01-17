import { useContext } from 'react';
import { UserContext } from '../../App';

export default function Profile() {
  const userDetails = useContext(UserContext);
  return <div>{userDetails && <h2>{userDetails.username}</h2>}</div>;
}
