import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Get the JWT token from local storage.
 */
const getAuthToken = () => localStorage.getItem("token");

/**
 * Retrieve all payments for the authenticated user.
 */
export const getUserPayments = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/payments`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to make payment";
  }
};

/**
 * Update a payment.
 * @param {number} paymentId
 * @param {Object} paymentData - fields to update
 */
export const updateUserPayment = async (paymentId, paymentData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_BASE_URL}/payments/${paymentId}`, paymentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update payment";
  }
};

/**
 * Delete a payment.
 * @param {number} paymentId
 */
export const deleteUserPayment = async (paymentId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete payment";
  }
};
