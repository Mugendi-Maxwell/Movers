import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTruck, FaUsers, FaCalendarAlt } from "react-icons/fa";
// import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [movers, setMovers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch bookings data from the admin endpoint
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));

    // Fetch users data
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));

    // Fetch movers data
    // fetch("/api/movers")
    //   .then((res) => res.json())
    //   .then((data) => setMovers(data))
    //   .catch((err) => console.error("Error fetching movers:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCalendarAlt /> Total Bookings
          </h2>
          <p className="text-2xl font-bold">{bookings.length}</p>
          <Link to="/admin/move-bookings">
            <Button className="mt-3">View Bookings</Button>
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaTruck /> Movers Available
          </h2>
          <p className="text-2xl font-bold">{movers.length}</p>
          <Link to="/admin/movers">
            <Button className="mt-3">Manage Movers</Button>
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaUsers /> Registered Users
          </h2>
          <p className="text-2xl font-bold">{users.length}</p>
          <Link to="/admin/users">
            <Button className="mt-3">View Users</Button>
          </Link>
        </div>
      </div>

      {/* Embedded CSS */}
      <style>{`
        .p-6 {
          padding: 1.5rem;
        }
        .text-3xl {
          font-size: 1.875rem;
        }
        .font-bold {
          font-weight: 700;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
        .grid {
          display: grid;
        }
        .grid-cols-1 {
          grid-template-columns: 1fr;
        }
        .md\\:grid-cols-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .gap-6 {
          gap: 1.5rem;
        }
        .bg-white {
          background-color: #ffffff;
        }
        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),
                      0 4px 6px -2px rgba(0,0,0,0.05);
        }
        .rounded-xl {
          border-radius: 1rem;
        }
        .p-4 {
          padding: 1rem;
        }
        .text-xl {
          font-size: 1.25rem;
        }
        .flex {
          display: flex;
        }
        .items-center {
          align-items: center;
        }
        .gap-2 {
          gap: 0.5rem;
        }
        .text-2xl {
          font-size: 1.5rem;
        }
        .mt-3 {
          margin-top: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
