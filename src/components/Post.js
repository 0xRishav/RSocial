import { Avatar } from ".";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { RiChat3Line } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { deletePost, likeDislikePost } from "../features/post/PostSlice";
import FlexBox from "./FlexBox";
import { defaultProfilePicture } from "../utils/utils";
import { loaderOptions } from "../utils/utils";
import Loader from "react-loader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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
  const userState = useSelector((state) => state.user);

  const index = likes?.findIndex(
    (like) => like?.user?._id === userState?.user?._id
  );

  // console.log(user._id);
  console.log(userState.user._id);

  const handleLikeToggle = () => {
    dispatch(likeDislikePost({ likeableId: _id, type: "Post" }));
  };

  // const handlePostDelete = () => {
  //   const body = { postId: _id };
  //   dispatch(deletePost(body));
  // };

  return (
    <div>
      {<Loader loaded={!postState.loading} options={loaderOptions} />}
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

      {photoUrl && (
        <div>
          <img
            src={photoUrl}
            style={{
              objectFit: "cover",
              marginTop: "1rem",
              borderRadius: "0.8rem",
              width: "100%",
              height: "auto",
              // boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
              boxShadow: "rgba(0, 0, 0, 0.30) 0px 22px 70px 4px",
            }}
          />
        </div>
      )}
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
          <FlexBox
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ width: "27%" }}
          >
            <ReactiontItemWrapper>
              <LikeCommentDiv
                onClick={handleLikeToggle}
                style={{ cursor: "pointer" }}
              >
                {index !== -1 ? (
                  <AiFillHeart
                    style={{ marginRight: "0.5rem", cursor: "pointer" }}
                    size={20}
                    color="red"
                  />
                ) : (
                  <AiOutlineHeart
                    style={{ marginRight: "0.5rem", cursor: "pointer" }}
                    size={20}
                  />
                )}
                <div style={{ cursor: "pointer" }}>{likes?.length}</div>
              </LikeCommentDiv>
            </ReactiontItemWrapper>
            <LikeCommentDiv style={{ cursor: "pointer" }}>
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
                <RiChat3Line style={{ marginRight: "0.5rem" }} size={20} />
                <div>{comments?.length}</div>
              </Link>
            </LikeCommentDiv>
            <ReactiontItemWrapper></ReactiontItemWrapper>
          </FlexBox>

          {false && <AiOutlineDelete size={20} />}
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

const LikeCommentDiv = styled.div`
  padding: 0.5rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  justify-content: space-between;
  margin-top: 1rem;
  width: 95%;
  margin: 1rem auto;
`;
const ReactiontItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1.5rem;
  width: 27%;
`;

const HorizonatalDivider = styled.div`
  height: 0.1rem;
  width: 100%;
  background: #f0f0f0;
  margin: 1rem auto;
`;

export default Post;
