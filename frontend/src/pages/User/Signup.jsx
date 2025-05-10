import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import './signup.css';
import { signup } from '../../services/authService';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const signupData = { name, email, password, role };

    try {
      await signup(signupData);
      setSuccess("Signup successful! Redirecting...");
      
      setTimeout(() => {
        if (role.toLowerCase() === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/login');
        }
      }, 2000); // Redirect after 2 seconds
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
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="example.email@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Enter at least 8+ characters" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label htmlFor="role">Role</label>
          <input id="role" type="text" placeholder="e.g., Admin or User" value={role} onChange={(e) => setRole(e.target.value)} />

          <button type="submit">Sign up</button>
        </form>
      </div>
      <div className="signup-illustration">
        <UserPlusIcon className="signup-icon" />
      </div>
    </div>
  );
};

export default Signup;
