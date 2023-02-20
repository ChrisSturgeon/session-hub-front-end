import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <>
      <p>Oops! An error has occured!</p>
      <Link to="/">Please click here</Link>
    </>
  );
}
