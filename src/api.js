export const APIURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEVELOPMENT_URL
    : 'to setup';
