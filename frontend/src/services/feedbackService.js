import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthToken = () => localStorage.getItem("token");

/**
 * Submit feedback from an authenticated user.
 * @param {Object} feedbackData - Contains keys: mood, feedback, and rating.
 * @returns {Object} Response data from the API.
 */
export const submitFeedback = async (feedbackData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("User is not authenticated.");
    }
    const response = await axios.post(`${API_BASE_URL}/feedback`, feedbackData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to submit feedback";
  }
};

/**
 * Retrieve all feedback entries for admin view.
 * @returns {Object} Response data from the API.
 */
export const getAllFeedbackAdmin = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("User is not authenticated.");
    }
    const response = await axios.get(`${API_BASE_URL}/admin/feedback`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch feedback";
  }
};
