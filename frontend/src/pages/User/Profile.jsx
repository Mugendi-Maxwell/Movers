import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import "./Profile.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Profile = () => {
  // State for user data
  const [user, setUser] = useState(null);
  const [inputEmail, setInputEmail] = useState("");
  const [userError, setUserError] = useState("");
  const [loadingUser, setLoadingUser] = useState(false);

  // State for editing profile details
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // State for dynamic sidebar selection and content
  const [selectedItem, setSelectedItem] = useState(null);
  const [content, setContent] = useState(null);

  // Fetch user data by email from /users endpoint.
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

  // Fetch dynamic content when a sidebar item is selected.
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
        const userBookings = res.data.filter(
          (booking) => booking.user_id === user.id
        );
        if (selectedItem === "date") {
          setContent(
            userBookings.map((booking) =>
              booking.move_date
                ? new Date(booking.move_date).toLocaleDateString()
                : "No date available"
            )
          );
        } else if (selectedItem === "price") {
          setContent(
            userBookings.map(
              (booking) => booking.total_price || "No price available"
            )
          );
        } else if (selectedItem === "inventory") {
          setContent(
            userBookings.map(
              (booking) => booking.move_type || "No move type available"
            )
          );
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
        <div style={styles.loadingContainer}>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Navbar />
        <div style={styles.emailContainer}>
          <h2 style={styles.emailTitle}>Enter your email to load your profile</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            style={styles.emailInput}
          />
          <button onClick={fetchUserByEmail} style={styles.fetchButton}>
            Fetch Profile
          </button>
          {userError && <p style={styles.errorText}>{userError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={styles.profileContainer}>
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>My Dashboard</h2>
          <ul style={styles.sidebarList}>
            <li style={styles.sidebarItem} onClick={() => setSelectedItem("date")}>
              Date
            </li>
            <li style={styles.sidebarItem} onClick={() => setSelectedItem("price")}>
              Price
            </li>
            <li style={styles.sidebarItem} onClick={() => setSelectedItem("inventory")}>
              Inventory
            </li>
          </ul>
        </aside>
        <main style={styles.main}>
          <div style={styles.profileInfo}>
            {editing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  style={styles.inputField}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  style={styles.inputField}
                />
                <button onClick={handleUpdate} style={styles.updateButton}>
                  Confirm change and submit
                </button>
              </>
            ) : (
              <>
                <h3 style={styles.userName}>{user.name}</h3>
                <p style={styles.userEmail}>Email: {user.email}</p>
                <button onClick={() => setEditing(true)} style={styles.editButton}>
                  Change Details
                </button>
              </>
            )}
          </div>
          <div style={styles.dynamicContent}>
            {selectedItem && content ? (
              content.error ? (
                <p style={styles.errorText}>{content.error}</p>
              ) : (
                <div>
                  <h4 style={styles.dynamicTitle}>Data for: {selectedItem}</h4>
                  <ul style={styles.dynamicList}>
                    {content.map((item, index) => (
                      <li key={index} style={styles.dynamicItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
            ) : (
              <p style={styles.dynamicPlaceholder}>Select a sub-item on the left to see details.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  profileContainer: {
    display: "flex",
    minHeight: "80vh",
    padding: "20px",
    gap: "20px",
    backgroundColor: "#121212",
    color: "#EEEEEE",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#222222",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 191, 255, 0.3)",
  },
  sidebarTitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#00BFFF",
  },
  sidebarList: {
    listStyleType: "none",
    padding: 0,
  },
  sidebarItem: {
    marginBottom: "10px",
    cursor: "pointer",
    color: "#FFFFFF",
    fontSize: "16px",
  },
  main: {
    flex: 1,
    backgroundColor: "#222222",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 191, 255, 0.3)",
  },
  profileInfo: {
    textAlign: "center",
    marginBottom: "30px",
  },
  userName: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  userEmail: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  editButton: {
    backgroundColor: "#00BFFF",
    color: "#121212",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  inputField: {
    width: "80%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #00BFFF",
    borderRadius: "5px",
    backgroundColor: "#333333",
    color: "#FFFFFF",
  },
  updateButton: {
    backgroundColor: "#00BFFF",
    color: "#121212",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  dynamicContent: {
    marginTop: "20px",
    textAlign: "left",
  },
  dynamicTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#00BFFF",
  },
  dynamicList: {
    listStyleType: "none",
    padding: 0,
  },
  dynamicItem: {
    padding: "5px 0",
    borderBottom: "1px solid #444444",
  },
  dynamicPlaceholder: {
    fontStyle: "italic",
    color: "#AAAAAA",
  },
  emailContainer: {
    padding: "20px",
    textAlign: "center",
    color: "#EEEEEE",
  },
  emailTitle: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  emailInput: {
    padding: "10px",
    border: "1px solid #00BFFF",
    borderRadius: "5px",
    backgroundColor: "#222222",
    color: "#FFFFFF",
    width: "300px",
    marginBottom: "10px",
  },
  fetchButton: {
    backgroundColor: "#00BFFF",
    color: "#121212",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  loadingContainer: {
    padding: "20px",
    textAlign: "center",
    color: "#EEEEEE",
  },
};

export default Profile;
