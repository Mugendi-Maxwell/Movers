import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Adjust path if needed
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login data to backend (adjust URL as needed)
      await axios.post("https://your-api.com/login", { email, password });
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to log in.");
    }
  };

  // Handle logout by deleting user from backend
  const handleLogout = async () => {
    try {
      // Send a DELETE request to remove user (adjust URL as needed)
      await axios.delete("https://your-api.com/user");
      alert("User deleted and logged out!");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out.");
    }
  };

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />

      {/* Login Page Container */}
      <div className="login-page">
        <div className="login-container">
          <h1>Log in</h1>
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example.email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Field */}
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="password-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter at least 8+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Toggle Password Button (Eye Icon) */}
              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button type="submit" className="login-btn">
              Log in
            </button>
          </form>

          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
