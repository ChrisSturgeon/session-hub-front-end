import { useState, useEffect } from 'react';
import Button from '../../Button/Button';
import './RegisterForm.css';
import ValidationError from '../../ValidationError/ValidationError';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      opacity: {
        duration: 0.25,
      },
    },
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.25,
      },
    },
  },
};

export default function RegisterForm({
  toggleRequirements,
  toggleSuccess,
  triggerShake,
}) {
  const [inputs, setInputs] = useState({
    username: '',
    password1: '',
    password2: '',
  });

  // Valiation & Register error message states
  const [usernameError, setUsernameError] = useState(false);
  const [shortUsername, setShortUsername] = useState(false);
  const [usernameExists, setUsernameExists] = useState('');
  const [passwordMissingError, setPasswordMissingError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  // Updates credentials state on input change
  const handleChange = (event) => {
    setInputs((inputs) => {
      return { ...inputs, [event.target.name]: event.target.value };
    });
  };

  // Removes 'required' validation messages for input lengths > 0
  useEffect(() => {
    if (inputs.password1.length && inputs.password2.length) {
      setPasswordMissingError(false);
    }
    if (inputs.username.length) {
      setUsernameError(false);
    }

    if (inputs.username.length >= 3) {
      setShortUsername(false);
    }

    if (inputs.password1 === inputs.password2) {
      setPasswordMatchError(false);
    }
  }, [inputs]);

  // Validate inputs and fetch POST method to create new user
  const onSubmit = async (event) => {
    event.preventDefault();
    // Validate inputs
    !inputs.username.length ? setUsernameError(true) : setUsernameError(false);
    !inputs.password1.length || !inputs.password2.length
      ? setPasswordMissingError(true)
      : setPasswordMissingError(false);

    if (
      !inputs.username.length ||
      !inputs.password1.length ||
      !inputs.password2.length
    ) {
      triggerShake();
      return;
    }

    if (inputs.username.length < 3) {
      triggerShake();
      setShortUsername(true);
      return;
    }

    if (inputs.password1 !== inputs.password2) {
      setPasswordMatchError(true);
      triggerShake();
      return;
    }

    const userData = {
      username: inputs.username,
      password: inputs.password1,
    };

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Show success message
      if (response.status === 200) {
        toggleSuccess();
      }

      // Username already exists
      if (response.status === 409) {
        const data = await response.json();
        triggerShake();
        setUsernameExists(data.message);
        return;
      }

      // Password does not meet requirements
      if (response.status === 400) {
        const data = await response.json();

        if (data.password) {
          setInvalidPassword(data.password.msg);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.form
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      exit={fadeIn.exit}
      onSubmit={onSubmit}
      className="register-form"
    >
      <span className="form-top-row">
        <label>Username</label>
        <button className="open-btn" onClick={toggleRequirements}>
          View requirements
        </button>
      </span>
      <input
        type="text"
        value={inputs.username}
        name="username"
        onChange={handleChange}
        maxLength="20"
      ></input>
      <ValidationError message="Username required" isVisible={usernameError} />
      <ValidationError
        message={'Must be at least 3 characters'}
        isVisible={shortUsername}
      />
      <ValidationError message={usernameExists} isVisible={usernameExists} />
      <label>Password</label>
      <input
        type="password"
        value={inputs.password1}
        name="password1"
        onChange={handleChange}
      ></input>
      <label>Repeat Password</label>
      <input
        type="password"
        value={inputs.password2}
        name="password2"
        onChange={handleChange}
      ></input>
      <ValidationError
        message="Password required"
        isVisible={passwordMissingError}
      />
      <ValidationError
        message="Passwords do not match"
        isVisible={passwordMatchError}
      />
      <ValidationError
        message="Invalid - see requirements"
        isVisible={invalidPassword}
      />
      <Button label="Create Account"></Button>
    </motion.form>
  );
}
