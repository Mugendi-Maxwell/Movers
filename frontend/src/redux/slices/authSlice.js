import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,  // Stores logged-in user details
  token: null,  // JWT token
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;  // Store user details
      state.token = action.payload.token;  // Store token
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
