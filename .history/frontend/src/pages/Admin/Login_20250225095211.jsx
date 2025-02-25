import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Adjust the path as needed

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Optionally store a token or admin details if provided
        navigate("/admin/dashboard"); // Redirect to the admin dashboard
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="admin-login-container">
      <h1 className="admin-login-title">Admin Login</h1>
      {error && <div className="admin-login-error">{error}</div>}
      <form onSubmit={handleSubmit} className="admin-login-form">
        <label htmlFor="email" className="admin-login-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="admin-login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="admin-login-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="admin-login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="admin-login-button">
          Login
        </Button>
      </form>
      
      {/* Embedded CSS for the admin login page */}
      <style>{`
        .admin-login-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 2rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .admin-login-title {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 2rem;
          font-weight: bold;
          color: #2d3748;
        }
        .admin-login-error {
          margin-bottom: 1rem;
          padding: 0.5rem;
          background-color: #fed7d7;
          color: #c53030;
          border-radius: 4px;
          text-align: center;
        }
        .admin-login-form {
          display: flex;
          flex-direction: column;
        }
        .admin-login-label {
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #4a5568;
        }
        .admin-login-input {
          margin-bottom: 1rem;
          padding: 0.75rem;
          border: 1px solid #cbd5e0;
          border-radius: 4px;
          font-size: 1rem;
        }
        .admin-login-button {
          padding: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          background-color: #3182ce;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .admin-login-button:hover {
          background-color: #2b6cb0;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
