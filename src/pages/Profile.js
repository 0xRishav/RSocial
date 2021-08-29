import styled from "styled-components";
import { useEffect, useState } from "react";
import { Avatar, BottomButtons, FlexBox, PostsGrid } from "../components";
import { useSelector } from "react-redux";
import { fetchUserPosts } from "../features/post/PostSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  fetchParticularUser,
  follow,
  unfollow,
} from "../features/user/UserSlice";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";
import DesktopButtons from "../components/DesktopButtons";
import { defaultCoverPicture, defaultProfilePicture } from "../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { StyledButton } from "../components/Button";
import { logoutUser } from "../features/user/UserSlice";
import ErrorBox from "../components/Error";

const Profile = () => {
  const { width } = useWindowDimensions();
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchParticularUser(userId));
  }, []);
  const { fetchedUser, loading, errMessage, user } = useSelector(
    (state) => state.user
  );
  const postState = useSelector((state) => state.post);
  let index;

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, []);

  const signOutUser = () => {
    dispatch(logoutUser());
  };

  index = user?.followings?.findIndex(
    (following) => following === fetchedUser?._id
  );

  console.log(user.followings);

  return (
    <div>
      {errMessage && <ErrorBox message={errMessage} delay="5000" />}
      <ProfileInfoWrapper>
        <LazyLoadImage
          src={
            fetchedUser.coverPicture
              ? fetchedUser.coverPicture
              : defaultCoverPicture
          }
          width="100%"
          alt="post-pic"
          effect="blur"
          style={{
            objectFit: "cover",
            overflowX: "hidden",
            height: "30vh",
          }}
        />
        {width > 725 ? (
          <FlexBox
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            // style={{ width: "90%", margin: "auto" }}
            style={{
              position: "absolute",
              top: "0rem",
              width: "90%",
              margin: "auto",
              left: "3rem",
            }}
          >
            <h2>{fetchedUser.username}</h2>
            <FlexBox
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <DesktopButtons />
              <StyledButton primary onClick={signOutUser}>
                Sign Out
              </StyledButton>
            </FlexBox>
          </FlexBox>
        ) : (
          <FlexBox
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            // style={{ width: "90%", margin: "auto" }}
            style={{
              position: "absolute",
              top: "0rem",
              width: "90%",
              margin: "auto",
              left: "5%",
            }}
          >
            <h2>{fetchedUser.username}</h2>
            <StyledButton primary onClick={signOutUser}>
              Sign Out
            </StyledButton>
          </FlexBox>
        )}
        <ProfileWrapper>
          <Avatar
            src={
              fetchedUser.profilePicture
                ? fetchedUser.profilePicture
                : defaultProfilePicture
            }
            size="6rem"
            alt="profile-pic"
            style={{
              position: "absolute",
              bottom: "-3rem",
              right: "calc(50%  - 3rem)",
            }}
          />
        </ProfileWrapper>
      </ProfileInfoWrapper>
      <ProfileWrapper>
        <h3 style={{ marginTop: "4rem" }}>{fetchedUser.name}</h3>
        {fetchedUser._id !== user._id &&
          (index === -1 ? (
            <StyledButton
              style={{ marginBottom: "1rem" }}
              primary
              onClick={() =>
                dispatch(follow({ userIdToFollow: fetchedUser._id }))
              }
            >
              Follow
            </StyledButton>
          ) : (
            <StyledButton
              style={{ marginBottom: "1rem" }}
              onClick={() =>
                dispatch(unfollow({ userIdToUnfollow: fetchedUser._id }))
              }
            >
              Unfollow
            </StyledButton>
          ))}
        <FlexBox
          justifyContent="space-between"
          alignItems="center"
          style={{ width: "50%", margin: "auto" }}
        >
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
          >
            <FollowHeading>Followers</FollowHeading>
            <p>{fetchedUser?.followers?.length}</p>
          </FlexBox>
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
          >
            <FollowHeading>Following</FollowHeading>
            <p>{fetchedUser?.followings?.length}</p>
          </FlexBox>
        </FlexBox>
        <p>{fetchedUser.bio}</p>

        <div style={{ marginTop: "1rem" }}>
          <h2 style={{ textAlign: "left" }}>Feed</h2>
          <PostsGrid postsType="User" />
          {postState.feed.length === 0 && <h1>0 Posts</h1>}
        </div>
      </ProfileWrapper>

      <div style={{ marginLeft: "5%" }}>{width < 725 && <BottomButtons />}</div>
    </div>
  );
};

const ProfileInfoWrapper = styled.div`
  position: relative;
`;

const FollowHeading = styled.div`
  font-weight: 700;
`;
const ProfileWrapper = styled.div`
  width: 90%;
  margin: auto;
`;
export default Profile;
