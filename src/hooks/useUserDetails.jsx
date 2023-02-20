import { useState, useEffect } from 'react';
import { APIURL } from '../api';

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${APIURL}users/details/`, {
          method: 'GET',
          headers: {
            Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setUserDetails(data.data);
        }

        if (response.status === 404) {
          const data = await response.json();
          console.log(data);
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
