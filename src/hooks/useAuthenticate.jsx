import { useState, useEffect } from 'react';
import { APIURL } from '../api';

const useAuthenticate = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = window.localStorage.getItem('JWT');

      if (token === null) {
        setIsAuthenticated(false);
        setIsAuthenticating(false);
      } else {
        try {
          const response = await fetch(`${APIURL}/users/authenticate`, {
            method: 'GET',
            headers: {
              Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
            },
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
            setIsAuthenticating(false);
            const responseData = await response.json();
            setUser(responseData.data);
          }

          if (response.status === 404 || response.status === 401) {
            setIsAuthenticated(false);
            setIsAuthenticating(false);
          }
        } catch (err) {
          console.log(err);
          setError(error);
        }
      }
    };
    checkAuthentication();
  }, [error]);
  return {
    isAuthenticating,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    error,
  };
};

export default useAuthenticate;
