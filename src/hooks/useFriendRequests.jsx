import { useState, useEffect } from 'react';

const useFriendRequest = () => {
  const [friendRequests, setFriendRequests] = useState({
    requests: null,
    count: null,
  });
  const [error, setError] = useState('');

  const decrementRequests = () => {
    setFriendRequests({ ...friendRequests, count: friendRequests.count - 1 });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/friends/request/all',
          {
            method: 'GET',
            headers: {
              Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
            },
          }
        );

        if (response.status === 200) {
          const responseData = await response.json();
          setFriendRequests(responseData.data);
          if (responseData.data) {
            setFriendRequests({
              requests: responseData.data,
              count: responseData.data.length,
            });
          } else {
            setFriendRequests({
              requests: null,
              count: 0,
            });
          }
        }

        if (response.status === 401) {
          setError('You must login first');
        }
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    fetchData();
  }, [friendRequests.count]);
  return {
    friendRequests,
    setFriendRequests,
    decrementRequests,
    error,
  };
};

export default useFriendRequest;
