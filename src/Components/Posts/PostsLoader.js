import { APIURL } from '../../api';

export const PostsLoader = async (params) => {
  const response = await fetch(`${APIURL}/sessions/user/${params.userID}`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
    },
  });

  if (response.status === 404) {
    throw new Response('Not Found', { status: 404 });
  }

  const data = await response.json();
  const overviews = data.data;

  return {
    overviews,
  };
};
