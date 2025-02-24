import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookMove.css";
// Import the image using the correct relative path
import moveImage from "../../assets/image.png";
import Navbar from "./Navbar";

const BookMove = () => {
  const [formData, setFormData] = useState({
    name: "",
    currentAddress: "",
    moveAddress: "",
    date: "",
    time: "",
    moveType: "",
    price: "",
  });

  const [moveTypes, setMoveTypes] = useState([]);

  // Fetch move types from the inventory API
  useEffect(() => {
    axios
      .get("https://your-api.com/inventory")
      .then((response) => {
        setMoveTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching move types:", error);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update price when move type changes
  const handleMoveTypeChange = (e) => {
    const selectedMove = moveTypes.find((item) => item.type === e.target.value);
    setFormData({
      ...formData,
      moveType: selectedMove?.type || "",
      price: selectedMove?.price || "",
    });
  };

  // Handle form submission by posting data to the bookings endpoint
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://your-api.com/bookings", formData)
      .then(() => {
        alert("Move booked successfully!");
      })
      .catch((error) => {
        console.error("Error booking move:", error);
        alert("Failed to book move.");
      });
  };

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />
      <div className="book-move-container">
        {/* Left side: Form */}
        <div className="book-move-form">
          <h1>Book Move</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

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
                <option key={item.type} value={item.type}>
                  {item.type} - ${item.price}
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

        {/* Right side: Illustration */}
        <div className="book-move-illustration">
          <img src={moveImage} alt="Road with cars" />
        </div>
      </div>
    </div>
  );
};

export default BookMove;
