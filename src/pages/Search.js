import styled from "styled-components";
import { BottomButtons, PostsGrid } from "../components";
import { RiSearch2Line } from "react-icons/ri";

const Search = () => {
  return (
    <div>
      <SearchWrapper>
        <RiSearch2Line
          style={{ position: "absolute", left: "2.5%", top: "48%" }}
          size="18"
        />
        <SearchBar placeholder="Search" />
      </SearchWrapper>
      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ textAlign: "left" }}>Explore</h2>
        <PostsGrid postsType="All" />
      </div>
      <BottomButtons />
    </div>
  );
};

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchBar = styled.input`
  width: 84%;
  height: 2rem;
  margin-top: 1rem;
  padding: 0 8%;
  border: 1px #ededef solid;
  border-radius: 0.4rem;
  background-color: #ededef;
`;

export default Search;
