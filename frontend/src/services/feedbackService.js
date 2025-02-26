import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Retrieve all feedback entries (Admin view).
 */
export const getAllFeedbackAdmin = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/feedback`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieve details of a specific feedback entry.
 * @param {number} feedbackId
 */
export const getFeedbackDetailsAdmin = async (feedbackId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/feedback/${feedbackId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
