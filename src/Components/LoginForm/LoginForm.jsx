import './LoginForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ toggleAuth }) {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event, guest = false) => {
    event.preventDefault();

    const postData = {};

    if (guest) {
      postData.username = 'guest';
      postData.password = 'Hendrixasdfasdf1212!';
    } else {
      postData.username = inputs.username;
      postData.password = inputs.password;
    }

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
        console.log(responseData);
        console.log('Logged in...');
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
  return (
    <div>
      <form onSubmit={onSubmit} className="login-form">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={inputs.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
        <button onClick={() => onSubmit(true)}>Guest Account</button>
      </form>
    </div>
  );
}
