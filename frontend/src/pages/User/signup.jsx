import React, { useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline'; 
import './signup.css';

const Signup = () => {
  // State for each input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log({
      name,
      email,
      password,
      role,
    });
  };

  return (
    <div className="signup-container">
     
      <div className="signup-form">
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email Field */}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example.email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              id="password"
              type="password"
              placeholder="Enter at least 8+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </div>

          {/* Role Field */}
          <label htmlFor="role">Role</label>
          <input
            id="role"
            type="text"
            placeholder="e.g., Admin or User"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          {/* Submit Button */}
          <button type="submit">Sign in</button>
        </form>
      </div>

      {/* Right side: signup icon (replaces the illustration image) */}
      <div className="signup-illustration">
        <UserPlusIcon className="signup-icon" />
      </div>
    </div>
  );
};

export default Signup;
