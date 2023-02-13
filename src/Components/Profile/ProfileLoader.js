import { APIURL } from '../../api';

export const ProfileLoader = async (params) => {
  const response = await fetch(`${APIURL}/users/profile/${params.userID}`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
    },
  });

  if (response.status === 404) {
    throw new Response('Not Found', { status: 404 });
  }

  const data = await response.json();
  const profile = data.data;

  return {
    profile,
  };
};
