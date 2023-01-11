import './LoginForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../Button/Button';

export default function LoginForm({ toggleAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Updates username state on input change
  const handleUsernameChange = (event) => {
    setUsername((prev) => event.target.value);
  };

  // Updates password state on input change
  const handlePasswordChange = (event) => {
    setPassword((prev) => event.target.value);
  };

  // Logs in user if valid credentials or retrieves error json for warnings
  const onSubmit = async (event, exampleAccount = false) => {
    event.preventDefault();

    const postData = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.status === 200) {
        const responseData = await response.json();
        window.localStorage.setItem('JWT', responseData.data.token);
        toggleAuth();
        navigate('/');
      }

      if (response.status === 403) {
        const data = await response.json();
        console.log(data);
      }

      if (response.status === 404) {
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fills inputs with example account credentials
  const completeExampleCredentials = () => {
    setUsername('Example User');
    setPassword('SessionHub2023!');
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="login-form">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button label="Log In" />
      </form>
      <Button
        onClick={completeExampleCredentials}
        label="Use Example Account"
      />
    </div>
  );
}
