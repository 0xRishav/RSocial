import { Input } from "../styles/Input.styles";
import { Button, Logo } from "../components";
import { NavDiv } from "./Landing";
import { StyledButton } from "../components/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import { useHistory } from "react-router";
import { signupUser } from "../features/user/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import { loaderOptions } from "../utils/utils";
import Loader from "react-loader";
import ErrorBox from "../components/Error";

const Signup = () => {
  const history = useHistory();
  const authState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const inputs = [
    {
      placeholder: "name",
      type: "text",
      name: "name",
    },
    {
      placeholder: "email",
      type: "email",
      name: "email",
    },
    {
      placeholder: "username",
      type: "text",
      name: "username",
    },
    {
      placeholder: "password",
      type: "password",
      name: "password",
    },
    {
      placeholder: "Confirm Password",
      type: "password",
      name: "confirmPassword",
    },
    {
      placeholder: "Bio",
      type: "text",
      name: "bio",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isFormEmpty, setIsFormEmpty] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        setIsFormEmpty(true);
        return;
      }
    }
    const response = await dispatch(signupUser(formData));
    if (response.meta.requestStatus === "fulfilled") {
      history.push("/upload-photo/profile");
    }
  };
  return (
    <div>
      {authState.errMessage && (
        <ErrorBox message={authState.errMessage} delay="5000" />
      )}
      {<Loader loaded={!authState.loading} options={loaderOptions} />}
      <NavDiv>
        <Logo />
      </NavDiv>
      <h2>Sign Up to RSocial</h2>
      <form>
        {inputs.map((input, i) => (
          <Input
            key={i}
            placeholder={input.placeholder}
            name={input.name}
            type={input.type}
            onChange={(e) => handleInputChange(e)}
          />
        ))}

        <StyledButton
          onClick={(e) => handleSubmit(e)}
          primary
          style={{ width: "100%", marginTop: "1rem" }}
        >
          Next <AiOutlineArrowRight style={{ marginLeft: "0.5rem" }} />
        </StyledButton>
      </form>
    </div>
  );
};

export default Signup;
