import { BottomButtons, Button, Loader, Logo, Post } from "../components";
import { NavDiv } from "./Landing";
import { BiPaperPlane } from "react-icons/bi";
import Likes from "../components/Likes";
import Story from "../features/story/Story";
import { fetchAllStories } from "../features/story/StorySlice";
import { fetchAllPosts } from "../features/post/PostSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchAllStories());
  }, []);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);
  FaakePostData.map((post) => console.log("mapped"));
  return (
    <div style={{ width: "100%" }}>
      <NavDiv>
        <Logo />
        {/* <BiPaperPlane size={25} /> */}
      </NavDiv>
      {/* <Story /> */}
      {feed.map((post, index) => (
        <Post key={index} {...post} />
      ))}
      <div style={{ marginBottom: "5rem" }} />
      <BottomButtons />
    </div>
  );
};

export const FaakePostData = [
  {
    name: "Rishav Bharti",
    username: "rishavbharti1",
    location: "Gwalior",
    caption:
      "Endless Journey, A journey which is never be end. The shot taken in Samsung M31s",
    photo:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    likes: 22,
    comments: [
      {
        name: "Shubham Devrani",
        profile:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        comment: "Perfect alignment",
        time: "2 hours ago",
      },
      {
        name: "Shubham Devrani",
        profile:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        comment: "Perfect alignment",
        time: "2 hours ago",
      },
      {
        name: "Shubham Devrani",
        profile:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        comment: "Perfect alignment",
        time: "2 hours ago",
      },
      {
        name: "Shubham Devrani",
        profile:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        comment: "Perfect alignment",
        time: "2 hours ago",
      },
      {
        name: "Shubham Devrani",
        profile:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        comment: "Perfect alignment",
        time: "2 hours ago",
      },
      {
        name: "Shubham Devrani",
        profile:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        comment: "Perfect alignment",
        time: "2 hours ago",
      },
    ],
  },
  {
    name: "Rishav Bharti",
    username: "rishavbharti1",
    location: "Gwalior",
    caption:
      "Endless Journey, A journey which is never be end. The shot taken in Samsung M31s",
    photo:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    likes: 22,
    comments: [
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
    ],
  },
  {
    name: "Rishav Bharti",
    username: "rishavbharti1",
    location: "Gwalior",
    caption:
      "Endless Journey, A journey which is never be end. The shot taken in Samsung M31s",
    photo:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    likes: 22,
    comments: [
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
    ],
  },
  {
    name: "Rishav Bharti",
    username: "rishavbharti1",
    location: "Gwalior",
    caption:
      "Endless Journey, A journey which is never be end. The shot taken in Samsung M31s",
    photo:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    likes: 22,
    comments: [
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
    ],
  },
  {
    name: "Rishav Bharti",
    username: "rishavbharti1",
    location: "Gwalior",
    caption:
      "Endless Journey, A journey which is never be end. The shot taken in Samsung M31s",
    photo:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    likes: 22,
    comments: [
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
    ],
  },
  {
    name: "Rishav Bharti",
    username: "rishavbharti1",
    location: "Gwalior",
    caption:
      "Endless Journey, A journey which is never be end. The shot taken in Samsung M31s",
    photo:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    profilePic:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    likes: 22,
    comments: [
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
      "You are good bro",
    ],
  },
];

export default Feed;
