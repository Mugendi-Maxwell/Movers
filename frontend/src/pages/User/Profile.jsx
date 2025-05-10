import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import "./Profile.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [inputEmail, setInputEmail] = useState("");
  const [userError, setUserError] = useState("");
  const [loadingUser, setLoadingUser] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [selectedItem, setSelectedItem] = useState(null);
  const [content, setContent] = useState(null);

  const fetchUserByEmail = async () => {
    if (!inputEmail) {
      setUserError("Please enter your email.");
      return;
    }
    setLoadingUser(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/users`, {
        headers: { "Content-Type": "application/json" },
      });
      const matchedUser = res.data.find(
        (u) => u.email.toLowerCase() === inputEmail.toLowerCase()
      );
      if (matchedUser) {
        setUser(matchedUser);
        setFormData({ name: matchedUser.name, email: matchedUser.email });
        setUserError("");
      } else {
        setUserError("User not found. Please check your email.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserError("Error fetching user data.");
    } finally {
      setLoadingUser(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/users/${user.id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setEditing(false);
      console.log("Profile updated:", res.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (!user || !selectedItem) {
      setContent(null);
      return;
    }
    axios
      .get(`${API_BASE_URL}/bookings`, {
        params: { user_id: user.id },
      })
      .then((res) => {
        const userBookings = res.data.filter((booking) => booking.user_id === user.id);
        if (selectedItem === "date") {
          setContent(userBookings.map((booking) => booking.move_date ? new Date(booking.move_date).toLocaleDateString() : "No date available"));
        } else if (selectedItem === "price") {
          setContent(userBookings.map((booking) => booking.total_price || "No price available"));
        } else if (selectedItem === "inventory") {
          setContent(userBookings.map((booking) => booking.move_type || "No move type available"));
        } else {
          setContent(userBookings);
        }
      })
      .catch((err) => {
        console.error(`Error fetching ${selectedItem} data:`, err);
        setContent({ error: `Error fetching ${selectedItem} data.` });
      });
  }, [selectedItem, user]);

  if (loadingUser) {
    return (
      <div>
        <Navbar />
        <div className="profile-container">
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="profile-container">
          <h2>Enter your email to load your profile</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="profile-input"
          />
          <button onClick={fetchUserByEmail} className="profile-button">
            Fetch Profile
          </button>
          {userError && <p className="error-text">{userError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <aside className="profile-sidebar">
          <h2>My Dashboard</h2>
          <ul>
            <li>
              <div className="sidebar-item">
                <CalendarDaysIcon className="sidebar-icon" />
                <h1>Booking Details</h1>
              </div>
              <ul className="sub-list">
                <li onClick={() => setSelectedItem("date")}>Date</li>
                <li onClick={() => setSelectedItem("price")}>Price</li>
                <li onClick={() => setSelectedItem("inventory")}>Inventory</li>
              </ul>
            </li>
          </ul>
        </aside>
        <main className="profile-main">
          <div className={`profile-info ${editing ? "editing" : ""}`}>
            <UserCircleIcon className="avatar-icon" />
            {editing ? (
              <>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <button onClick={handleUpdate}>Confirm change and submit</button>
              </>
            ) : (
              <>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <button onClick={() => setEditing(true)}>Change Details</button>
              </>
            )}
          </div>
          <div className="dynamic-content">
            {selectedItem && content ? (
              content.error ? <p className="error-text">{content.error}</p> : (
                <ul>{content.map((item, index) => <li key={index}>{item}</li>)}</ul>
              )
            ) : <p>Select a sub-item on the left to see details.</p>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
