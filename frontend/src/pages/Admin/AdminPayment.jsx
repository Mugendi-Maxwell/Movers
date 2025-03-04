import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPaymentsAdmin } from '../../services/adminPaymentService';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPaymentsAdmin();
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to fetch payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Payments</h1>
      <Link to="/admin/dashboard" style={styles.link}>
        Back to Dashboard
      </Link>
      {loading ? (
        <p style={styles.loading}>Loading payments...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : payments.length === 0 ? (
        <p style={styles.noPayments}>No payments available.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th>ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} style={styles.tableRow}>
                  <td>{payment.id}</td>
                  <td>{payment.user}</td>
                  <td>{payment.amount}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
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
  noPayments: {
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
  tableRow: {
    borderBottom: "1px solid #444444",
    textAlign: "left",
    padding: "10px",
  },
};

export default Payment;
