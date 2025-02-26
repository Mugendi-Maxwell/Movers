import axios from 'axios';

// Base URL for your backend API (set via environment variable or default to localhost)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Sign up a new user or admin.
 * @param {Object} signupData - Object containing user details.
 *   Expected keys:
 *     - name: string
 *     - email: string
 *     - password: string
 *     - role: "user" or "admin"
 * @returns {Object} Response data from the API.
 */
export const signup = async (signupData) => {
  try {
    // Destructure the required fields from the signupData
    const { role, name, email, password } = signupData;
    
    // Validate that all required fields are present
    if (!role || !name || !email || !password) {
      throw new Error("Missing required fields: role, name, email, and password.");
    }
    
    // Normalize role to lower-case
    const lowerRole = role.toLowerCase();
    // Determine endpoint based on role
    const endpoint = lowerRole === 'admin' ? '/admin/signup' : '/users/signup';
    
    // Build the payload to send to the backend
    const payload = { role: lowerRole, name, email, password };
    
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Login a user or admin.
 * @param {Object} credentials - Object containing login credentials.
 *   Expected keys:
 *     - email: string
 *     - password: string
 *     - role: "user" or "admin"
 * @returns {Object} Response data from the API (e.g., auth token and user details).
 */
export const login = async (credentials) => {
  try {
    // Determine endpoint based on role
    const { role, email, password } = credentials;
    if (!email || !password || !role) {
      throw new Error("Missing required fields: email, password, and role.");
    }
    const lowerRole = role.toLowerCase();
    const endpoint = lowerRole === 'admin' ? '/admin/login' : '/users/login';
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, { email, password, role: lowerRole }, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout a user or admin.
 * @param {string} role - The role of the account ("admin" or "user").
 * @returns {Object} Response data from the API.
 */
export const logout = async (role) => {
  try {
    if (!role) {
      throw new Error("Role is required for logout.");
    }
    const lowerRole = role.toLowerCase();
    const endpoint = lowerRole === 'admin' ? '/admin/logout' : '/users/logout';
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, null, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
