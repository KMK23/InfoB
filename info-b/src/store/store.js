import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postsReducer from "./slices/postsSlice";
import noticesReducer from "./slices/noticesSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    notices: noticesReducer,
  },
});

export default store;
