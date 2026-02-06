import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import theme from "../features/themeSlice.js";
import user from "../features/userSlice.js";
import postReducer from "../features/postSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: theme,
    user: user,
    posts: postReducer,
  },
});

export { store };
