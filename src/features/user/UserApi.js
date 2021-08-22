import axios from "axios";

const baseUrl =
  // "http://ec2-3-14-143-74.us-east-2.compute.amazonaws.com:3000/user";
  "http://localhost:4000/user";

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    console.log("NEW RES", response);
    return response;
  },
  async function (error) {
    console.log("NEW ERROR", error);
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${baseUrl}/generate-access-tokens`, {
          refreshToken: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log("Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export const userApi = {
  signup: async (body) => {
    return await axios.post(`${baseUrl}/signup`, body);
  },
  login: async (body) => {
    return await axios.post(`${baseUrl}/login`, body);
  },
  fetchParticularUser: async (userId) => {
    return await axios.post(`${baseUrl}/fetch-particular-user/${userId}`);
  },
  fetchAllUsers: async () => {
    return await axios.get(`${baseUrl}/fetch-all-users`);
  },
  generateAccessToken: async (body) => {
    return await axios.post(`${baseUrl}/generate-refresh-tokens`, body);
  },
  logout: async (body) => {
    return await axios.post(`${baseUrl}/logout`, body);
  },
  uploadProfilePicture: async (formData) => {
    return await axios.post(`${baseUrl}/upload-profile-picture`, formData);
  },
  uploadCoverPicture: async (formData) => {
    return await axios.post(`${baseUrl}/upload-cover-picture`, formData);
  },
};
