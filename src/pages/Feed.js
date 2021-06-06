import { Button, Logo, Post } from "../components";
import { NavDiv } from "./Landing";
import { BiPaperPlane } from "react-icons/bi";

const Feed = () => {
  // const fakePostData = [
  //   {
  //     username: "priyantan_josh_2000",
  //     location: "West Bengal",
  //     caption:
  //       "Endless Journey, A journey which is never be end. The shot taken in Samsung M31s",
  //     photo:
  //       "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
  //     profilePic:
  //       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
  //     likes: 22,
  //     comments: [
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //     ],
  //   },
  // ];

  // const newFakePostData = [
  //   {
  //     username: "priyantan_josh_2000",
  //     location: "West Bengal",
  //     caption:
  //       "Endless Journey, A journey which is never be end. The shot taken in Samsung M31s",
  //     photo:
  //       "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
  //     profilePic:
  //       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
  //     likes: 22,
  //     comments: [
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //       "Hey nice click",
  //     ],
  //   },
  // ];

  const FaakePostData = [
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
  ];
  FaakePostData.map((post) => console.log("mapped"));
  return (
    <div>
      <NavDiv>
        <Logo />
        <BiPaperPlane size={25} />
      </NavDiv>
      {FaakePostData.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default Feed;
