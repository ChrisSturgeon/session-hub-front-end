import { useState, useEffect } from 'react';

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/users/details/',
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
            },
          }
        );
        // Fetch successful
        if (response.status === 200) {
          const responseData = await response.json();
          setUserDetails(responseData.data);
        }

        // Fetch failed
        if (response.status === 404) {
          const responseData = await response.json();
        }
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    fetchData();
  }, []);
  return { userDetails, error };
};

export default useUserDetails;
