import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storyApi } from "./StoryAPI";

const initialState = {
  story: {},
  allStories: [],
  loading: false,
  errMessage: "",
};

export const createStory = createAsyncThunk(
  "story/createStory",
  async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file, file.name);
      const response = await storyApi.createStory(formData);
      if (response.status === 200) {
        return {
          story: response.data.data.story,
        };
      }
    } catch (error) {
      return {
        errMessage: error.errMessage,
      };
    }
  }
);

export const fetchAllStories = createAsyncThunk(
  "story/fetchAllStories",
  async () => {
    try {
      const response = await storyApi.fetchAllStories();
      if (response.status === 200) {
        return {
          allStories: response.data.data.activeStories,
        };
      }
    } catch (error) {
      return {
        errMessage: error.errMessage,
      };
    }
  }
);

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: {
    [createStory.fulfilled]: (state, { payload }) => {
      state.story = payload.story;
      state.loading = false;
    },
    [createStory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.message;
    },
    [createStory.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [fetchAllStories.fulfilled]: (state, { payload }) => {
      state.allStories = payload.allStories;
      state.loading = false;
    },
    [fetchAllStories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.message;
    },
    [fetchAllStories.pending]: (state, { payload }) => {
      state.loading = true;
    },
  },
});

export default storySlice.reducer;
