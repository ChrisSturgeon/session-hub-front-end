import { useContext } from 'react';
import { UserContext } from '../../App';

export default function Home({ isAuthenticated }) {
  const userDetails = useContext(UserContext);
  if (isAuthenticated === true && userDetails) {
    return (
      <div>
        <p>This is the home page for {userDetails.username}</p>
        {!userDetails.profileComplete && (
          <div>You need to complete your profile</div>
        )}
      </div>
    );
  }
}
