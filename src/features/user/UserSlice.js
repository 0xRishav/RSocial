import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "./UserApi";

const initialState = {
  user: {},
  fetchedUser: {},
  allUsers: [],
  accessToken: null,
  refreshToken: null,
  error: "",
  loading: false,
  errMessage: "",
};

export const signinUser = createAsyncThunk(
  "user/signinUser",
  async (userDetails) => {
    try {
      const response = await userApi.login(userDetails);
      if (response.status === 200) {
        return {
          user: response.data.data.user,
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
        };
      } else {
        return {
          message: response.message,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (userDetails) => {
    try {
      const response = await userApi.signup(userDetails);
      if (response.status === 200) {
        return {
          user: response.data.data.user,
          accessToken: response.data.data.accessToken,
          refreshToken: response.data.data.refreshToken,
        };
      } else {
        return {
          message: response.message,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file, file.name);
      const response = await userApi.uploadProfilePicture(formData);
      if (response.status === 200) {
        return {
          user: response.data.data.user,
        };
      } else {
        return { message: response.message };
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const uploadCoverPicture = createAsyncThunk(
  "user/uploadCoverPicture",
  async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file, file.name);
      const response = await userApi.uploadCoverPicture(formData);
      if (response.status === 200) {
        return {
          user: response.data.data.user,
        };
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    try {
      const response = await userApi.fetchAllUsers();
      if (response.status === 200) {
        return {
          allUsers: response.data.data.allUsers,
        };
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchParticularUser = createAsyncThunk(
  "user/fetchParticularUser",
  async (userId) => {
    try {
      const response = await userApi.fetchParticularUser(userId);
      if (response.status === 200) {
        return {
          fetchedUser: response.data.data.user,
        };
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        user: {},
        accessToken: "",
        refreshToken: "",
        error: "",
        loading: false,
      };
    },
    setUserFromLocalStorage: (state, action) => {
      let user;
      const jsonUser = localStorage.getItem("user");
      if (jsonUser) {
        user = JSON.parse(jsonUser);
      }
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (user !== {} && accessToken !== "" && refreshToken !== "") {
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      }
    },
  },
  extraReducers: {
    [signinUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.user._id;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.loading = false;
      state.new = "anything";
    },
    [signinUser.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.message;
    },
    [signinUser.pending]: (state, action) => {
      state.loading = true;
    },

    [signupUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.user._id;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.loading = false;
      state.new = "anything";
    },
    [signupUser.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.message;
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },

    [uploadProfilePicture.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.userId = action.payload.user._id;
      state.loading = false;
    },
    [uploadProfilePicture.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.message;
    },
    [uploadProfilePicture.pending]: (state, action) => {
      state.loading = true;
    },

    [uploadCoverPicture.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.loading = false;
    },
    [uploadCoverPicture.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.message;
    },
    [uploadCoverPicture.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload.allUsers;
      state.loading = false;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.message;
    },
    [fetchAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchParticularUser.fulfilled]: (state, action) => {
      state.fetchedUser = action.payload.fetchedUser;
      state.loading = false;
    },
    [fetchParticularUser.rejected]: (state, action) => {
      state.loading = false;
      state.errMessage = action.payload.message;
    },
    [fetchParticularUser.pending]: (state, action) => {
      state.loading = true;
    },
  },
});

export const { logoutUser, setUserFromLocalStorage } = userSlice.actions;

export default userSlice.reducer;
