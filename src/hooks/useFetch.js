import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [APIData, setAPIData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
          },
        });
        console.log(response.status);

        // Fetch successfull
        if (response.status === 200) {
          const responseData = await response.json();
          console.log(responseData);
          setAPIData(responseData);
          setIsLoading(false);
        }

        // Fetch unsuccessful - user is not authenticated
        if (response.status === 401) {
          setIsLoading(false);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    fetchData();
  }, [url]);
  return { isLoading, isAuthenticated, APIData, error };
};

export default useFetch;
