import axios from 'axios';

// Base URL for your API. Ensure this environment variable is defined (or default to localhost).
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Retrieve all bookings for the authenticated user.
 * (In a production app, you’d include an auth token and filter by user.)
 */
export const getUserBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`);
    return response.data;  // Expected to be an array of booking objects
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new booking.
 * @param {Object} bookingData - e.g. { user_id: 1, move_type: "One Bedroom", date: "2025-03-01T10:00:00", total_price: 1500 }
 */
export const createUserBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update an existing booking.
 * @param {number} bookingId
 * @param {Object} bookingData - fields to update
 */
export const updateUserBooking = async (bookingId, bookingData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/bookings/${bookingId}`, bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a booking.
 * @param {number} bookingId
 */
export const deleteUserBooking = async (bookingId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
