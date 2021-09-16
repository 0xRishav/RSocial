// all-stories
import axios from "axios";

const baseUrl = "https://RSocial-API.shubham1121.repl.co/story";
// const baseUrl = "http://localhost:4000/story";
export const storyApi = {
  fetchAllStories: async () => {
    return await axios.get(`${baseUrl}/all-stories`);
  },
  createStory: async (formData) => {
    return await axios.post(`${baseUrl}/upload-story`, formData);
  },
};
