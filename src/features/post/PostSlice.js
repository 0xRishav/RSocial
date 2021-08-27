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
  error: "",
};

export const uploadPostPhoto = createAsyncThunk(
  "post/uploadPostPhoto",
  async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file, file.name);
      const response = await postApi.uploadPostPicture(formData);
      if (response.status === 200) {
        return {
          url: response.data.data.url,
          public_id: response.data.data.public_id,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  }
);

export const createPost = createAsyncThunk("post/createPost", async (body) => {
  try {
    const response = await postApi.createPost(body);
    if (response.status === 200) {
      return {
        post: response.data.post,
      };
    }
  } catch (error) {
    return {
      error,
    };
  }
});

export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async () => {
    try {
      const response = await postApi.fetchALlPosts();
      if (response.status === 200) {
        return {
          feed: response.data.data.posts,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  "post/fetchUserPosts",
  async () => {
    try {
      const response = await postApi.fetchUserPosts();
      if (response.status === 200) {
        return {
          feed: response.data.data.posts,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  }
);
export const fetchPost = createAsyncThunk("post/fetchPost", async (body) => {
  try {
    const response = await postApi.fetchPost(body);
    if (response.status === 200) {
      return {
        post: response.data.data.populatedPost,
        isPostLiked: response.data.data.isPostLiked,
      };
    }
  } catch (error) {
    return {
      error,
    };
  }
});
export const likeDislikePost = createAsyncThunk(
  "post/likeDislikePost",
  async (body) => {
    try {
      const response = await postApi.likeDislikePost(body);
      if (response.status === 200) {
        return {
          post: response.data.data.post,
          isPostLiked: response.data.data.isPostLiked,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  }
);
export const createComment = createAsyncThunk(
  "post/createComment",
  async (body) => {
    try {
      const response = await postApi.createComment(body);
      if (response.status === 200) {
        return {
          newPost: response.data.data.newPost,
          newComments: response.data.data.comments,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [uploadPostPhoto.fulfilled]: (state, { payload }) => {
      state.photoUrl = payload.photoUrl;
      state.photoPublicId = payload.public_id;
      state.loading = false;
    },
    [uploadPostPhoto.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
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
      state.error = payload.error;
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
      state.error = payload.error;
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
      state.error = payload.error;
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
      state.error = payload.error;
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
      state.error = payload.error;
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
      state.error = payload.error;
    },
    [createComment.pending]: (state, { payload }) => {
      state.loading = true;
    },
  },
});

export default postSlice.reducer;
