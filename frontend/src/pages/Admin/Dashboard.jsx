import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMoneyBillWave, FaCommentDots } from "react-icons/fa";
//import { Button } from "@/components/ui/button";
import { getAllBookingsAdmin } from "../../services/adminBookingService";
import { getAllPaymentsAdmin } from "../../services/adminPaymentService";
import { getAllFeedbackAdmin } from "../../services/feedbackService";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [feedback, setFeedback] = useState([]);

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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Manage Bookings */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCalendarAlt /> Total Bookings
          </h2>
          <p className="text-2xl font-bold">{bookings.length}</p>
          <Link to="/admin/bookings">
            <Button className="mt-3">Manage Bookings</Button>
          </Link>
        </div>

        {/* View Payments */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaMoneyBillWave /> Total Payments
          </h2>
          <p className="text-2xl font-bold">{payments.length}</p>
          <Link to="/admin/payments">
            <Button className="mt-3">View Payments</Button>
          </Link>
        </div>

        {/* View Feedback */}
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCommentDots /> Total Feedback
          </h2>
          <p className="text-2xl font-bold">{feedback.length}</p>
          <Link to="/admin/feedback">
            <Button className="mt-3">View Feedback</Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
