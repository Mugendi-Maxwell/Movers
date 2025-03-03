import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MoveBookings = () => {
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [paidBookingIds, setPaidBookingIds] = useState(new Set());
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/bookings`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      setBookings(res.data);
    })
    .catch((err) => {
      console.error("Error fetching bookings:", err);
      setError("Error fetching bookings.");
    });
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/payments`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      const bookingIds = new Set(res.data.map((payment) => payment.booking_id));
      setPaidBookingIds(bookingIds);
    })
    .catch((err) => {
      console.error("Error fetching payments:", err);
    });
  }, []);

  const handleConfirmMove = async (bookingId) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/admin/bookings/${bookingId}/confirm`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Confirm move response:", response.data);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, status: "Confirmed" } : booking
        )
      );
    } catch (err) {
      console.error("Error confirming move:", err.response || err);
      alert("Error confirming move. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Manage Move Bookings</h1>
      {error && <p style={styles.error}>{error}</p>}
      {bookings.length === 0 ? (
        <p style={styles.noBookings}>No bookings found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>ID</th>
              <th>User ID</th>
              <th>Move Type</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Move Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} style={styles.tableRow}>
                <td>{booking.id}</td>
                <td>{booking.user_id}</td>
                <td>{booking.move_type}</td>
                <td>{booking.pickup_location}</td>
                <td>{booking.dropoff_location}</td>
                <td>{booking.move_date ? new Date(booking.move_date).toLocaleString() : "-"}</td>
                <td>{booking.total_price}</td>
                <td>{booking.status}</td>
                <td>{booking.created_at ? new Date(booking.created_at).toLocaleString() : "-"}</td>
                <td>
                  {paidBookingIds.has(booking.id) && booking.status.toLowerCase() === "pending" ? (
                    <button onClick={() => handleConfirmMove(booking.id)} style={styles.button}>
                      Confirm Move
                    </button>
                  ) : (
                    <span style={styles.noPayment}>No Payment</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  error: {
    color: "#FF0000",
    fontWeight: "bold",
  },
  noBookings: {
    fontSize: "18px",
    fontStyle: "italic",
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
  button: {
    backgroundColor: "#00BFFF", // Neon Blue
    color: "#000000", // Black text
    padding: "8px 12px",
    fontSize: "14px",
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
  noPayment: {
    color: "#FF4444",
    fontWeight: "bold",
  },
};

// Button hover effect
styles.button[":hover"] = styles.buttonHover;

export default MoveBookings;
