import React, { useState } from "react";
import Navbar from "./Navbar"; // Adjust path if needed
import { login, logout } from "../../services/authService";
import "./Login.css";

const Login = () => {
  // State for input fields and messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // Call the login service function with role set to "user"
      const response = await login({ email, password, role: "user" });
      setSuccess("Logged in successfully!");
      console.log("Login response:", response);
      // Optionally: store auth token and redirect the user
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to log in.");
    }
  };

  // Handle logout by calling the logout service function
  const handleLogout = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await logout("user");
      setSuccess("Logged out successfully!");
      console.log("Logout response:", response);
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to log out.");
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
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
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
              {/* Toggle Password Button */}
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
