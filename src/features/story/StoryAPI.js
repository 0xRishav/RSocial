// all-stories
import axios from "axios";

const baseUrl = "https://rsocial-api.herokuapp.com/story";

export const storyApi = {
  fetchAllStories: async () => {
    return await axios.get(`${baseUrl}/all-stories`);
  },
  createStory: async (formData) => {
    return await axios.post(`${baseUrl}/upload-story`, formData);
  },
};
