import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTruck, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [movers, setMovers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/bookings").then(res => res.json()).then(data => setBookings(data));
    
    fetch("/api/users").then(res => res.json()).then(data => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
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
    </div>
  );
};

export default Dashboard;
