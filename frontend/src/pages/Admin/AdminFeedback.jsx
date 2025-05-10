import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllFeedbackAdmin } from '../../services/feedbackService';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getAllFeedbackAdmin();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to fetch feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Feedback</h1>
      
      <Link to="/admin/dashboard" style={styles.link}>
        ← Back to Dashboard
      </Link>

      {loading ? (
        <p style={styles.loading}>Loading feedback...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : feedbacks.length === 0 ? (
        <p style={styles.noFeedback}>No feedback available.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>ID</th>
                <th>User</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={feedback.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td>{feedback.id}</td>
                  <td>{feedback.user}</td>
                  <td>{feedback.message}</td>
                  <td>{new Date(feedback.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// CSS-in-JS Styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#000000", // Black background
    padding: "20px",
    textAlign: "center",
    color: "#FFFFFF", // White text
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#00BFFF", // Neon Blue
    marginBottom: "20px",
  },
  link: {
    color: "#00BFFF",
    fontSize: "18px",
    textDecoration: "none",
    marginBottom: "20px",
    display: "inline-block",
  },
  loading: {
    fontSize: "18px",
    fontStyle: "italic",
  },
  error: {
    color: "#FF4444",
    fontWeight: "bold",
  },
  noFeedback: {
    fontSize: "18px",
    fontStyle: "italic",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#222222", // Charcoal
    color: "#FFFFFF",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "2px 2px 10px rgba(0, 191, 255, 0.5)", // Neon Blue Glow
  },
  tableHeader: {
    backgroundColor: "#333333", // Dark Gray
    color: "#00BFFF", // Neon Blue text
    fontSize: "18px",
    textAlign: "left",
    padding: "12px",
  },
  rowEven: {
    backgroundColor: "#222222", // Charcoal
    borderBottom: "1px solid #444444",
    textAlign: "left",
    padding: "10px",
  },
  rowOdd: {
    backgroundColor: "#333333", // Dark Gray
    borderBottom: "1px solid #444444",
    textAlign: "left",
    padding: "10px",
  },
};

export default ViewFeedback;
