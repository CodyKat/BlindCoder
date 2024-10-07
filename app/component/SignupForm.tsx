'use client'

import React, { useState } from 'react';
import "./signupForm.css"
import { SignUpFormData } from '../types/signupFormData';

const SignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    password: '',
    organization: '',
    email: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    // API 요청 로직 추가

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        setResponseMessage(data.message);
    } catch (error) {
        console.error('Error:', error);
        setResponseMessage('Error submitting form');
        }
    };
    

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder='required'
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
              placeholder='required'
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="organization">School/Company</label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder='optional'
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='required'
              required
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default SignUpForm;
