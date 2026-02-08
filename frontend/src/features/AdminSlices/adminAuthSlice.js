import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
  name: "adminAuth",

  initialState: {
    admin: null,
    isAuthenticated: false,
  },

  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },

    logoutAdmin(state) {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdmin, logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
