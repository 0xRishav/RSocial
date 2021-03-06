import axios from "axios";

const baseUrl = "https://RSocial-API.rishavbharti1.repl.co/user";
// const baseUrl = "http://localhost:4000/user";

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
    return response;
  },
  async function (error) {
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
  follow: async (body) => {
    return await axios.post(`${baseUrl}/follow`, body);
  },
  unfollow: async (body) => {
    return await axios.post(`${baseUrl}/unfollow`, body);
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
