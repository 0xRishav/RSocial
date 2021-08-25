import styled from "styled-components";
import { Avatar, Post, FlexBox } from "../components";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import {
  fetchPost,
  createComment,
  fetchAllPosts,
} from "../features/post/PostSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import Loader from "react-loader";
import { useHistory } from "react-router";
import { fetchParticularUser } from "../features/user/UserSlice";
import { defaultProfilePicture, loaderOptions } from "../utils/utils";

const PostPage = () => {
  const [postComments, setPostComments] = useState([]);
  const commentsEndRef = useRef(null);
  const history = useHistory();

  const { post, loading } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const { postId } = useParams();

  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    const body = { postId: postId };
    dispatch(fetchPost(body));
  }, []);

  const handleInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ postId: postId, comment: commentInput }));
  };

  const scrollToBottom = () => {
    commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [postComments]);

  return (
    <div>
      {<Loader loaded={!loading} options={loaderOptions} />}
      <PostPageWrapper>
        <FlexBox
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BsArrowLeft
            onClick={history.goBack}
            size="25"
            style={{ cursor: "pointer" }}
          />
          <h3>Comments</h3>
          <div></div>
        </FlexBox>
        <div>
          <Post {...post} />
        </div>
        <CommentsWrapper>
          {post?.comments?.map((comment, i) => (
            <div key={i}>
              <FlexBox
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Avatar
                  size="2rem"
                  src={
                    comment?.user?.profilePicture
                      ? comment?.user?.profilePicture
                      : defaultProfilePicture
                  }
                  alt="profilePic"
                  style={{ marginRight: "1rem" }}
                />

                <FlexBox flexDirection="column" alignItems="flex-start">
                  <h5 style={{ marginTop: "0", marginBottom: "0.1rem" }}>
                    {comment?.user?.name}
                  </h5>
                  <p
                    style={{
                      fontSize: "0.5rem",
                      opacity: "0.6",
                      marginTop: "0",
                    }}
                  >
                    {/* {new Date(comment?.time)} */}
                    "A while ago"
                  </p>
                  <p style={{ fontSize: "0.8rem", marginTop: "0" }}>
                    {comment?.comment}
                  </p>
                </FlexBox>
              </FlexBox>
            </div>
          ))}
        </CommentsWrapper>
      </PostPageWrapper>
      <CommentInputWrapper>
        <div style={{ position: "relative", width: "85%", margin: "auto" }}>
          <form action="" onSubmit={handleCommentSubmit}>
            <CommentInput
              onChange={handleInputChange}
              type="text"
              placeholder="Type your comment here..."
            />
            <button
              type="submit"
              style={{
                position: "absolute",
                right: "5%",
                color: "#7C37A6",
                top: "20%",
                fontWeight: "600",
                border: "none",
                background: "transparent",
              }}
            >
              Post
            </button>
          </form>
        </div>
        {/* <input
          type="text"
          placeholder="Comment"
          style={{ width: "90%", margin: "auto" }}
        /> */}
        <div ref={commentsEndRef} />
      </CommentInputWrapper>
    </div>
  );
};

const inputPostWrapper = styled.div`
  position: relative;
  width: 90%;
  margin: auto;
`;

const postBtn = styled.div`
  position: absolute;
  right: 0;
  color: blue;
  top: 50%;
`;

const CommentsWrapper = styled.div`
  width: 90%;
  margin-top: auto;
  padding: 5%;
  margin-bottom: 2rem;
`;
const CommentInput = styled.input`
  width: 100%;
  /* left: 5%; */
  padding-left: 2.5%;
  padding-right: 2.5%;
  border: black solid 1px;
  border-radius: 3rem;
  height: 2rem;
  outline: unset;
  bottom: 2rem;
  /* position: absolute; */
`;
const CommentInputWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 90%;
  height: 3rem;
  background: transparent;
  margin: "auto";
  left: 50%;
  transform: translate(-50%, 0);

  @media (min-width: 725px) {
    width: 60%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
`;

const PostPageWrapper = styled.div`
  width: 90%;
  /* position: relative; */
  margin: auto;
  @media (min-width: 725px) {
    width: 60%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
`;

export default PostPage;
