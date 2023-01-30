import { APIURL } from '../../../api';

export const AllUsersLoader = async () => {
  const url = `${APIURL}/users/`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
    },
  });

  if (response.status === 404) {
    throw new Response('Not Found', { status: 404 });
  }

  const data = await response.json();
  const users = data.data;

  return {
    users,
  };
};
