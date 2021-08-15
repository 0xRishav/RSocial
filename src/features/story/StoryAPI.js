// all-stories
import axios from "axios";

// const baseUrl = "http://localhost:4000/story";
"http://ec2-3-14-143-74.us-east-2.compute.amazonaws.com:3000/story";

export const storyApi = {
  fetchAllStories: async () => {
    return await axios.get(`${baseUrl}/all-stories`);
  },
  fetchAllStories: async (formData) => {
    console.log("formdata from api", formData)
    return await axios.post(`${baseUrl}/upload-story`, formData);
  },
};
