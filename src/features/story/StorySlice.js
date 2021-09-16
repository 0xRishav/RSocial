import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storyApi } from "./StoryAPI";

const initialState = {
  story: {},
  allStories: [],
  loading: false,
  errMessage: null,
};

export const createStory = createAsyncThunk(
  "story/createStory",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file, file.name);
      const response = await storyApi.createStory(formData);
      if (response.status === 200) {
        return {
          story: response.data.data.story,
        };
      } else {
        return rejectWithValue({
          errMessage: response.data.message,
        });
      }
    } catch (error) {
      return rejectWithValue({
        errMessage: error.response.data.message,
      });
    }
  }
);

export const fetchAllStories = createAsyncThunk(
  "story/fetchAllStories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await storyApi.fetchAllStories();
      if (response.status === 200) {
        return {
          allStories: response.data.data.activeStories,
        };
      } else {
        return rejectWithValue({
          errMessage: response.data.message,
        });
      }
    } catch (error) {
      return rejectWithValue({
        errMessage: error.response.data.message,
      });
    }
  }
);

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setStoryErrorNull: (state) => {
      state.errMessage = null;
    },
  },
  extraReducers: {
    [createStory.fulfilled]: (state, { payload }) => {
      state.story = payload.story;
      state.loading = false;
    },
    [createStory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.errMessage;
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
      state.errMessage = payload.errMessage;
    },
    [fetchAllStories.pending]: (state, { payload }) => {
      state.loading = true;
    },
  },
});
export const { setStoryErrorNull } = storySlice.actions;

export default storySlice.reducer;
