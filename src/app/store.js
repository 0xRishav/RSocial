import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/UserSlice";
import postReducer from "../features/post/PostSlice";
import storyReducer from "../features/story/StorySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    post: postReducer,
    story: storyReducer,
  },
});
