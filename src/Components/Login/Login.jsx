import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useLocation } from 'react-router-dom';

export default function Login({ toggleAuth }) {
  const location = useLocation();

  return (
    <div>
      <p>I'm the login page</p>
      <LoginForm toggleAuth={toggleAuth} />
    </div>
  );
}
