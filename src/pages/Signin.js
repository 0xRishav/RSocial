import { Button, Logo } from "../components";
import { NavDiv } from "./Landing";
import { Input } from "../styles/Input.styles";
import AuthPageSvg from "../assets/AuthPageSvg.svg";
import { StyledButton } from "../components/Button";
import { signinUser } from "../features/user/UserSlice";
import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Loader from "react-loader";
import { loaderOptions } from "../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Signin = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  console.log(AuthPageSvg);

  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        setIsFormEmpty(true);
        return;
      }
    }
    let body;
    if (ValidateEmail(formData.emailOrUsername)) {
      body = {
        email: formData.emailOrUsername,
        password: formData.password,
      };
    } else {
      body = {
        username: formData.emailOrUsername,
        password: formData.password,
      };
    }

    const response = await dispatch(signinUser(body));
    if (response.meta.requestStatus === "fulfilled") {
      setLoading(false);
      history.push("/");
    }
  };

  return (
    <div>
      {<Loader loaded={!loading} options={loaderOptions} />}
      <NavDiv>
        <Logo />
      </NavDiv>
      <h2>Welcome back to RSocial</h2>
      <SignInWrapper>
        <LazyLoadImage
          effect="blur"
          src={AuthPageSvg}
          alt="handPic"
          style={{ width: "80%", height: "auto" }}
        />
        <Input
          onChange={(e) => handleInputChange(e)}
          placeholder="Username/Email"
          name="emailOrUsername"
          type="text"
        />
        <Input
          onChange={(e) => handleInputChange(e)}
          placeholder="Password"
          type="password"
          name="password"
        />
        <StyledButton
          onClick={(e) => handleSubmit(e)}
          primary
          style={{ width: "100%" }}
        >
          Sign In
        </StyledButton>
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
