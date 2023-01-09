import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import useAuthenticate from '../../hooks/useAuthenticate';
import LoginForm from '../LoginForm/LoginForm';

export default function Home({ isAuthenticated }) {
  // let { isLoading, isAuthenticated, setIsAuthenticated, error } =
  //   useAuthenticate();

  // const toggleAuth = () => {
  //   setIsAuthenticated(!isAuthenticated);
  // };

  if (isAuthenticated === true) {
    return (
      <div>
        <p>You are in...</p>
      </div>
    );
  }
}
