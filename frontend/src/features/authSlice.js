import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api.js";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  authChecked: false,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", data);
      return res.data.data;
    } catch (error) {
      console.log(error, "Error in Sign Up signUp");
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signin", data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addMatcher(
        (action) =>
          action.type === signUp.pending.type ||
          action.type === signIn.pending.type,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addMatcher(
        (action) =>
          action.type === signUp.fulfilled.type || signIn.fulfilled.type,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.authChecked = true;
        },
      )

      .addMatcher(
        (action) =>
          action.type === signUp.rejected.type || signIn.rejected.type,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.authChecked = true;
        },
      )

      .addMatcher(
        (action) => action.type === logout.fulfilled.type,
        (state, action) => {
          state.loading = false;
          state.user = null;
          state.error = action.payload;
          state.isAuthenticated = false;
          state.authChecked = false;
        },
      );
  },
});

export default authSlice.reducer;
