import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { isPending, isRejected } from "../utils/asyncMatcher.js";

/* ======================================================
   INITIAL STATE
====================================================== */
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

/* ======================================================
   ASYNC THUNKS
====================================================== */

// Fetch all posts (feed)
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/post/allPosts");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Fetch logged-in user's posts
export const fetchMyPosts = createAsyncThunk(
  "posts/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/post/my-posts");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Create new post
export const createPost = createAsyncThunk(
  "posts/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/post/createPost", data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update existing post
export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ postId, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/post/updatePost/${postId}`, data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (postId, { rejectWithValue }) => {
    try {
      await api.delete(`/post/deletePost/${postId}`);
      return postId; // return id so we can remove it from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

//getReferal posts
export const fetchReferalPosts = createAsyncThunk(
  "posts/fetchReferal",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/post/getReferalPosts");
      return res.data.data; // array of posts
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


//create Comment for posts
export const createComment = createAsyncThunk(
  "posts/createComment",
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/post/comment/${postId}`,
        commentData
      );
      return res.data.data;
      // expected: updated post OR new comment
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
/* ======================================================
   SLICE
====================================================== */

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleLikeOptimistic: (state, action) => {
      const { postId, userId, userName, profilepic } = action.payload
      const post = state.posts.find((p) => p._id === postId)

      if (!post) {
        return
      }

      const index = post.likes.findIndex(like => like.userId === userId);

      if (index !== -1) {
        post.likes.splice(index, 1);
      } else {
        post.likes.push({ userId, userName, profilepic });
      }

    },


    addCommentOptimistic: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(p => p._id === postId);
      if (!post) return;

      post.comments.push(comment);
    },

    // delete post instantly
    deletePostOptimistic: (state, action) => {
      state.posts = state.posts.filter(p => p._id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    const postThunks = [
      fetchAllPosts,
      fetchMyPosts,
      createPost,
      updatePost,
      deletePost,
      fetchReferalPosts,
      createComment,
    ];


    /* ---------- DATA HANDLING (FULFILLED CASES) ---------- */

    // Set posts list (feed or my posts)
    builder
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        console.log("fetch post fulfilled",fetchAllPosts.fulfilled)
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        console.log("fetch my post fulfilled",fetchMyPosts.fulfilled)

        state.loading = false;
        state.posts = action.payload;
      })

      // Add newly created post to top
      .addCase(createPost.fulfilled, (state, action) => {
        console.log("create post ",createPost.fulfilled)

        state.loading = false;
        state.posts.unshift(action.payload);
      })

      // Update post in array
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log("update post fulfilled",updatePost.fulfilled)

        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      // Remove deleted post
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log("delete post fulfilled",deletePost.fulfilled)

        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload
        );
      })

      //FEtch refereal posts
      .addCase(fetchReferalPosts.fulfilled, (state, action) => {
        console.log("fetch referals post post fulfilled",fetchReferalPosts.fulfilled)

        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(createComment.fulfilled, (state, action) => {
        console.log("create comment fulfilled",createComment.fulfilled)

        state.loading = false;

        const { postId } = action.meta.arg;
        const index = state.posts.findIndex(
          (post) => post._id === postId
        );

        if (index !== -1) {
          state.posts[index].commentsCount += 1;

          console.log( state.posts[index],'unshift value')

          // If you store comments array
          state.posts[index].comments.unshift(action.payload);
        }
      })



    /* ---------- COMMON LOADING & ERROR HANDLING ---------- */
    builder
      .addMatcher(isPending(...postThunks), (state) => {
        console.log("match maker")
        state.loading = true;
        state.error = null;
      })

      .addMatcher(isRejected(...postThunks), (state, action) => {
        console.log("is rejected match maker")

        state.loading = false;
        state.error = action.payload;
      });


  },
});

export const { toggleLikeOptimistic, addCommentOptimistic } = postSlice.actions
export default postSlice.reducer;








