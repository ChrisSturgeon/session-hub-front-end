import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import useAuthenticate from '../../hooks/useAuthenticate';
import LoginForm from '../LoginAndRegistration/LoginForm/LoginForm';

export default function Home({ isAuthenticated }) {
  if (isAuthenticated === true) {
    return (
      <div>
        <p>This is the home page</p>
      </div>
    );
  }
}
