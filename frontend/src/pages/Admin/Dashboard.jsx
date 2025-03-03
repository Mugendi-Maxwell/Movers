import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCommentDots,
  FaBoxes,
  FaSignInAlt,
} from "react-icons/fa";
import { getAllBookingsAdmin } from "../../services/adminBookingService";
import { getAllPaymentsAdmin } from "../../services/adminPaymentService";
import { getAllFeedbackAdmin } from "../../services/feedbackService";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsData = await getAllBookingsAdmin();
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }

      try {
        const paymentsData = await getAllPaymentsAdmin();
        setPayments(paymentsData);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }

      try {
        const feedbackData = await getAllFeedbackAdmin();
        setFeedback(feedbackData);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.grid}>
        
        {/* Manage Bookings */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <FaCalendarAlt /> Total Bookings
          </h2>
          <p style={styles.cardNumber}>{bookings.length}</p>
          <Link to="/admin/move-bookings">
            <button style={styles.button}>Manage Bookings</button>
          </Link>
        </div>

        {/* View Payments */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <FaMoneyBillWave /> Total Payments
          </h2>
          <p style={styles.cardNumber}>{payments.length}</p>
          <Link to="/admin/payments">
            <button style={styles.button}>View Payments</button>
          </Link>
        </div>

        {/* View Feedbacks */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <FaCommentDots /> Total Feedbacks
          </h2>
          <p style={styles.cardNumber}>{feedback.length}</p>
          <Link to="/admin/feedback">
            <button style={styles.button}>View Feedbacks</button>
          </Link>
        </div>

        {/* Inventory */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <FaBoxes /> Inventory
          </h2>
          <p style={styles.cardNumber}>{inventory.length}</p>
          <Link to="/admin/inventory">
            <button style={styles.button}>View Inventory</button>
          </Link>
        </div>

        {/* Login Link */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>
            <FaSignInAlt /> Login
          </h2>
          <Link to="/login">
            <button style={styles.button}>Go to Login</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#000000", // Black
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#00BFFF", // Neon Blue
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#222222", // Charcoal
    color: "#FFFFFF", // White text
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0, 191, 255, 0.5)", // Neon Blue Glow
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  cardNumber: {
    fontSize: "30px",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#00BFFF", // Neon Blue
  },
  button: {
    backgroundColor: "#00BFFF", // Neon Blue
    color: "#000000", // Black text
    padding: "10px 15px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
  },
  buttonHover: {
    backgroundColor: "#009ACD", // Slightly darker blue
    transform: "scale(1.05)",
  },
};

// Button hover effect
styles.button[":hover"] = styles.buttonHover;

export default Dashboard;
