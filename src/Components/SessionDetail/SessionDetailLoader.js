export const SessionDetailLoader = async (params) => {
  const url = `http://localhost:3000/api/sessions/${params.sessionID}`;
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
  const session = data.data;

  return {
    session,
  };
};
