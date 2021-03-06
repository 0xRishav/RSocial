import styled from "styled-components";
import { Avatar, Post, FlexBox } from "../components";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import { fetchPost, createComment } from "../features/post/PostSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import Loader from "react-loader";
import { useHistory } from "react-router";
import { defaultProfilePicture, loaderOptions } from "../utils/utils";
import ErrorBox from "../components/Error";

const PostPage = () => {
  // const commentsEndRef = useRef(null);
  const history = useHistory();

  const { post, loading, errMessage } = useSelector((state) => state.post);

  console.log(post);

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

  // const scrollToBottom = () => {
  //   commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(scrollToBottom, [post.comments]);

  return (
    <div>
      {errMessage && <ErrorBox message={errMessage} delay="5000" />}
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
        <CommentsInputDiv>
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
                right: "3%",
                color: "#7C37A6",
                top: "24%",
                fontWeight: "600",
                border: "none",
                background: "transparent",
              }}
            >
              Post
            </button>
          </form>
        </CommentsInputDiv>
        {/* <div ref={commentsEndRef} /> */}
      </CommentInputWrapper>
    </div>
  );
};

const CommentsWrapper = styled.div`
  width: 100%;
  margin-top: auto;
  padding: 5%;
  margin-bottom: 4rem;
  @media (min-width: 725px) {
    width: 60%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
`;
const CommentsInputDiv = styled.div`
  position: relative;
  width: 90%;
  margin: auto;
  @media (min-width: 725px) {
    width: 100%;
  }
  @media (min-width: 900px) {
    width: 100%;
  }
`;
const CommentInput = styled.input`
  width: 100%;
  border: black solid 1px;
  border-radius: 0.4rem;
  height: 2rem;
  outline: unset;
  bottom: 2rem;
  /* position: absolute; */
  ::-webkit-input-placeholder {
    padding-left: 1rem;
  }
  :-moz-placeholder {
    padding-left: 1rem;
  }
  ::-moz-placeholder {
    padding-left: 1rem;
  }
  :-ms-input-placeholder {
    padding-left: 1rem;
  }
`;
const CommentInputWrapper = styled.div`
  position: fixed;
  bottom: 2.5rem;
  width: auto;
  height: 3rem;
  background: transparent;
  margin: auto;
  left: 5%;
  right: 5%;

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
