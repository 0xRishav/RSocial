import styled from "styled-components";
import { useEffect } from "react";
import { Avatar, BottomButtons, FlexBox, PostsGrid } from "../components";
import { useSelector } from "react-redux";
import { fetchUserPosts } from "../features/post/PostSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchParticularUser } from "../features/user/UserSlice";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";
import DesktopButtons from "../components/DesktopButtons";
import { defaultCoverPicture, defaultProfilePicture } from "../utils/utils";

const Profile = () => {
  const { width } = useWindowDimensions();
  const { userId } = useParams();
  console.log("GOT", userId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchParticularUser(userId));
  }, []);
  const { fetchedUser, loading, errMessage } = useSelector(
    (state) => state.user
  );
  const postState = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, []);

  const purpleCover =
    "https://images.unsplash.com/photo-1579547621309-5e57ab324182?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80";

  return (
    <div>
      <ProfileInfoWrapper>
        <CoverPicture
          src={
            fetchedUser.coverPicture
              ? fetchedUser.coverPicture
              : defaultCoverPicture
          }
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
            <DesktopButtons />
          </FlexBox>
        ) : (
          <h2 style={{ position: "absolute", top: "0rem", left: "2rem" }}>
            {fetchedUser.username}
          </h2>
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
        <h3 style={{ marginTop: "4rem" }}>Rishav Bharti</h3>
        {/* <FlexBox>
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            style={{ width: "50%" }}
          >
            <FollowHeading>Followers</FollowHeading>
            <p>{fetchedUser?.followers?.length}</p>
          </FlexBox>
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            style={{ width: "50%" }}
          >
            <FollowHeading>Following</FollowHeading>
            <p>{fetchedUser?.followings?.length}</p>
          </FlexBox>
        </FlexBox> */}
        <p>{fetchedUser.bio}</p>
        <div style={{ marginTop: "2rem" }}>
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

const CoverPicture = styled.img`
  width: 100%;
  height: 30vh;
  object-fit: cover;
  overflow-x: hidden;
`;

const FollowHeading = styled.div`
  font-weight: 700;
`;
const ProfileWrapper = styled.div`
  width: 90%;
  margin: auto;
`;
export default Profile;
