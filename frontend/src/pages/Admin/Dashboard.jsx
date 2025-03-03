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
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Admin Dashboard</h1>
      <div className="dashboard-grid">
        {/* Manage Bookings */}
        <div className="card">
          <div className="card-heading">
            <FaCalendarAlt /> Total Bookings
          </div>
          <div className="card-number">{bookings.length}</div>
          <Link to="/admin/move-bookings">
            <button className="btn">Manage Bookings</button>
          </Link>
        </div>

        {/* View Payments */}
        <div className="card">
          <div className="card-heading">
            <FaMoneyBillWave /> Total Payments
          </div>
          <div className="card-number">{payments.length}</div>
          <Link to="/admin/payments">
            <button className="btn">View Payments</button>
          </Link>
        </div>

        {/* View Feedbacks */}
        <div className="card">
          <div className="card-heading">
            <FaCommentDots /> Total Feedbacks
          </div>
          <div className="card-number">{feedback.length}</div>
          <Link to="/admin/feedback">
            <button className="btn">View Feedbacks</button>
          </Link>
        </div>

        {/* Inventory */}
        <div className="card">
          <div className="card-heading">
            <FaBoxes /> Inventory
          </div>
          <div className="card-number">{inventory.length}</div>
          <Link to="/admin/inventory">
            <button className="btn">View Inventory</button>
          </Link>
        </div>

        {/* Login Link */}
        <div className="card">
          <div className="card-heading">
            <FaSignInAlt /> Login
          </div>
          <Link to="/login">
            <button className="btn">Go to Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;