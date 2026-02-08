import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

/* =======================
   THUNKS
======================= */

//  Get all users
export const fetchAllUsers = createAsyncThunk(
  "adminUsers/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/users/getAllUsers");
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Get all active users
export const fetchActiveUsers = createAsyncThunk(
  "adminUsers/fetchActiveUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/users/getAllActiveUsers");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Get single user by ID
export const fetchUserById = createAsyncThunk(
  "adminUsers/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/admin/users/getUser/${userId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Delete user
export const deleteUser = createAsyncThunk(
  "adminUsers/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/users/deleteUser/${userId}`);
      return userId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Get all user sessions
export const fetchAllUserSessions = createAsyncThunk(
  "adminUsers/fetchAllUserSessions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/users/getAllUserSessions");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Get user sessions by userId
export const fetchUserSessionsByUserId = createAsyncThunk(
  "adminUsers/fetchUserSessionsByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/admin/users/getUserSession/${userId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Delete user session
export const deleteUserSession = createAsyncThunk(
  "adminUsers/deleteUserSession",
  async ({ userId, sessionId }, { rejectWithValue }) => {
    try {
      await api.delete("/admin/users/deleteUserSession", {
        data: { userId, sessionId },
      });
      return sessionId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Get users by IP
export const fetchUsersByIP = createAsyncThunk(
  "adminUsers/fetchUsersByIP",
  async (ip, { rejectWithValue }) => {
    try {
      const res = await api.get(`/admin/users/getAllUsersByIP/${ip}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Get user activity logs
export const fetchUsersLogs = createAsyncThunk(
  "adminUsers/fetchUsersLogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/users/getAllUserLogs");
      return res.data.data; // text logs
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* =======================
   SLICE
======================= */

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState: {
    allUsers: [],
    activeUsers: [],
    selectedUser: null,

    userSessions: [],
    selectedUserSessions: [],
    usersByIP: [],

    userLogs: null,

    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    clearUserSessions(state) {
      state.selectedUserSessions = [];
    },
  },

  extraReducers: (builder) => {
    builder

    // Users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })
      .addCase(fetchActiveUsers.fulfilled, (state, action) => {
        state.activeUsers = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.allUsers = state.allUsers.filter(
          (u) => u._id !== action.payload
        );
      })

      // Sessions
      .addCase(fetchAllUserSessions.fulfilled, (state, action) => {
        state.userSessions = action.payload;
      })
      .addCase(fetchUserSessionsByUserId.fulfilled, (state, action) => {
        state.selectedUserSessions = action.payload;
      })
      .addCase(deleteUserSession.fulfilled, (state, action) => {
        state.selectedUserSessions = state.selectedUserSessions.filter(
          (s) => s._id !== action.payload
        );
      })

      // IP & Logs
      .addCase(fetchUsersByIP.fulfilled, (state, action) => {
        state.usersByIP = action.payload;
      })
      .addCase(fetchUsersLogs.fulfilled, (state, action) => {
        state.userLogs = action.payload;
      })


      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      
  },
});

export const { clearSelectedUser, clearUserSessions } =
  adminUsersSlice.actions;

export default adminUsersSlice.reducer;
