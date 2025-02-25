import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/User/Home";
import Signup from "./pages/User/signup";
import Feedback from "./pages/User/Feedback";
import Profile from "./pages/User/profile";
import Booking from "./pages/User/BookingForm";
import Login from "./pages/User/Login";

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
    </Routes>
  );
}

export default App;

