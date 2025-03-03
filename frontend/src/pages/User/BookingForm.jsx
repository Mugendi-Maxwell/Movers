import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./BookMove.css";
import moveImage from "../../assets/image.png";

// Import the booking service function
import { createUserBooking } from "../../services/bookingService";

const BookMove = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentAddress: "",
    moveAddress: "",
    date: "",
    time: "",
    moveType: "",
    price: "",
  });

  const [moveTypes, setMoveTypes] = useState([]);

  // Fetch move types (inventory) from the backend using the Vite API URL
  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    axios
      .get(`${API_BASE_URL}/inventory`)
      .then((response) => {
        setMoveTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching move types:", error);
      });
  }, []);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update move type and price when selection changes
  const handleMoveTypeChange = (e) => {
    const selectedValue = e.target.value;
    const selectedMove = moveTypes.find((item) => item.move_type === selectedValue);
    setFormData({
      ...formData,
      moveType: selectedMove ? selectedMove.move_type : "",
      price: selectedMove ? selectedMove.base_price : "",
    });
  };

  // Handle form submission by calling the booking service and then navigating to payment page
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine date and time into an ISO datetime string
    const move_date = `${formData.date}T${formData.time}`;

    // Prepare booking data according to backend expectations
    const bookingData = {
      pickup_location: formData.currentAddress,
      dropoff_location: formData.moveAddress,
      move_date: move_date,
      total_price: formData.price,
      move_type: formData.moveType,
      status: "pending",
    };

    try {
      const bookingResponse = await createUserBooking(bookingData);
      alert("Move booked successfully!");
      console.log("Booking response:", bookingResponse);
      // Navigate to the payment page after successful booking.
      navigate("/payment");
    } catch (error) {
      console.error("Error booking move:", error);
      alert("Failed to book move.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="book-move-container">
        <div className="book-move-form">
          <h1>Book Move</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="currentAddress">Current Address</label>
            <input
              id="currentAddress"
              name="currentAddress"
              type="text"
              placeholder="Enter current address"
              value={formData.currentAddress}
              onChange={handleChange}
              required
            />

            <label htmlFor="moveAddress">Move Address</label>
            <input
              id="moveAddress"
              name="moveAddress"
              type="text"
              placeholder="Enter move address"
              value={formData.moveAddress}
              onChange={handleChange}
              required
            />

            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="time">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            <label htmlFor="moveType">Move Type</label>
            <select
              id="moveType"
              name="moveType"
              value={formData.moveType}
              onChange={handleMoveTypeChange}
              required
            >
              <option value="">Select move type</option>
              {moveTypes.map((item) => (
                <option key={item.id} value={item.move_type}>
                  {item.move_type} - ${item.base_price}
                </option>
              ))}
            </select>

            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="text"
              value={formData.price}
              readOnly
            />

            <button type="submit">Book Move</button>
          </form>
        </div>
        <div className="book-move-illustration">
          <img src={moveImage} alt="Road with cars" />
        </div>
      </div>
    </div>
  );
};

export default BookMove;
