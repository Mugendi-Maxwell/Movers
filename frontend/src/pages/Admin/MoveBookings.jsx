import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MoveBookings = () => {
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [paidBookingIds, setPaidBookingIds] = useState(new Set());
  const [userMapping, setUserMapping] = useState({}); // Map user_id -> user name
  const [error, setError] = useState(null);

  // Fetch bookings from admin endpoint.
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

  // Fetch payments to determine which bookings have been paid.
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

  // Fetch all users to build a mapping from user_id to user name.
  useEffect(() => {
    axios.get(`${API_BASE_URL}/users`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      const mapping = {};
      res.data.forEach((user) => {
        mapping[user.id] = user.name;
      });
      setUserMapping(mapping);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
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
      <Link to="/admin/dashboard" style={styles.link}>
        ← Back to Dashboard
      </Link>
      {error && <p style={styles.error}>{error}</p>}
      {bookings.length === 0 ? (
        <p style={styles.noBookings}>No bookings found.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>User Name</th>
                <th style={styles.th}>Move Type</th>
                <th style={styles.th}>Pickup Location</th>
                <th style={styles.th}>Dropoff Location</th>
                <th style={styles.th}>Move Date</th>
                <th style={styles.th}>Total Price</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Created At</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} style={styles.tr}>
                  <td style={styles.td}>{booking.id}</td>
                  <td style={styles.td}>{userMapping[booking.user_id] || booking.user_id}</td>
                  <td style={styles.td}>{booking.move_type}</td>
                  <td style={styles.td}>{booking.pickup_location}</td>
                  <td style={styles.td}>{booking.dropoff_location}</td>
                  <td style={styles.td}>
                    {booking.move_date ? new Date(booking.move_date).toLocaleString() : "-"}
                  </td>
                  <td style={styles.td}>{booking.total_price}</td>
                  <td style={styles.td}>{booking.status}</td>
                  <td style={styles.td}>
                    {booking.created_at ? new Date(booking.created_at).toLocaleString() : "-"}
                  </td>
                  <td style={styles.td}>
                    {booking.status.toLowerCase() === "confirmed" ? (
                      <span style={styles.paid}>Paid</span>
                    ) : (
                      paidBookingIds.has(booking.id) ? (
                        <button onClick={() => handleConfirmMove(booking.id)} style={styles.button}>
                          Confirm Move
                        </button>
                      ) : (
                        <span style={styles.noPayment}>No Payment</span>
                      )
                    )}
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
    backgroundColor: "#121212",
    padding: "20px",
    textAlign: "center",
    color: "#EEEEEE",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#00BFFF",
    marginBottom: "20px",
  },
  link: {
    display: "inline-block",
    marginBottom: "20px",
    fontSize: "16px",
    color: "#00BFFF",
    textDecoration: "none",
    fontWeight: "bold",
  },
  error: {
    color: "#FF5555",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  noBookings: {
    fontSize: "20px",
    fontStyle: "italic",
  },
  tableWrapper: {
    overflowX: "auto",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1E1E1E",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 191, 255, 0.3)",
  },
  tableHeader: {
    backgroundColor: "#333333",
  },
  th: {
    padding: "12px 15px",
    textAlign: "left",
    color: "#00BFFF",
    fontSize: "16px",
    borderBottom: "2px solid #444444",
  },
  tr: {
    borderBottom: "1px solid #444444",
  },
  td: {
    padding: "10px 15px",
    textAlign: "left",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#00BFFF",
    color: "#121212",
    padding: "8px 12px",
    fontSize: "14px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
  },
  noPayment: {
    color: "#FF4444",
    fontWeight: "bold",
  },
  paid: {
    color: "green",
    fontWeight: "bold",
  },
};

export default MoveBookings;
