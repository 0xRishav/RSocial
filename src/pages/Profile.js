import styled from "styled-components";
import { useEffect } from "react";
import { Avatar, BottomButtons, FlexBox, PostsGrid } from "../components";
import { useSelector } from "react-redux";
import { fetchUserPosts } from "../features/post/PostSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { user, loading, errMessage } = useSelector((state) => state.user);
  const postState = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, []);

  console.log("UserPosts", postState.userPosts);

  const imageSrc =
    "https://images.unsplash.com/photo-1563991522451-90d2395a8854?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y292ZXIlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
  const imageSrc2 =
    "https://images.unsplash.com/photo-1584999734482-0361aecad844?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
  return (
    <div>
      <ProfileInfoWrapper>
        <CoverPicture src={user.coverPicture} />
        <h2 style={{ position: "absolute", top: "0rem", left: "2rem" }}>
          {user.username}
        </h2>
        <ProfileWrapper>
          <Avatar
            src={user.profilePicture}
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
        <FlexBox>
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            style={{ width: "50%" }}
          >
            <FollowHeading>Followers</FollowHeading>
            <p>{user?.followers?.length}</p>
          </FlexBox>
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            style={{ width: "50%" }}
          >
            <FollowHeading>Following</FollowHeading>
            <p>{user.followings.length}</p>
          </FlexBox>
        </FlexBox>
        <p>
          Stick to The Context. The essential thing to understand before
          introduce yourself is the context of the situation you are in.
        </p>
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ textAlign: "left" }}>Feed</h2>
          <PostsGrid postsType="User" />
        </div>
      </ProfileWrapper>

      <div style={{ marginLeft: "5%" }}>
        <BottomButtons postsType="User" />
      </div>
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
