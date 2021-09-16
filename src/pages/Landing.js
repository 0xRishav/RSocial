import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StyledButton } from "../components/Button";
import { signinUser } from "../features/user/UserSlice";
import ErrorBox from "../components/Error";
import Loader from "react-loader";
import { Logo, Button } from "../components";
import { loaderOptions } from "../utils/utils";

const Landing = () => {
  const dispatch = useDispatch();
  const { loading, errMessage } = useSelector((state) => state.user);
  return (
    <div>
      {<Loader loaded={!loading} options={loaderOptions} />}
      {errMessage && <ErrorBox message={errMessage} delay="5000" />}
      <LandingPageWrapper>
        <NavDiv>
          <Logo />
          <Link>
            <Button primary={true} text="Sign In" />
          </Link>
        </NavDiv>
        <LandingPageContentWrapper>
          <h1>
            Define<span style={{ color: "#7C37A6" }}> Yourself</span> . The Way
            You <span style={{ color: "#7C37A6" }}>Want</span>.
          </h1>
          <p>
            RSocial allows users to upload photos through RSocial website. Users
            can add a caption to each of their posts. They can follow/unfollow
            each other and like and comment posts.
          </p>
          <Link to="/signin">
            <StyledButton
              style={{ width: "100%", marginTop: "0.5rem" }}
              primary
            >
              Sign In
            </StyledButton>
          </Link>
          <Link to="/signup">
            <StyledButton
              primary
              style={{ width: "100%", marginTop: "0.5rem" }}
            >
              Sign Up
            </StyledButton>
          </Link>
          <StyledButton
            onClick={() =>
              dispatch(signinUser({ username: "demo", password: 123456 }))
            }
            style={{ width: "100%", marginTop: "0.5rem" }}
          >
            Use Demo Account
          </StyledButton>
        </LandingPageContentWrapper>
      </LandingPageWrapper>
    </div>
  );
};

export const NavDiv = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const LandingPageContentWrapper = styled.div`
  height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 13vh;
`;

const LandingPageWrapper = styled.div`
  width: 90%;
  margin: auto;
  @media (min-width: 725px) {
    width: 60%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
`;

export default Landing;
