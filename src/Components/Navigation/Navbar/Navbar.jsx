import './Navbar.css';

export default function Navbar({ isAuthenticated, logOut }) {
  return (
    <nav className="top-nav">
      <h1>Session Hub</h1>
      <button onClick={logOut}>Log Out</button>
    </nav>
  );
}
