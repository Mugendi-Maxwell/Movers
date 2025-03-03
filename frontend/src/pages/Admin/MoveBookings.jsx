import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./Payment.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MoveBookings = () => {
  const navigate = useNavigate();
  
  const [bookings, setBookings] = useState([]);
  const [paidBookingIds, setPaidBookingIds] = useState(new Set());
  const [error, setError] = useState(null);

  // Fetch all bookings from the admin endpoint.
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

  // Fetch all payments from the admin endpoint and extract booking IDs.
  useEffect(() => {
    axios.get(`${API_BASE_URL}/admin/payments`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      // Extract the booking IDs from each payment.
      const bookingIds = new Set(res.data.map((payment) => payment.booking_id));
      setPaidBookingIds(bookingIds);
    })
    .catch((err) => {
      console.error("Error fetching payments:", err);
      // Optionally, handle errors for payments fetch.
    });
  }, []);

  // Handler for confirming a move.
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
      // Optionally, update the booking status locally:
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Move Bookings</h1>
      {error && <p className="error">{error}</p>}
      {bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th className="p-2">User ID</th>
              <th className="p-2">Move Type</th>
              <th className="p-2">Pickup Location</th>
              <th className="p-2">Dropoff Location</th>
              <th className="p-2">Move Date</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="p-2">{booking.id}</td>
                <td className="p-2">{booking.user_id}</td>
                <td className="p-2">{booking.move_type}</td>
                <td className="p-2">{booking.pickup_location}</td>
                <td className="p-2">{booking.dropoff_location}</td>
                <td className="p-2">
                  {booking.move_date ? new Date(booking.move_date).toLocaleString() : "-"}
                </td>
                <td className="p-2">{booking.total_price}</td>
                <td className="p-2">{booking.status}</td>
                <td className="p-2">
                  {booking.created_at ? new Date(booking.created_at).toLocaleString() : "-"}
                </td>
                <td className="p-2">
                  {paidBookingIds.has(booking.id) && booking.status.toLowerCase() === "pending" ? (
                    <button
                      onClick={() => handleConfirmMove(booking.id)}
                      className="confirm-button"
                    >
                      Confirm Move
                    </button>
                  ) : (
                    "No Payment"
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

export default MoveBookings;
