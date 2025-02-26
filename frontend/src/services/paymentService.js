import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Retrieve all payments for the authenticated user.
 */
export const getUserPayments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new payment.
 * @param {Object} paymentData - e.g. { booking_id: 1, amount: 1500, status: "pending" }
 */
export const createUserPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payments`, paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a payment.
 * @param {number} paymentId
 * @param {Object} paymentData - fields to update
 */
export const updateUserPayment = async (paymentId, paymentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/payments/${paymentId}`, paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a payment.
 * @param {number} paymentId
 */
export const deleteUserPayment = async (paymentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
