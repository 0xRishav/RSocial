import { Avatar } from ".";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { TiArrowForwardOutline } from "react-icons/ti";
import { RiChat3Line } from "react-icons/ri";

import styled from "styled-components";

const Post = ({
  username,
  location,
  caption,
  photo,
  profilePic,
  likes,
  comments,
}) => {
  console.log(likes);
  return (
    <div>
      <HorizonatalDivider />
      <NameOptionWrapper>
        <NameOptionWrapper>
          <Avatar src={profilePic} size="2rem" />
          <AuthorInfoWrapper style={{ marginLeft: "1rem" }}>
            <div style={{ fontWeight: "bold" }}>Rishav Bharti</div>
            <div style={{ fontSize: "0.8rem" }}>{location}</div>
          </AuthorInfoWrapper>
        </NameOptionWrapper>

        <HiOutlineDotsCircleHorizontal size="25" />
      </NameOptionWrapper>
      {photo && <PostImg src={photo} />}
      <p style={{ textAlign: "left" }}>
        <span style={{ fontWeight: "bold", marginRight: "0.5rem" }}>
          {username}
        </span>
        {caption}
      </p>
      <ReactiontWrapper>
        <ReactiontItemWrapper>
          <AiOutlineHeart style={{ marginRight: "0.5rem" }} size={25} />
          <div>{likes}</div>
        </ReactiontItemWrapper>
        <ReactiontItemWrapper>
          <RiChat3Line style={{ marginRight: "0.5rem" }} size={25} />
          <div>{comments.length}</div>
        </ReactiontItemWrapper>
        <ReactiontItemWrapper>
          <TiArrowForwardOutline style={{ marginRight: "0.5rem" }} size={25} />
        </ReactiontItemWrapper>
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
