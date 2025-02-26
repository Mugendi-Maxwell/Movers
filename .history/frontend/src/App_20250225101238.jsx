import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// User Pages
import Home from "./pages/User/Home";
import signup from "./pages/User/Signup";
import Feedback from "./pages/User/Feedback";
import Profile from "./pages/User/Profile";
import Booking from "./pages/User/BookingForm";
import Login from "./pages/User/Login";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminLogin from "./pages/Admin/Login";
import MoveBookings from "./pages/Admin/MoveBookings";

function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* User Routes */}
      
      <Route path="/signup" element={<Signup />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/move-bookings" element={<MoveBookings />} />

      {/* You can add more admin routes here, such as /admin/users, /admin/movers, etc. */}
    </Routes>
  );
}

export default App;
