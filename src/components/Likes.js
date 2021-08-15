import styled from "styled-components";
import { FaakePostData } from "../pages/Feed";
import Avatar from "./Avatar";
import FlexBox from "./FlexBox";
import { Link } from "react-router-dom";
import Button from "./Button";

const Likes = () => {
  return (
    <div style={{ marginTop: "2rem" }}>
      {FaakePostData[0].comments.map((comment, i) => (
        <LikesWrapper key={i}>
          <FlexBox
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Avatar src={comment.profile} size="3rem" />
            <FlexBox
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Link>{comment.name}</Link>
              <div style={{ opacity: "0.5" }}>username</div>
            </FlexBox>
            <Button primary text="Follow" padding="0.3rem 1rem" />
          </FlexBox>
        </LikesWrapper>
      ))}
    </div>
  );
};

const LikesWrapper = styled.div`
  margin: 1rem 0;
`;

export default Likes;
