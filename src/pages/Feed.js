import { BottomButtons, Button, Logo, Navbar, Post } from "../components";
import { NavDiv } from "./Landing";

import Story from "../features/story/Story";
import { fetchAllPosts } from "../features/post/PostSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";
import { loaderOptions } from "../utils/utils";
import Loader from "react-loader";

const Feed = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { feed, loading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);
  console.log("feed", feed);
  return (
    <div style={{ width: "100%" }}>
      {<Loader loaded={!loading} options={loaderOptions} />}
      {width > 725 ? (
        <Navbar />
      ) : (
        <NavDiv>
          <Logo />
        </NavDiv>
      )}

      <Story />
      {feed.map((post, index) => (
        <Post key={index} {...post} user={post.user} />
      ))}
      <div style={{ marginBottom: "5rem" }} />
      {width < 725 && <BottomButtons />}
    </div>
  );
};

export default Feed;
