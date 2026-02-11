import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

/* =======================
   THUNKS
======================= */

//  Get all posts
export const fetchAllUsersPosts = createAsyncThunk(
  "adminPosts/fetchAllUsersPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/admin/users/getAllPosts");
      // console.log(res,"Fetch all posts for admin")
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Delete post
export const deletePost = createAsyncThunk(
  "adminPosts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/users/deletePost/${postId}`);
      return postId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Get posts by user
export const fetchPostsByUser = createAsyncThunk(
  "adminPosts/fetchPostsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/post/getUserPosts/${userId}`);
      return res.data.posts;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);


const adminPostsSlice = createSlice({
  name: "adminPosts",

  initialState: {
    posts: [],
    userPosts: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearUserPosts(state) {
      state.userPosts = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // fetchAllUsersPosts
      .addCase(fetchAllUsersPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsersPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllUsersPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload
        );
      })

      // fetchPostsByUser
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.userPosts = action.payload;
      });
  },
});

export const { clearUserPosts } = adminPostsSlice.actions;
export default adminPostsSlice.reducer;
