'use client';

import React, { useState } from 'react';
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // API 요청 로직 추가

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        setResponseMessage(data.message);

        if (res.ok) {
            // 로그인 성공 시 JWT를 쿠키에 저장하고 리다이렉션
            const redirectTo = new URLSearchParams(window.location.search).get('redirectTo') || '/';
            window.location.href = redirectTo;
        }
    } catch (error) {
        console.error('Error:', error);
        setResponseMessage('Error submitting form');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default LoginForm;