import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import useAuthenticate from './hooks/useAuthenticate';

// Component imports
import Login from './Components/LoginAndRegistration/Login/Login';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Friends from './Components/Friends/Friends';
import NewPost from './Components/NewPost/NewPost';
import Profile, { ProfileLoader } from './Components/Profile/Profile';
import AllUsers from './Components/Users/AllUsers/AllUsers';
import RequestsList from './Components/Friends/RequestsList/RequestsList';
import FriendsList, {
  FriendsListLoader,
} from './Components/Friends/FriendsList/FriendsList';
import Spinner from './Components/Spinner/Spinner';
import NavBarWrapper from './Components/Navigation/NavBarWrapper/NavBarWrapper';

// Hook imports

// Request notification context
export const RequestContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const {
    isAuthenticating,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  } = useAuthenticate();

  // Toggles authentication state
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavBarWrapper toggleAuth={toggleAuth} setUser={setUser} />,
      children: [
        {
          path: '/',
          element: <Home user={user} />,
        },
        {
          // TODO - Change this to show you are already logged in
          path: 'login',
          element: <Login />,
        },
        {
          path: 'new-post',
          element: <NewPost />,
        },
        {
          path: 'friends',
          element: <Friends />,
          children: [
            {
              path: ':userID',
              element: <FriendsList />,
              loader: async ({ params }) => {
                return FriendsListLoader(params);
              },
            },
            {
              path: 'requests',
              element: <RequestsList />,
            },
            {
              path: 'all-users',
              element: <AllUsers />,
            },
          ],
        },
        {
          path: 'profile/:userID',
          element: <Profile />,
          loader: async ({ params }) => {
            return ProfileLoader(params);
          },
          children: [
            {
              path: 'friends',
              element: <FriendsList />,
              loader: async ({ params }) => {
                return FriendsListLoader(params);
              },
            },
          ],
        },

        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  if (isAuthenticating) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Login toggleAuth={toggleAuth} setUser={setUser} />;
  }

  if (isAuthenticated && user) {
    return (
      <UserContext.Provider value={user}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    );
  }
}

export default App;
