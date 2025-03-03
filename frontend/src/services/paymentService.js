import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Retrieves the JWT token from localStorage.
 */
const getAuthToken = () => localStorage.getItem("token");

/**
 * Retrieve all payments for the authenticated user.
 */
export const getUserPayments = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/payments`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    return response.data; // Expected to be an array of payment objects
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch payments";
  }
};

/**
 * Create a new payment.
 * @param {Object} paymentData - e.g. { amount: 1500, payment_method: "M-Pesa" }
 */
export const createUserPayment = async (paymentData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_BASE_URL}/payments`, paymentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to make payment";
  }
};

/**
 * Update an existing payment.
 * @param {number} paymentId - The ID of the payment to update.
 * @param {Object} paymentData - Fields to update.
 */
export const updateUserPayment = async (paymentId, paymentData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_BASE_URL}/payments/${paymentId}`, paymentData, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update payment";
  }
};

/**
 * Delete a payment.
 * @param {number} paymentId - The ID of the payment to delete.
 */
export const deleteUserPayment = async (paymentId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/payments/${paymentId}`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete payment";
  }
};
