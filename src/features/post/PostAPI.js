import axios from "axios";

const baseUrl =
  "http://ec2-3-14-143-74.us-east-2.compute.amazonaws.com:4000/post";
// "http://localhost:4000/post";

export const postApi = {
  uploadPostPicture: async (formData) => {
    return axios.post(`${baseUrl}/upload-photo`, formData);
  },
  fetchPost: async (body) => {
    return axios.post(`${baseUrl}/fetch-post`, body);
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
