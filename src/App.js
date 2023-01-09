import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useAuthenticate from './hooks/useAuthenticate';
// Page imports
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Navbar from './Navbar/Navbar';

function App() {
  let { isAuthenticated, setIsAuthenticated } = useAuthenticate();

  // Toggles authentication state
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const navigate = useNavigate();

  // Removes JWT from localStorage and navigates user to login page
  const logOut = () => {
    window.localStorage.removeItem('JWT');
    toggleAuth();
    navigate('/login');
  };

  return (
    <div className="App">
      {isAuthenticated && (
        <Navbar isAuthenticated={isAuthenticated} logOut={logOut} />
      )}
      <Routes>
        <Route
          index
          element={<Home isAuthenticated={isAuthenticated} />}
        ></Route>
        <Route path="login" element={<Login toggleAuth={toggleAuth} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
