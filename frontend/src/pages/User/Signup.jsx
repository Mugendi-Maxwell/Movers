import React, { useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import './signup.css';
// Import the signup function from your authentication service
import { signup } from '../../services/authService';

const Signup = () => {
  // State for each input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Submit handler calls the signup service endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const signupData = {
      name,
      email,
      password,
      role,
    };

    try {
      
      const result = await signup(signupData);
      setSuccess("Signup successful! Please log in.");
      console.log("Signup result:", result);
      // Optionally, redirect the user to the login page here.
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create an account</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
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

          {/* Password Field */}
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
          <button type="submit">Sign up</button>
        </form>
      </div>

      {/* Right side: signup icon */}
      <div className="signup-illustration">
        <UserPlusIcon className="signup-icon" />
      </div>
    </div>
  );
};

export default Signup;
