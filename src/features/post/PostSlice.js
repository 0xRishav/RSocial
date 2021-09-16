import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "./PostAPI";

const initialState = {
  feed: [],
  userPosts: [],
  post: {},
  isPostLiked: null,
  photoUrl: "",
  photoPublicId: "",
  loading: false,
  errMessage: null,
};

export const uploadPostPhoto = createAsyncThunk(
  "post/uploadPostPhoto",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file, file.name);
      const response = await postApi.uploadPostPicture(formData);
      if (response.status === 200) {
        return {
          url: response.data.data.url,
          public_id: response.data.data.public_id,
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

export const createPost = createAsyncThunk(
  "post/createPost",
  async (body, { rejectWithValue }) => {
    try {
      const response = await postApi.createPost(body);
      if (response.status === 200) {
        return {
          post: response.data.post,
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

export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postApi.fetchALlPosts();
      if (response.status === 200) {
        return {
          feed: response.data.data.posts,
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

export const fetchUserPosts = createAsyncThunk(
  "post/fetchUserPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postApi.fetchUserPosts();
      if (response.status === 200) {
        return rejectWithValue({
          errMessage: response.data.message,
        });
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
export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (body, { rejectWithValue }) => {
    try {
      const response = await postApi.fetchPost(body);
      if (response.status === 200) {
        return {
          post: response.data.data.populatedPost,
          isPostLiked: response.data.data.isPostLiked,
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
export const likeDislikePost = createAsyncThunk(
  "post/likeDislikePost",
  async (body, { rejectWithValue }) => {
    try {
      const response = await postApi.likeDislikePost(body);
      if (response.status === 200) {
        return {
          post: response.data.data.post,
          isPostLiked: response.data.data.isPostLiked,
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
export const createComment = createAsyncThunk(
  "post/createComment",
  async (body, { rejectWithValue }) => {
    try {
      const response = await postApi.createComment(body);
      if (response.status === 200) {
        return {
          newPost: response.data.data.newPost,
          newComments: response.data.data.comments,
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

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (body, { rejectWithValue }) => {
    try {
      const response = await postApi.deletePost(body);
      if (response.status === 200) {
        return {
          postDeleted: true,
          postId: body.postId,
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

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostErrorNull: (state) => {
      state.errMessage = null;
    },
  },
  extraReducers: {
    [uploadPostPhoto.fulfilled]: (state, { payload }) => {
      state.photoUrl = payload.photoUrl;
      state.photoPublicId = payload.public_id;
      state.loading = false;
    },
    [uploadPostPhoto.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.errMessage;
    },
    [uploadPostPhoto.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.post = payload.post;
      state.loading = false;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.errMessage;
    },
    [createPost.pending]: (state, { payload }) => {
      state.loading = true;
    },

    [fetchAllPosts.fulfilled]: (state, { payload }) => {
      state.feed = payload.feed;
      state.loading = false;
    },
    [fetchAllPosts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.errMessage;
    },
    [fetchAllPosts.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [fetchUserPosts.fulfilled]: (state, { payload }) => {
      state.userPosts = payload.feed;
      state.loading = false;
    },
    [fetchUserPosts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.errMessage;
    },
    [fetchUserPosts.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [fetchPost.fulfilled]: (state, { payload }) => {
      state.post = payload.post;
      state.isPostLiked = payload.isPostLiked;
      state.loading = false;
    },
    [fetchPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.errMessage;
    },
    [fetchPost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [likeDislikePost.fulfilled]: (state, { payload }) => {
      const index = state.feed.findIndex(
        (post) => post._id === payload.post._id
      );
      console.log("post", payload.post);
      state.feed[index] = payload.post;
      state.isPostLiked = payload.isPostLiked;
      state.loading = false;
    },
    [likeDislikePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.errMessage;
    },
    [likeDislikePost.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.post.comments = payload.newComments;
      state.loading = false;
    },
    [createComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.errMessage;
    },
    [createComment.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      if (payload.postDeleted) {
        const index = state.feed.findIndex(
          (post) => post._id === payload.post._id
        );
        state.feed.splice(index, 1);
      }

      state.loading = false;
    },
    [deletePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.errMessage = payload.errMessage;
    },
    [deletePost.pending]: (state, { payload }) => {
      state.loading = true;
    },
  },
});

export const { setPostErrorNull } = postSlice.actions;
export default postSlice.reducer;
