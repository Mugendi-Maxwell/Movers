import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [bookingUserMapping, setBookingUserMapping] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all payments from the admin payments endpoint
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/payments`, {
          headers: { "Content-Type": "application/json" },
        });
        setPayments(res.data);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to fetch payments.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Fetch all bookings to create a mapping from booking_id to user name
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/admin/bookings`, {
          headers: { "Content-Type": "application/json" },
        });
        // Build a mapping from booking id to user name.
        // Assumes that each booking object has a 'user' property or 'user_name' property.
        const mapping = {};
        res.data.forEach((booking) => {
          // Use the 'user' property if available, otherwise try 'user_name'
          mapping[booking.id] = booking.user || booking.user_name || "Unknown";
        });
        setBookingUserMapping(mapping);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Payments</h1>
      <Link to="/admin/dashboard" style={styles.link}>
        ← Back to Dashboard
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
            <thead style={styles.tableHeader}>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} style={styles.tableRow}>
                  <td>{payment.id}</td>
                  <td>
                    {bookingUserMapping[payment.booking_id] ||
                      payment.booking_id}
                  </td>
                  <td>{payment.amount}</td>
                  <td>
                    {payment.created_at
                      ? new Date(payment.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#000000",
    padding: "20px",
    textAlign: "center",
    color: "#FFFFFF",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#00BFFF",
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
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#222222",
    color: "#FFFFFF",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "2px 2px 10px rgba(0, 191, 255, 0.5)",
  },
  tableHeader: {
    backgroundColor: "#333333",
    color: "#00BFFF",
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
