import styled from "styled-components";
import {
  Avatar,
  BottomButtons,
  FlexBox,
  Navbar,
  PostsGrid,
} from "../components";
import { RiSearch2Line } from "react-icons/ri";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/user/UserSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";
import Loader from "react-loader";
import { defaultProfilePicture, loaderOptions } from "../utils/utils";

const Search = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector((state) => state.user);
  const [searchFilteredUsers, setSearchFilteredUsers] = useState([]);
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);
  const searchInputChangeHandler = (e) => {
    const searchInput = e.target.value;
    const filteredUsers = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.username.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchFilteredUsers(filteredUsers);
  };

  return (
    <div>
      {width > 725 && <Navbar />}
      <SearchWrapper>
        <RiSearch2Line
          style={{ position: "absolute", left: "2.5%", top: "48%" }}
          size="18"
        />
        <SearchBar onChange={searchInputChangeHandler} placeholder="Search" />
      </SearchWrapper>
      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ textAlign: "left" }}>Search</h2>
        {searchFilteredUsers.map((user, i) => (
          <Link
            key={i}
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <FlexBox
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              style={{ margin: "1rem auto" }}
            >
              <Avatar
                size="3.5rem"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : defaultProfilePicture
                }
              />
              <FlexBox
                style={{ border: "1px black", marginLeft: "1.2rem" }}
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <p
                  style={{
                    marginTop: "0",
                    marginLeft: "0",
                    marginRight: "0",
                    marginBottom: "0.35rem",
                    fontWeight: "700",
                  }}
                >
                  {user.name}
                </p>
                <p
                  style={{
                    marginTop: "0",
                    marginLeft: "0",
                    marginRight: "0",
                    marginBottom: "0.5rem",
                    opacity: "0.7",
                    fontWeight: "500",
                  }}
                >
                  {user.username}
                </p>
              </FlexBox>
            </FlexBox>
          </Link>
        ))}
      </div>

      {width < 725 && <BottomButtons />}
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
