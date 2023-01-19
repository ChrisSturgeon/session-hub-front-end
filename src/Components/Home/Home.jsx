import { useContext } from 'react';
import { UserContext } from '../../App';

export default function Home() {
  const user = useContext(UserContext);

  return (
    <div>
      <p>I'm the home test page for {user.username}</p>
      <p>Feed goes here</p>
    </div>
  );
}
