import { useState, useEffect } from 'react';

const useAuthenticate = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Checks if JWT is present in localStorage and checks validity if so.
    const checkAuthentication = async () => {
      const token = window.localStorage.getItem('JWT');

      if (token === null) {
        setIsAuthenticated(false);
        setIsAuthenticating(false);
      } else {
        try {
          // Call authentication API route to verify validity of token
          const response = await fetch(
            'http://localhost:3000/api/users/authenticate',
            {
              method: 'GET',
              headers: {
                Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
              },
            }
          );

          // User is authenticated
          if (response.status === 200) {
            setIsAuthenticated(true);
            setIsAuthenticating(false);
            const responseData = await response.json();
            setUser(responseData.data);
          }

          // User does not exist or is not authenticated so redirect them to the login page with message prompt
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
