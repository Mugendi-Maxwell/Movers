import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Login</h1>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="email" style={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

// CSS-in-JS Styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "2rem",
    border: "1px solid #444444", // Darker border
    borderRadius: "8px",
    backgroundColor: "#222222", // Charcoal background
    boxShadow: "0 2px 10px rgba(0, 191, 255, 0.3)", // Neon Blue Glow
    textAlign: "center",
    color: "#FFFFFF", // White text
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#00BFFF", // Neon Blue
    marginBottom: "1.5rem",
  },
  error: {
    marginBottom: "1rem",
    padding: "0.5rem",
    backgroundColor: "#c53030", // Red background for errors
    color: "#ffffff",
    borderRadius: "4px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "left",
  },
  input: {
    marginBottom: "1rem",
    padding: "0.75rem",
    border: "1px solid #00BFFF", // Neon Blue border
    borderRadius: "4px",
    fontSize: "1rem",
    backgroundColor: "#333333", // Dark Gray input background
    color: "#FFFFFF",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    backgroundColor: "#00BFFF", // Neon Blue
    color: "#000000", // Black text
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  buttonHover: {
    backgroundColor: "#0094CC",
  }
};

export default AdminLogin;
