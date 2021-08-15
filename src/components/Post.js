import { Avatar } from ".";
import { useState } from "react";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TiArrowForwardOutline } from "react-icons/ti";
import { RiChat3Line } from "react-icons/ri";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Likes from "./Likes";

const Post = ({ user, caption, likes, comments, photoUrl, _id }) => {
  console.log(user);
  const [isLikeModalOpen, setIsLikeModalOpen] = useState(false);

  const location = { path: "/feed/post", state: { postId: _id } };

  const handleLikeModal = (action) => {
    action === "open" ? setIsLikeModalOpen(true) : setIsLikeModalOpen(false);
  };
  const likePost = () => {};
  return (
    <div>
      <Modal
        isOpen={isLikeModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => handleLikeModal("open")}
        style={{ position: "relative" }}
        contentLabel="Post Likes"
      >
        <AiFillCloseCircle
          onClick={() => handleLikeModal("close")}
          size="25"
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
        />
        <Likes />
      </Modal>
      <HorizonatalDivider />
      <NameOptionWrapper>
        <NameOptionWrapper>
          <Avatar src={user?.profilePicture} size="2rem" />
          <AuthorInfoWrapper style={{ marginLeft: "1rem" }}>
            <div style={{ fontWeight: "bold" }}>Rishav Bharti</div>
            <div style={{ fontSize: "0.8rem" }}>India</div>
          </AuthorInfoWrapper>
        </NameOptionWrapper>

        <HiOutlineDotsCircleHorizontal size="20" />
      </NameOptionWrapper>
      {photoUrl && <PostImg src={photoUrl} />}
      <p style={{ textAlign: "left" }}>
        <span style={{ fontWeight: "bold", marginRight: "0.5rem" }}>
          {user?.username}
        </span>
        {caption}
      </p>
      <ReactiontWrapper>
        <ReactiontItemWrapper>
          <AiOutlineHeart style={{ marginRight: "0.5rem" }} size={20} />
          <div onClick={likePost} style={{ cursor: "pointer" }}>
            {likes?.length}
          </div>
        </ReactiontItemWrapper>
        <ReactiontItemWrapper>
          <Link to="/post-page" params={{ postId: _id }}>
            <RiChat3Line style={{ marginRight: "0.5rem" }} size={20} />
            <div>{comments?.length}</div>
          </Link>
        </ReactiontItemWrapper>
        {/* <ReactiontItemWrapper>
          <TiArrowForwardOutline style={{ marginRight: "0.5rem" }} size={25} />
        </ReactiontItemWrapper> */}
      </ReactiontWrapper>
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
