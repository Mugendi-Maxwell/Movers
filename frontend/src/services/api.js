// src/services/api.js
import axios from 'axios';
import store from '../redux/store';
import { logoutSuccess } from '../redux/slices/authSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor to catch expired token errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message &&
      error.response.data.message.includes("Signature has expired")
    ) {
      // Clear token from Redux state & localStorage
      store.dispatch(logoutSuccess());
      
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
