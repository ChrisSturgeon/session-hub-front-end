import './LoginForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../Button/Button';
import ValidationError from '../../ValidationError/ValidationError';

export default function LoginForm({ toggleAuth, triggerShake }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [noUserError, setNoUserError] = useState(false);
  const [passwordMissingError, setPasswordMissingError] = useState(false);
  const [incorrectPasswordError, setIncorrectPasswordError] = useState(false);
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

    // Check inputs are not empty
    !username.length ? setUsernameError(true) : setUsernameError(false);
    !password.length
      ? setPasswordMissingError(true)
      : setPasswordMissingError(false);

    if (!username.length || !password.length) {
      triggerShake();
      return;
    }

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
        <ValidationError message="Username required" visible={usernameError} />
        <ValidationError
          message="Username does not exist"
          visible={noUserError}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <ValidationError
          message="Password required"
          visible={passwordMissingError}
        />
        <ValidationError
          message="Password incorrect"
          visible={incorrectPasswordError}
        />
        <Button label="Log In" />
      </form>
      <div>
        <Button
          onClick={completeExampleCredentials}
          label="Use Example Account"
          id="example-account-btn"
        />
      </div>
    </div>
  );
}
