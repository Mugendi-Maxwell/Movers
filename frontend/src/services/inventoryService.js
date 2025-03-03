import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Retrieve all inventory items.
 * Accessible by both users and admins.
 * @returns {Array} List of inventory items.
 */
export const getInventoryItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch inventory items";
  }
};

/**
 * Create a new inventory item.
 * Admin-only action.
 * @param {Object} itemData - Expected keys: { move_type: string, base_price: number }
 * @returns {Object} The newly created inventory item.
 */
export const createInventoryItem = async (itemData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/inventory`, itemData, {
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to create inventory item";
  }
};

/**
 * Update an existing inventory item.
 * Admin-only action.
 * @param {number} itemId - The ID of the inventory item.
 * @param {Object} itemData - Fields to update (e.g., { move_type, base_price }).
 * @returns {Object} The updated inventory item.
 */
export const updateInventoryItem = async (itemId, itemData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_BASE_URL}/inventory/${itemId}`, itemData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update inventory item";
  }
};

/**
 * Delete an inventory item.
 * Admin-only action.
 * @param {number} itemId - The ID of the inventory item.
 * @returns {Object} Response message.
 */
export const deleteInventoryItem = async (itemId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_BASE_URL}/inventory/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to delete inventory item";
  }
};
