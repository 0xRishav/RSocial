import LandingPageSvg2 from "../assets/LandingPageSvg2.svg";
import styled from "styled-components";
import Tilt from "react-tilt";
import { Button, Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <NavDiv>
        <Logo />
        <Link>
          <Button primary={true} text="Sign In" />
        </Link>
      </NavDiv>
      <TwoColumnFlexWrapper>
        <Left>
          <h1>
            Define<span style={{ color: "#7C37A6" }}> Yourself</span> . The Way
            You <span style={{ color: "#7C37A6" }}>Want</span>.
          </h1>
          <p>
            RSocial allows users to upload photos through RSocial website. Users
            can add a caption to each of their posts.
          </p>
          <Link>
            <Button primary={true} text="Sign In" width="100%" />
          </Link>
          <Link style={{ marginLeft: "1rem" }}>
            <Button primary={false} text="Sign Up" width="100%" />
          </Link>
        </Left>
        <Right>
          <LandingSvg src={LandingPageSvg2} className="Tilt-inner"></LandingSvg>
        </Right>
      </TwoColumnFlexWrapper>
    </div>
  );
};

const LandingSvg = styled.img`
  height: auto;
  width: 100%;
`;
export const NavDiv = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TwoColumnFlexWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-around;
  @media (min-width: 680px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }
`;

const Left = styled.div`
  width: 100%;
  @media (min-width: 680px) {
    width: 50%;
  }
`;
const Right = styled.div`
  @media (min-width: 680px) {
    width: 50%;
  }
`;

export default Landing;
