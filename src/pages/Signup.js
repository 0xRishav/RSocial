import { Input } from "../styles/Input.styles";
import { Button, Logo } from "../components";
import { NavDiv } from "./Landing";
import { StyledButton } from "../components/Button";
import { AiOutlineArrowRight } from "react-icons/ai";

const Signup = () => {
  const inputs = [
    {
      placeholder: "Name",
      type: "text",
    },
    {
      placeholder: "Profession",
      type: "text",
    },
    {
      placeholder: "Personal Website",
      type: "text",
    },
    {
      placeholder: "Email",
      type: "email",
    },
    {
      placeholder: "Username",
      type: "text",
    },
    {
      placeholder: "Password",
      type: "password",
    },
    {
      placeholder: "Confirm Password",
      type: "password",
    },
  ];
  return (
    <div>
      <NavDiv>
        <Logo />
      </NavDiv>
      <h2>Sign Up to RWatch</h2>
      {inputs.map((input) => (
        <Input placeholder={input.placeholder} type={input.type} />
      ))}
      <StyledButton primary style={{ width: "100%", marginTop: "1rem" }}>
        Next <AiOutlineArrowRight style={{ marginLeft: "0.5rem" }} />
      </StyledButton>
    </div>
  );
};

export default Signup;
