import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

/* ======================================================
   FETCH SUGGESTED USERS
====================================================== */
export const fetchSuggestedUsers = createAsyncThunk(
  "suggestedUsers/fetchSuggestedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/suggestedUsers");
      console.log("Suggested users fetched:", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching suggested users:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

/* ======================================================
   SLICE
====================================================== */
const suggestedUsersSlice = createSlice({
  name: "suggestedUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchSuggestedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default suggestedUsersSlice.reducer;
