import LandingPageSvg2 from "../assets/LandingPageSvg2.svg";
import styled from "styled-components";
import Tilt from "react-tilt";
import { Button, Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  const options = {
    reverse: true, // reverse the tilt direction
    max: 25, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 300, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };
  return (
    <div>
      <NavDiv>
        <Logo />
        <Link>
          <Button primary>Log In</Button>
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
        </Left>
        <Right>
          <Tilt className="Tilt" options={options}>
            <LandingSvg
              src={LandingPageSvg2}
              className="Tilt-inner"
            ></LandingSvg>
          </Tilt>
        </Right>
      </TwoColumnFlexWrapper>
      <Button primary>Log In</Button>
      <Button style={{ marginLeft: "1rem" }}>Sign Up</Button>
    </div>
  );
};

const LandingSvg = styled.img`
  height: auto;
  width: 100%;
`;
const NavDiv = styled.div`
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
`;

const Left = styled.div`
  width: 100%;
`;
const Right = styled.div`
  width: 100%;
`;

export default Landing;
