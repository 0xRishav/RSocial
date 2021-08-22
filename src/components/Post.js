import { Avatar } from ".";
import { useState } from "react";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TiArrowForwardOutline } from "react-icons/ti";
import { RiChat3Line } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useEffect } from "react";
import { likeDislikePost } from "../features/post/PostSlice";
import StyledLink from "./StyledLink";
import FlexBox from "./FlexBox";
import { defaultProfilePicture } from "../utils/utils";

const Post = ({
  user,
  caption,
  likes,
  comments,
  photoUrl,
  _id,
  onHomePage,
}) => {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  // console.log(user);

  // const [isLiked, setisLiked] = useState(false);
  // console.log("likes", likes?.length);
  // useEffect(() => {
  //   const isLiked = checkIsLiked();
  //   setisLiked(isLiked);
  // }, [likes]);

  console.log(postState.isPostLiked);

  const filteredLikedArray = postState?.post?.likes?.filter(
    (like) => like?.user?._id === user?._id
  );
  console.log("filteredLikedArray", postState.isPostLiked);

  const handleLikeToggle = () => {
    dispatch(likeDislikePost({ likeableId: _id, type: "Post" }));
  };

  // function checkIsLiked() {
  //   var i;
  //   for (i = 0; i < likes.length; i++) {
  //     if (likes[i] === user._id) {
  //       return true;
  //     }
  //   }

  //   return false;
  // }
  return (
    <div>
      {postState.loading && <h1>Loading</h1>}
      <HorizonatalDivider />
      <NameOptionWrapper>
        <NameOptionWrapper>
          <Avatar
            src={
              user?.profilePicture
                ? user?.profilePicture
                : defaultProfilePicture
            }
            size="2rem"
          />
          <AuthorInfoWrapper style={{ marginLeft: "1rem" }}>
            <div style={{ fontWeight: "bold" }}>Rishav Bharti</div>
            <div style={{ fontSize: "0.8rem" }}>India</div>
          </AuthorInfoWrapper>
        </NameOptionWrapper>
      </NameOptionWrapper>
      {photoUrl && <PostImg src={photoUrl} />}
      <p style={{ textAlign: "left" }}>
        <span style={{ fontWeight: "bold", marginRight: "0.5rem" }}>
          {user?.username}
        </span>
        {caption}
      </p>
      {onHomePage ? (
        <div>
          <Link
            to={`/post-page/${_id}`}
            style={{
              display: "flex",
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
            }}
            params={{ postId: _id }}
          >
            <FlexBox
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <div style={{ fontWeight: "600" }}>Like or Comment</div>
              <BsArrowRight style={{ marginLeft: "0.5rem" }} />
            </FlexBox>
          </Link>
        </div>
      ) : (
        <ReactiontWrapper>
          <ReactiontItemWrapper>
            {postState.isPostLiked ? (
              <AiFillHeart
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
                size={20}
                color="red"
                onClick={handleLikeToggle}
              />
            ) : (
              <AiOutlineHeart
                style={{ marginRight: "0.5rem" }}
                size={20}
                onClick={handleLikeToggle}
              />
            )}
            <div style={{ cursor: "pointer" }}>{likes?.length}</div>
          </ReactiontItemWrapper>
          <ReactiontItemWrapper>
            <RiChat3Line style={{ marginRight: "0.5rem" }} size={20} />
            <div>{comments?.length}</div>
          </ReactiontItemWrapper>
        </ReactiontWrapper>
      )}
    </div>
  );
};

const NameOptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AuthorInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const PostImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  margin-top: 1rem;
  border-radius: 0.8rem;
`;

const ReactiontWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
  width: 95%;
  margin: 1rem auto;
`;
const ReactiontItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1.5rem;
`;

const HorizonatalDivider = styled.div`
  height: 0.1rem;
  width: 100%;
  background: #f0f0f0;
  margin: 1rem auto;
`;

export default Post;
