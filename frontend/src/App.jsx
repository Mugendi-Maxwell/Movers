import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/User/Home";
import Signup from "./pages/User/Signup";
import Feedback from "./pages/User/Feedback";
import Profile from "./pages/User/Profile";
import Booking from "./pages/User/BookingForm";
import Login from "./pages/User/Login";
import Payment from "./pages/User/Payment";
import Dashboard from "./pages/Admin/Dashboard";
import Inventory from "./pages/Admin/Inventory"; // Corrected casing
import MoveBookings from "./pages/Admin/MoveBookings";
import AdminFeedback from "./pages/Admin/AdminFeedback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/payment" element={<Payment />} /> {/* Corrected casing */}
      <Route path="/admin/dashboard" element={<Dashboard />} /> {/* Corrected path */}
      <Route path="/admin/inventory" element={<Inventory />} /> {/* Corrected casing and path */}
      <Route path="/admin/move-bookings" element={<MoveBookings />} /> {/* Standardized path */}
      <Route path="/admin/feedback" element={<AdminFeedback />} />
    </Routes> 
  );
}

export default App;
