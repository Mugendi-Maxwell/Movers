import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; // Adjust the path as needed
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  ChatBubbleBottomCenterIcon,
  DocumentTextIcon,
  StarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import "./Profile.css";

const Profile = () => {
  // User profile state (initial details)
  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    phone: "+254712345678",
  });
  
  // Toggle editing mode
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // For dynamic sidebar data fetching:
  const [selectedItem, setSelectedItem] = useState(null);
  const [content, setContent] = useState(null);

  // Fetch data from backend when a sidebar sub-item is selected
  useEffect(() => {
    if (!selectedItem) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/data?item=${selectedItem}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const result = await res.json();
        setContent(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setContent({ error: "Failed to fetch data." });
      }
    };

    fetchData();
  }, [selectedItem]);

  // Handle input changes for editing profile details
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile details
  const handleUpdate = () => {
    setUser(formData);
    setEditing(false);
    // Optionally, post changes to the backend here
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        {/* Left Sidebar */}
        <aside className="profile-sidebar">
          <h2>My Dashboard</h2>
          <ul>
            {/* Booking Details */}
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
            {/* Your Feedback */}
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
          {/* Conditionally add the "editing" class to profile-info */}
          <div className={`profile-info ${editing ? "editing" : ""}`}>
            {/* Avatar Icon */}
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
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
                <button onClick={handleUpdate}>
                  Confirm change and submit
                </button>
              </>
            ) : (
              <>
                <h3>{user.name}</h3>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <button onClick={() => setEditing(true)}>Change Details</button>
              </>
            )}

            {/* Dynamic Content Area for sidebar sub-items */}
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
