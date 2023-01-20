export const AllUsersLoader = async () => {
  const url = 'http://localhost:3000/api/users/all';
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
