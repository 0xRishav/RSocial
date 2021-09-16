import { BottomButtons, Button, Logo, Navbar, Post } from "../components";
import { NavDiv } from "./Landing";

import Story from "../features/story/Story";
import { fetchAllPosts } from "../features/post/PostSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";
import { loaderOptions } from "../utils/utils";
import Loader from "react-loader";
import ErrorBox from "../components/Error";

const Feed = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { feed, loading, errMessage } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {errMessage && <ErrorBox message={errMessage} delay="5000" />}
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
