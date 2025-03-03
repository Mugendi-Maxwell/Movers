import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Stores the JWT token in localStorage.
 * @param {string} token - JWT token from the backend.
 */
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

/**
 * Retrieves the JWT token from localStorage.
 * @returns {string|null} The JWT token or null if not found.
 */
const getAuthToken = () => localStorage.getItem("token");

/**
 * Sign up a new user or admin.
 * @param {Object} signupData - Object containing user details.
 *   Expected keys:
 *     - name: string
 *     - email: string
 *     - password: string
 *     - role: "user" or "admin"
 * @returns {Object} Response data from the API, including token and user details.
 */
export const signup = async (signupData) => {
  try {
    const { role, name, email, password } = signupData;
    if (!role || !name || !email || !password) {
      throw new Error("Missing required fields: role, name, email, and password.");
    }

    const lowerRole = role.toLowerCase();
    const endpoint = lowerRole === "admin" ? "/admin/signup" : "/users/signup";

    const response = await axios.post(
      `${API_BASE_URL}${endpoint}`,
      { name, email, password, role: lowerRole },
      { headers: { "Content-Type": "application/json" } }
    );
    
    // If the response includes a token, store it
    const { token, user } = response.data;
    if (token) {
      setAuthToken(token);
    }
    return { token, user };
  } catch (error) {
    throw error.response?.data?.message || "Signup failed";
  }
};

/**
 * Login a user or admin.
 * @param {Object} credentials - Object containing login credentials.
 *   Expected keys:
 *     - email: string
 *     - password: string
 *     - role: "user" or "admin"
 * @returns {Object} Response data from the API (JWT token, user details).
 */
export const login = async (credentials) => {
  try {
    const { role, email, password } = credentials;
    if (!email || !password || !role) {
      throw new Error("Missing required fields: email, password, and role.");
    }

    const lowerRole = role.toLowerCase();
    const endpoint = lowerRole === "admin" ? "/admin/login" : "/users/login";

    const response = await axios.post(
      `${API_BASE_URL}${endpoint}`,
      { email, password, role: lowerRole },
      { headers: { "Content-Type": "application/json" } }
    );

    const { token, user } = response.data;
    setAuthToken(token); // Store the token
    return { token, user };
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

/**
 * Logout a user or admin.
 * @param {string} role - The role of the account ("admin" or "user").
 * @returns {Object} Response data from the API.
 */
export const logout = async (role) => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User is not logged in.");

    const lowerRole = role ? role.toLowerCase() : "user";
    const endpoint = lowerRole === "admin" ? "/admin/logout" : "/users/logout";
    const response = await axios.post(
      `${API_BASE_URL}${endpoint}`,
      {},
      { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
    );

    setAuthToken(null); // Remove token after logout
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Logout failed";
  }
};

/**
 * Fetch authenticated user data.
 * @returns {Object} User data from the API.
 */
export const fetchUserData = async () => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("User is not authenticated.");

    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch user data";
  }
};
