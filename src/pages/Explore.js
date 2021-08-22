import { BottomButtons, Logo, Navbar, PostsGrid } from "../components";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";
import { NavDiv } from "./Landing";

const Explore = () => {
  const { width } = useWindowDimensions();
  return (
    <div>
      {width > 725 ? (
        <Navbar />
      ) : (
        <NavDiv>
          <Logo />
        </NavDiv>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ textAlign: "left" }}>Explore</h2>
        <PostsGrid postsType="All" />
      </div>
      {width < 725 && <BottomButtons />}
    </div>
  );
};

export default Explore;
