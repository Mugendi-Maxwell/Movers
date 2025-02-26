import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,   // Holds user information (e.g., id, name, email, role)
  token: null,  // JWT token if applicable
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user credentials after login
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    // Clear credentials on logout
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
