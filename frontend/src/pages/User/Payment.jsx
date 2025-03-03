import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PaymentPage = () => {
  const navigate = useNavigate();

  // State for user email input, user id, bookings, selected booking, and payment form fields.
  const [inputEmail, setInputEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [acceptedQuote, setAcceptedQuote] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("M-Pesa");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handler to fetch user by email and then fetch that user's pending bookings.
  const fetchBookingsByEmail = async () => {
    if (!inputEmail) {
      setMessage("Please enter your email.");
      return;
    }
    try {
      // Fetch all users.
      const usersRes = await axios.get(`${API_BASE_URL}/users`, {
        headers: { "Content-Type": "application/json" },
      });
      // Find the user whose email matches the input.
      const matchedUser = usersRes.data.find(
        (user) =>
          user.email && user.email.toLowerCase() === inputEmail.toLowerCase()
      );
      if (!matchedUser) {
        setMessage("User not found. Please check your email.");
        return;
      }
      setUserId(matchedUser.id);

      // Fetch all bookings.
      const bookingsRes = await axios.get(`${API_BASE_URL}/bookings`, {
        headers: { "Content-Type": "application/json" },
      });
      // Filter bookings to those that belong to the found user.
      const userBookings = bookingsRes.data.filter(
        (b) => b.user_id === matchedUser.id
      );
      // Further filter for pending bookings.
      const pendingBookings = userBookings.filter(
        (b) => b.status.toLowerCase() === "pending"
      );
      if (pendingBookings.length > 0) {
        setBookings(pendingBookings);
        setMessage("");
      } else {
        setMessage("No pending booking found. Please create a booking first.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setMessage("Error fetching bookings.");
    }
  };

  // Handler for accepting a quote: sets the selected booking and shows the payment form.
  const handleAcceptQuote = (booking) => {
    setSelectedBooking(booking);
    setAcceptedQuote(true);
    setMessage("");
  };

  // Handler for declining a quote: navigates to the general bookings page.
  const handleDeclineQuote = () => {
    navigate("/bookings");
  };

  // Handler for processing payment using the selected booking's details.
  const handlePayment = async () => {
    if (!selectedBooking || !inputEmail || !paymentMethod) {
      setMessage("Email and payment method are required.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/payments`,
        {
          booking_id: selectedBooking.id,
          amount: selectedBooking.total_price,
          payment_method: paymentMethod,
          email: inputEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Payment response:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Payment error:", error.response || error);
      setMessage("Payment failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Make a Payment</h2>
        {message && <p className="payment-message">{message}</p>}
        {!selectedBooking ? (
          <>
            {bookings.length === 0 ? (
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  className="payment-input"
                />
                <button onClick={fetchBookingsByEmail} className="payment-button">
                  Fetch My Bookings
                </button>
              </div>
            ) : (
              <div>
                <h3>Select a Pending Booking:</h3>
                <ul>
                  {bookings.map((booking) => (
                    <li key={booking.id} style={{ marginBottom: "1rem" }}>
                      <p>
                        <strong>Booking ID:</strong> {booking.id} |{" "}
                        <strong>Amount:</strong> {booking.total_price} |{" "}
                        <strong>Status:</strong> {booking.status}
                      </p>
                      <button
                        onClick={() => handleAcceptQuote(booking)}
                        className="payment-button"
                      >
                        Accept Quote
                      </button>
                      <button
                        onClick={handleDeclineQuote}
                        className="payment-button"
                        style={{ marginLeft: "1rem" }}
                      >
                        Decline Quote
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          // Payment form appears once a booking is selected and quote is accepted.
          <>
            <p>Selected Booking ID: {selectedBooking.id}</p>
            <p>Amount: {selectedBooking.total_price}</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className="payment-input"
            />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="payment-input"
            >
              <option value="M-Pesa">M-Pesa</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
            </select>
            <button
              onClick={handlePayment}
              className="payment-button"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
