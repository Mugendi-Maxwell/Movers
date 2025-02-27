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

      // Uncomment and update the following if you have an inventory service:
      // try {
      //   const inventoryData = await getAllInventoryAdmin();
      //   setInventory(inventoryData);
      // } catch (error) {
      //   console.error("Error fetching inventory:", error);
      // }
    };

    fetchData();
  }, []);

  return (
    <>
      <style>{`
        .dashboard-container {
          padding: 1.5rem;
        }
        .dashboard-heading {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-align: center;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .dashboard-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .card {
          background-color: #fff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                      0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-radius: 0.75rem;
          padding: 1rem;
          text-align: center;
        }
        .card-heading {
          font-size: 1.25rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .card-number {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
        }
        .btn {
          margin-top: 0.75rem;
          background-color: #3b82f6;
          color: #fff;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #2563eb;
        }
        .back-link {
          color: #3b82f6;
          margin-bottom: 1rem;
          display: inline-block;
        }
      `}</style>

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
    </>
  );
};

export default Dashboard;
