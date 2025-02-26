import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Retrieve all feedback entries for the user.
 */
export const getUserFeedback = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/feedback`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new feedback.
 * @param {Object} feedbackData - e.g. { user_id: 1, booking_id: 1, rating: 5, comments: "Great service!" }
 */
export const createUserFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update existing feedback.
 * @param {number} feedbackId
 * @param {Object} feedbackData - fields to update
 */
export const updateUserFeedback = async (feedbackId, feedbackData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/feedback/${feedbackId}`, feedbackData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete feedback.
 * @param {number} feedbackId
 */
export const deleteUserFeedback = async (feedbackId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/feedback/${feedbackId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
