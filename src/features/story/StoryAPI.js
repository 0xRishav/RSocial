// all-stories
import axios from "axios";

const baseUrl =
  "http://ec2-3-14-143-74.us-east-2.compute.amazonaws.com:4000/story";

export const storyApi = {
  fetchAllStories: async () => {
    return await axios.get(`${baseUrl}/all-stories`);
  },
  createStory: async (formData) => {
    return await axios.post(`${baseUrl}/upload-story`, formData);
  },
};
