import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import theme from "../features/themeSlice.js";
import user from "../features/userSlice.js";
import postReducer from "../features/postSlice.js";
import adminUsersReducer from "../features/AdminSlices/adminUsersSlice.js"
import adminUsersPostsReducer from "../features/AdminSlices/adminPostsSlice.js"
import adminAuthReducer from "../features/AdminSlices/adminAuthSlice.js"
const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: theme,
    user: user,
    posts: postReducer,
    adminAuth:adminAuthReducer,
    adminUsers: adminUsersReducer, 
    adminUsersPosts:adminUsersPostsReducer
  },
});

export { store };
