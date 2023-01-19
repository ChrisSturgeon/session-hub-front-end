import { Outlet } from 'react-router-dom';
import useCheckMobileScreen from '../../../hooks/useWindowDimensions';

// Component imports
import Navbar from '../Navbar/Navbar';
import MobileTopNav from '../MobileTopNav/MobileTopNav';
import MobileNav from '../MobileNav/MobileNav';

export default function NavBarWrapper({ toggleAuth, setUser }) {
  const isMobile = useCheckMobileScreen();

  // Removes JWT from localStorage, toggles and and set user object to empty
  const logOut = () => {
    window.localStorage.removeItem('JWT');
    toggleAuth();
    setUser(null);
  };

  if (isMobile) {
    return (
      <>
        <MobileTopNav logOut={logOut} />
        <MobileNav />
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <Navbar logOut={logOut} />
        <Outlet />
      </>
    );
  }
}
