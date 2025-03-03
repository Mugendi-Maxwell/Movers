import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterIcon,
  DocumentTextIcon,
  StarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import "./Profile.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Profile = () => {
  // State to store the fetched user details
  const [user, setUser] = useState(null);
  // Email input to fetch the profile
  const [inputEmail, setInputEmail] = useState("");
  const [userError, setUserError] = useState("");
  const [loadingUser, setLoadingUser] = useState(false);

  // For editing profile details (only name and email)
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Dynamic content for sidebar selection
  const [selectedItem, setSelectedItem] = useState(null);
  const [content, setContent] = useState(null);

  // Fetch user data by email from the /users endpoint
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
      // Assume /users returns an array of user objects
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

  // Handle input changes for editing profile details
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile details (update localStorage for now)
  const handleUpdate = () => {
    setUser(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    setEditing(false);
    console.log("Profile updated:", formData);
  };

  // Fetch dynamic content based on sidebar sub-item selection using user.id
  useEffect(() => {
    if (!user || !selectedItem) {
      setContent(null);
      return;
    }

    // For booking details: "date", "price", "inventory"
    if (["date", "price", "inventory"].includes(selectedItem)) {
      axios
        .get(`${API_BASE_URL}/bookings`, {
          params: { user_id: user.id },
        })
        .then((res) => {
          setContent(res.data);
        })
        .catch((err) => {
          console.error("Error fetching booking details:", err);
          setContent({ error: "Error fetching booking details." });
        });
    }
    // For feedback details: "comment", "rating"
    else if (["comment", "rating"].includes(selectedItem)) {
      axios
        .get(`${API_BASE_URL}/feedback`, {
          params: { user_id: user.id },
        })
        .then((res) => {
          setContent(res.data);
        })
        .catch((err) => {
          console.error("Error fetching feedback details:", err);
          setContent({ error: "Error fetching feedback details." });
        });
    } else {
      setContent(null);
    }
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

  // If no user is loaded, show the email input form to fetch profile details.
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
            <li>
              <div className="sidebar-item">
                <ChatBubbleBottomCenterIcon className="sidebar-icon" />
                <h2>Your Feedback</h2>
              </div>
              <ul className="sub-list">
                <li onClick={() => setSelectedItem("comment")}>
                  <div className="sidebar-sub-item">
                    <DocumentTextIcon className="sidebar-sub-icon" />
                    <span>Comment</span>
                  </div>
                </li>
                <li onClick={() => setSelectedItem("rating")}>
                  <div className="sidebar-sub-item">
                    <StarIcon className="sidebar-sub-icon" />
                    <span>Rating</span>
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
                <button onClick={handleUpdate}>
                  Confirm change and submit
                </button>
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
                      <pre>{JSON.stringify(content, null, 2)}</pre>
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
    </div>
  );
};

export default Profile;
