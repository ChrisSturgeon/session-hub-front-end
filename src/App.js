import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Hook imports
import useAuthenticate from './hooks/useAuthenticate';

// Component imports
import Login from './Components/LoginAndRegistration/Login/Login';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Friends from './Components/Friends/Friends';
import ProfileIndex from './Components/Profile/ProfileIndex';
import AllUsers from './Components/Users/AllUsers/AllUsers';
import RequestsList from './Components/Friends/RequestsList/RequestsList';
import FriendsList, {
  FriendsListLoader,
} from './Components/Friends/FriendsList/FriendsList';
import Spinner from './Components/Spinner/Spinner';
import NavBarWrapper from './Components/Navigation/NavBarWrapper/NavBarWrapper';
import Posts from './Components/Posts/Posts';

// Router Loader Function Imports
import { ProfileLoader } from './Components/Profile/ProfileLoader';
import ProfileAbout from './Components/Profile/ProfileAbout/ProfileAbout';
import { AllUsersLoader } from './Components/Users/AllUsers/AllUsersLoader';
import { PostsLoader } from './Components/Posts/PostsLoader';
import SessionDetail from './Components/SessionDetail/SessionDetail';
import { SessionDetailLoader } from './Components/SessionDetail/SessionDetailLoader';

// New Session Imports
import SessionForm from './Components/SessionForm/SessionForm';
import About from './Components/SessionForm/About/About';
import Location from './Components/SessionForm/Location/Location';
import Conditions from './Components/SessionForm/Conditions/Conditions';
import Equipment from './Components/SessionForm/Equipment/Equipment';
import WrapUp from './Components/SessionForm/WrapUp/WrapUp';
import useFriendRequest from './hooks/useFriendRequests';
import ProfileEdit from './Components/Profile/ProfileEdit/ProfileEdit';
import SessionEdit from './Components/SessionEdit/SessionEdit';
import AboutEdit from './Components/SessionEdit/AboutEdit/AboutEdit';
import ConditionsEdit from './Components/SessionEdit/ConditionsEdit/ConditionsEdit';
import EquipmentEdit from './Components/SessionEdit/EquipmentEdit/EquipmentEdit';
import WrapUpEdit from './Components/SessionEdit/WrapUpEdit/WrapUpEdit';
import LocationEdit from './Components/SessionEdit/LocationEdit/LocationEdit';

// Context Exports
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

  const { friendRequests, decrementRequests } = useFriendRequest();

  // Toggles authentication state for logging out
  function toggleAuth() {
    setIsAuthenticated(!isAuthenticated);
  }

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
          path: 'login',
          element: <Login />,
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
              loader: async () => {
                return AllUsersLoader();
              },
            },
          ],
        },
        {
          path: 'new-session',
          element: <SessionForm />,
          children: [
            {
              path: 'about',
              element: <About />,
            },
            {
              path: 'location',
              element: <Location />,
            },
            {
              path: 'conditions',
              element: <Conditions />,
            },
            {
              path: 'equipment',
              element: <Equipment />,
            },
            {
              path: 'wrap-up',
              element: <WrapUp />,
            },
          ],
        },
        {
          path: 'profile/:userID/edit',
          element: <ProfileEdit />,
          loader: async ({ params }) => {
            return ProfileLoader(params);
          },
        },
        {
          path: 'profile/:userID',
          element: <ProfileIndex />,
          loader: async ({ params }) => {
            return ProfileLoader(params);
          },
          children: [
            {
              path: 'about',
              element: <ProfileAbout />,
              loader: async ({ params }) => {
                return ProfileLoader(params);
              },
            },
            {
              path: 'friends',
              element: <FriendsList />,
              loader: async ({ params }) => {
                return FriendsListLoader(params);
              },
            },
            {
              path: 'posts',
              element: <Posts />,
              loader: async ({ params }) => {
                return PostsLoader(params);
              },
            },
          ],
        },
        {
          path: 'session/:sessionID/edit',
          element: <SessionEdit />,
          loader: async ({ params }) => {
            return SessionDetailLoader(params);
          },
          children: [
            {
              path: 'about',
              element: <AboutEdit />,
            },
            {
              path: 'location',
              element: <LocationEdit />,
            },
            {
              path: 'conditions',
              element: <ConditionsEdit />,
            },
            {
              path: 'equipment',
              element: <EquipmentEdit />,
            },
            {
              path: 'wrap-up',
              element: <WrapUpEdit />,
            },
          ],
        },
        {
          path: 'session/:sessionID',
          element: <SessionDetail />,
          loader: async ({ params }) => {
            return SessionDetailLoader(params);
          },
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  if (isAuthenticating) {
    return (
      <div className="spinner-wrapper">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login toggleAuth={toggleAuth} setUser={setUser} />;
  }

  if (isAuthenticated && user) {
    return (
      <UserContext.Provider value={user}>
        <RequestContext.Provider value={[friendRequests, decrementRequests]}>
          <div className="app-layout">
            <RouterProvider router={router} />
          </div>
        </RequestContext.Provider>
      </UserContext.Provider>
    );
  }
}

export default App;
