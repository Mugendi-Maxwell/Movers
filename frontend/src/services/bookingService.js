import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Retrieve the JWT token from localStorage.
 * @returns {string|null} The token, or null if not found.
 */
const getAuthToken = () => localStorage.getItem("token");

/**
 * Retrieve all bookings for the authenticated user.
 */
export const getUserBookings = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/bookings`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch bookings";
  }
};

/**
 * Create a new booking.
 * Expected bookingData keys:
 *   - pickup_location: string (current address)
 *   - dropoff_location: string (move address)
 *   - move_date: ISO formatted datetime string (e.g., "2025-03-01T10:00")
 *   - total_price: number
 *   - move_type: string
 *
 * The user_id is extracted from the JWT on the backend.
 */
export const createUserBooking = async (bookingData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Create booking error:", error.response?.data);
    throw error.response?.data?.message || "Failed to create booking";
  }
};

/**
 * Update an existing booking.
 * @param {number} bookingId - The ID of the booking to update.
 * @param {Object} bookingData - Fields to update.
 */
export const updateUserBooking = async (bookingId, bookingData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, bookingData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update booking";
  }
};

/**
 * Delete a booking.
 * @param {number} bookingId - The ID of the booking to delete.
 */
export const deleteUserBooking = async (bookingId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete booking";
  }
};
