import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { UserContext } from '../../App';
import InputWithCounter from '../General/InputWithCounter/InputWithCounter';

export default function Home() {
  const user = useContext(UserContext);

  return (
    <div>
      <p>I'm the home test page for {user.username}</p>
      <p>Feed goes here</p>
      <InputWithCounter max={50} />
    </div>
  );
}
