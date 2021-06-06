import { Button, Logo } from "../components";
import { NavDiv } from "./Landing";
import { Input } from "../styles/Input.styles";
import AuthPageSvg from "../assets/AuthPageSvg.svg";
import { StyledButton } from "../components/Button";

import styled from "styled-components";

const Signin = () => {
  return (
    <div>
      <NavDiv>
        <Logo />
      </NavDiv>
      <h2>Welcome back to RSocial</h2>
      <SignInWrapper>
        <AuthSvg src={AuthPageSvg} alt="handPic" />
        <form action="">
          <Input placeholder="Username/Email" type="text" />
          <Input placeholder="Password" type="password" />
          <StyledButton primary style={{ width: "100%" }}>
            Sign In
          </StyledButton>
        </form>
        <div style={{ fontSize: "0.8rem", margin: "1rem auto" }}>
          New to RSocial?
        </div>
        <StyledButton style={{ width: "100%" }}>Sign Up</StyledButton>
      </SignInWrapper>
    </div>
  );
};

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthSvg = styled.img`
  width: 80%;
  height: auto;
  margin: auto;
`;

export default Signin;
