import React, { useState } from 'react';

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const postData = {
      username: inputs.username,
      password: inputs.password,
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
        console.log(responseData);
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
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          value={inputs.username}
          onChange={handleChange}
        />
        <label htmlFor="password"></label>
        <input
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
