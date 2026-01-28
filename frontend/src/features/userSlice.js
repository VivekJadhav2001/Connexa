import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

/* ======================================================
   FETCH CURRENT USER
====================================================== */
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/user/profile");
      // console.log(res, "fetch user in create async thubk");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

/* ======================================================
   SLICE
====================================================== */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })

      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
