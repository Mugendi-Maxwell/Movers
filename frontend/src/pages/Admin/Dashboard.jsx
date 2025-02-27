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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Manage Bookings */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCalendarAlt /> Total Bookings
          </h2>
          <p className="text-2xl font-bold">{bookings.length}</p>
          <Link to="/admin/move-bookings">
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
              Manage Bookings
            </button>
          </Link>
        </div>

        {/* View Payments */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaMoneyBillWave /> Total Payments
          </h2>
          <p className="text-2xl font-bold">{payments.length}</p>
          <Link to="/admin/payments">
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
              View Payments
            </button>
          </Link>
        </div>

        {/* View Feedbacks */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCommentDots /> Total Feedbacks
          </h2>
          <p className="text-2xl font-bold">{feedback.length}</p>
          <Link to="/admin/feedback">
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
              View Feedbacks
            </button>
          </Link>
        </div>

        {/* Inventory */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaBoxes /> Inventory
          </h2>
          <p className="text-2xl font-bold">{inventory.length}</p>
          <Link to="/admin/inventory">
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
              View Inventory
            </button>
          </Link>
        </div>

        {/* Login Link */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaSignInAlt /> Login
          </h2>
          <Link to="/login">
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
              Go to Login
            </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
