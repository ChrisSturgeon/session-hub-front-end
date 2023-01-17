import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useAuthenticate from './hooks/useAuthenticate';

// Component imports
import Login from './Components/LoginAndRegistration/Login/Login';
import Home from './Components/Home/Home';
import Navbar from './Navbar/Navbar';
import NotFound from './Components/NotFound/NotFound';
import useCheckMobileScreen from './hooks/useWindowDimensions';
import MobileNav from './Components/MobileNav/MobileNav';
import Friends from './Components/Friends/Friends';
import NewPost from './Components/NewPost/NewPost';
import Profile from './Components/Profile/Profile';
import MobileTopNav from './Components/MobileTopNav/MobileTopNav';
import AllUsers from './Components/Users/AllUsers/AllUsers';
import RequestsList from './Components/Friends/RequestsList/RequestsList';
import useFriendRequest from './hooks/useFriendRequests';
import useUserDetails from './hooks/useUserDetails';
import FriendsList from './Components/Friends/FriendsList/FriendsList';

// Request notification context
export const RequestContext = React.createContext();
export const UserContext = React.createContext();

function App() {
  const isMobile = useCheckMobileScreen();
  let { isAuthenticated, setIsAuthenticated } = useAuthenticate();
  const { userDetails } = useUserDetails();
  const { friendRequests, decrementRequests } = useFriendRequest();

  // Toggles authentication state
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const navigate = useNavigate();

  // Removes JWT from localStorage and navigates user to login page
  const logOut = () => {
    window.localStorage.removeItem('JWT');
    toggleAuth();
    navigate('/login');
  };

  return (
    <UserContext.Provider value={userDetails}>
      <RequestContext.Provider value={friendRequests}>
        <div className="App">
          {isAuthenticated && isMobile ? (
            <>
              <MobileTopNav logOut={logOut} /> <MobileNav />
            </>
          ) : null}
          {isAuthenticated && !isMobile ? (
            <Navbar isAuthenticated={isAuthenticated} logOut={logOut} />
          ) : null}
          <Routes>
            <Route
              index
              element={<Home isAuthenticated={isAuthenticated} />}
            ></Route>
            <Route
              path="login"
              element={<Login toggleAuth={toggleAuth} />}
            ></Route>
            <Route path="friends" element={<Friends toggleAuth={toggleAuth} />}>
              <Route
                path="requests"
                element={<RequestsList decrementRequests={decrementRequests} />}
              />
              <Route path="all-users" element={<AllUsers />} />
              {userDetails && (
                <Route
                  index
                  element={<FriendsList userID={userDetails._id} />}
                />
              )}
            </Route>
            <Route path="new-post" element={<NewPost />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </RequestContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
