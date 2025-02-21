import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MoveBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/bookings").then(res => res.json()).then(data => setBookings(data));
  }, []);

  const updateStatus = async (id, newStatus) => {
    const response = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      setBookings(bookings.map(booking => booking.id === id ? { ...booking, status: newStatus } : booking));
    } else {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Mover Bookings</h1>

      <table className="w-full bg-white shadow-md rounded-xl">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Customer</th>
            <th className="p-2">Mover</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-t">
              <td className="p-2">{booking.customerName}</td>
              <td className="p-2">{booking.moverName}</td>
              <td className="p-2">{new Date(booking.date).toLocaleDateString()}</td>
              <td className={`p-2 font-bold ${booking.status === "Completed" ? "text-green-600" : "text-orange-600"}`}>{booking.status}</td>
              <td className="p-2">
                <Button className="bg-green-500 hover:bg-green-600" onClick={() => updateStatus(booking.id, "Completed")}>Mark Completed</Button>
                <Link to={`/admin/bookings/${booking.id}`}>
                  <Button className="ml-3 bg-gray-500 hover:bg-gray-600">View</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MoveBookings;
