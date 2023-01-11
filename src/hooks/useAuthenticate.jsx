import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthenticate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Checks if JWT is present in localStorage and checks validity if so.
    const checkAuthentication = async () => {
      const token = window.localStorage.getItem('JWT');

      if (token === null) {
        setIsAuthenticated(false);
        setIsLoading(false);
        navigate('/login', {
          state: { message: 'You must login to view this page' },
        });
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
            setIsLoading(false);
          }

          // User is not authenticated so redirect them to the login page with message prompt
          if (response.status === 401) {
            setIsAuthenticated(false);
            setIsLoading(false);
            navigate('/login');
          }
        } catch (err) {
          console.log(err);
          setError(error);
        }
      }
    };
    checkAuthentication();
  }, []);
  return { isLoading, isAuthenticated, setIsAuthenticated, error };
};

export default useAuthenticate;
