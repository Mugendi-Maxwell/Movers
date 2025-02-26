import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Retrieve all bookings (admin view).
 */
export const getAllBookingsAdmin = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/bookings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieve a specific booking's details (admin view).
 * @param {number} bookingId
 */
export const getBookingDetailsAdmin = async (bookingId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
