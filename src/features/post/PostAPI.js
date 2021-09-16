import axios from "axios";

const baseUrl = "https://rsocial-api.herokuapp.com/post";
// const baseUrl = "http://localhost:4000/post";

export const postApi = {
  uploadPostPicture: async (formData) => {
    return axios.post(`${baseUrl}/upload-photo`, formData);
  },
  fetchPost: async (body) => {
    return axios.post(`${baseUrl}/fetch-post`, body);
  },
  deletePost: async (body) => {
    return axios.post(`${baseUrl}/delete-post`, body);
  },
  createComment: async (body) => {
    return axios.post(`${baseUrl}/create-comment`, body);
  },
  createPost: async (body) => {
    return axios.post(`${baseUrl}/create-post`, body);
  },
  likeDislikePost: async (body) => {
    return axios.post(`${baseUrl}/like/toggle`, body);
  },
  fetchALlPosts: async () => {
    return axios.get(`${baseUrl}/fetch-all-posts`);
  },
  fetchUserPosts: async () => {
    return axios.get(`${baseUrl}/fetch-user-posts`);
  },
};
