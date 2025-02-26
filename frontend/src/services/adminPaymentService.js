import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Retrieve all payments (admin view).
 */
export const getAllPaymentsAdmin = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/payments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Retrieve details for a specific payment (admin view).
 * @param {number} paymentId
 */
export const getPaymentDetailsAdmin = async (paymentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
