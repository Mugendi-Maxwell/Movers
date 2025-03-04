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
  // State for storing the user fetched by email.
  const [user, setUser] = useState(null);
  // Email input for fetching user details.
  const [inputEmail, setInputEmail] = useState("");
  const [userError, setUserError] = useState("");
  const [loadingUser, setLoadingUser] = useState(false);

  // State for editing profile details (only name and email).
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // State for dynamic sidebar selection and content.
  const [selectedItem, setSelectedItem] = useState(null);
  const [content, setContent] = useState(null);

  // Fetch user data by email from the /users endpoint.
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
      // Assume /users returns an array of user objects.
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

  // Handle input changes in the editing form.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile details by sending a PUT request.
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

  // Fetch dynamic content based on sidebar selection using the user's id.
  useEffect(() => {
    if (!user || !selectedItem) {
      setContent(null);
      return;
    }
    // We'll always fetch from the bookings endpoint for booking details.
    axios
      .get(`${API_BASE_URL}/bookings`, {
        params: { user_id: user.id },
      })
      .then((res) => {
        // Filter out only those bookings that belong to this user (if backend isn't filtering).
        const userBookings = res.data.filter((booking) => booking.user_id === user.id);
        // Now, for the selected sub-item, extract only the relevant field.
        if (selectedItem === "date") {
          const dates = userBookings.map((booking) =>
            booking.move_date
              ? new Date(booking.move_date).toLocaleDateString()
              : "No date available"
          );
          setContent(dates);
        } else if (selectedItem === "price") {
          const prices = userBookings.map(
            (booking) => booking.total_price || "No price available"
          );
          setContent(prices);
        } else if (selectedItem === "inventory") {
          const moveTypes = userBookings.map(
            (booking) => booking.move_type || "No move type available"
          );
          setContent(moveTypes);
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
        {/* Left Sidebar */}
        <aside className="profile-sidebar">
          <h2>My Dashboard</h2>
          <ul>
            <li>
              <div className="sidebar-item">
                <CalendarDaysIcon className="sidebar-icon" />
                <h1>Booking Details</h1>
              </div>
              <ul className="sub-list">
                <li onClick={() => setSelectedItem("date")}>
                  <div className="sidebar-sub-item">
                    <CalendarDaysIcon className="sidebar-sub-icon" />
                    <span>Date</span>
                  </div>
                </li>
                <li onClick={() => setSelectedItem("price")}>
                  <div className="sidebar-sub-item">
                    <CurrencyDollarIcon className="sidebar-sub-icon" />
                    <span>Price</span>
                  </div>
                </li>
                <li onClick={() => setSelectedItem("inventory")}>
                  <div className="sidebar-sub-item">
                    <ClipboardDocumentListIcon className="sidebar-sub-icon" />
                    <span>Inventory</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          <div className={`profile-info ${editing ? "editing" : ""}`}>
            <div className="avatar-icon-wrapper">
              <UserCircleIcon className="avatar-icon" />
            </div>
            {editing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                <button onClick={handleUpdate}>Confirm change and submit</button>
              </>
            ) : (
              <>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <button onClick={() => setEditing(true)}>Change Details</button>
              </>
            )}

            {/* Dynamic Content Area */}
            <div className="dynamic-content">
              {selectedItem ? (
                content ? (
                  content.error ? (
                    <p className="error-text">{content.error}</p>
                  ) : (
                    <>
                      <h4>Data for: {selectedItem}</h4>
                      {selectedItem === "date" && (
                        <ul>
                          {content.map((date, index) => (
                            <li key={index}>{date}</li>
                          ))}
                        </ul>
                      )}
                      {selectedItem === "price" && (
                        <ul>
                          {content.map((price, index) => (
                            <li key={index}>{price}</li>
                          ))}
                        </ul>
                      )}
                      {selectedItem === "inventory" && (
                        <ul>
                          {content.map((moveType, index) => (
                            <li key={index}>{moveType}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )
                ) : (
                  <p>Loading...</p>
                )
              ) : (
                <p>Select a sub-item on the left to see details.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Inline CSS */}
      <style>{`
        body {
          background-color: #333;
          color: white;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .profile-container {
          display: flex;
          margin-top: 80px;
          padding: 20px;
          min-height: 100vh;
        }
        .profile-sidebar {
          width: 250px;
          background: #222;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 191, 255, 0.3);
        }
        .profile-main {
          flex-grow: 1;
          margin-left: 20px;
          padding: 20px;
          background: #222;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 191, 255, 0.3);
        }
        .profile-button {
          background-color: #00BFFF;
          color: white;
          padding: 10px 15px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
