import styled from "styled-components";
import { Avatar, Post, FlexBox } from "../components";
import { FaakePostData } from "./Feed";
import { BsArrowLeft } from "react-icons/bs";
import { useEffect, useState } from "react";
import { fetchPost } from "../features/post/PostSlice";
import { useSelector } from "react-redux";

const PostPage = (postId) => {
  useEffect(() => {
    fetchPost({ postId });
  });
  const { post } = useSelector((state) => state.post);
  return (
    <div>
      <FlexBox
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <BsArrowLeft size="25" style={{ cursor: "pointer" }} />
        <h3>Comments</h3>
        <div></div>
      </FlexBox>
      <div>
        <Post {...post} />
      </div>
      <CommentsWrapper>
        {post?.comments?.map((comment) => (
          <div>
            <FlexBox
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Avatar
                size="2rem"
                src={comment?.user?.profilePicture}
                alt="profilePic"
                style={{ marginRight: "1rem" }}
              />

              <FlexBox flexDirection="column" alignItems="flex-start">
                <h5 style={{ marginTop: "0", marginBottom: "0.1rem" }}>
                  {comment?.user?.name}
                </h5>
                <p
                  style={{ fontSize: "0.5rem", opacity: "0.6", marginTop: "0" }}
                >
                  {new Date(comment?.time)}
                </p>
                <p style={{ fontSize: "0.8rem", marginTop: "0" }}>
                  {comment?.comment}
                </p>
              </FlexBox>
            </FlexBox>
          </div>
        ))}
      </CommentsWrapper>
      <CommentInputWrapper>
        <div style={{ position: "relative", width: "85%", margin: "auto" }}>
          <form action="">
            <CommentInput type="text" placeholder="Type your comment here..." />
            <div
              style={{
                position: "absolute",
                right: "5%",
                color: "#7C37A6",
                top: "18%",
                fontWeight: "600",
              }}
            >
              Post
            </div>
          </form>
        </div>
      </CommentInputWrapper>
    </div>
  );
};

const inputPostWrapper = styled.div`
  position: relative;
  width: 85%;
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
  width: 95%;
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
  background: white;
`;

export default PostPage;
