import './LoginForm.css';
import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import ValidationError from '../../ValidationError/ValidationError';

export default function LoginForm({ toggleAuth, setUser, triggerShake }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Valiation & Login error message states
  const [usernameError, setUsernameError] = useState(false);
  const [noUserError, setNoUserError] = useState('');
  const [passwordMissingError, setPasswordMissingError] = useState(false);
  const [incorrectPasswordError, setIncorrectPasswordError] = useState('');

  // Updates username state on input change
  const handleUsernameChange = (event) => {
    setUsername((prev) => event.target.value);
  };

  // Updates password state on input change
  const handlePasswordChange = (event) => {
    setPassword((prev) => event.target.value);
  };

  // Removes 'required' validation messages for input lengths > 0
  useEffect(() => {
    if (password.length) {
      setPasswordMissingError(false);
    }

    if (username.length) {
      setUsernameError(false);
    }
  }, [username, password]);

  // Fills inputs with example account credentials
  const completeExampleCredentials = () => {
    setUsername('Example User');
    setPassword('SessionHub2023!');
  };

  // Logs in user if valid credentials or retrieves error json for validation
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

    // Create object with inputted credentials for fetch POST request
    const postData = {
      username,
      password,
    };

    // Fetch POST method and handle response
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      // Credentials are valid, store JWT and redirect to home page
      if (response.status === 200) {
        const responseData = await response.json();
        window.localStorage.setItem('JWT', responseData.data.token);
        setUser({
          username: responseData.data.username,
          ID: responseData.data.ID,
          profileComplete: responseData.data.ID,
          friends: responseData.data.friends,
          pendingRequests: responseData.data.pendingRequests,
        });
        toggleAuth();
      }

      // Users exists but incorrect password
      if (response.status === 403) {
        triggerShake();
        const data = await response.json();
        setIncorrectPasswordError(data.message);
        return;
      }

      // User does not exist in database
      if (response.status === 404) {
        triggerShake();
        const data = await response.json();
        setNoUserError(data.message);
        return;
      }
    } catch (err) {
      console.log(err);
    }
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
        <ValidationError
          message="Username required"
          isVisible={usernameError}
        />
        <ValidationError
          message="Username does not exist"
          isVisible={noUserError}
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
          isVisible={passwordMissingError}
        />
        <ValidationError
          message="Password incorrect"
          isVisible={incorrectPasswordError}
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
