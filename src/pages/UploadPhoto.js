import { Input } from "../styles/Input.styles";
import { Button, Logo } from "../components";
import styled from "styled-components";
import { NavDiv } from "./Landing";
import { StyledButton } from "../components/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

const UploadPhoto = ({ photoType }) => {
  return (
    <div>
      <NavDiv>
        <Logo />
        <StyledButton>Skip</StyledButton>
      </NavDiv>
      <h2>Add {photoType} Picture</h2>

      <CameraDiv>
        <AiOutlineVideoCameraAdd />
      </CameraDiv>

      <StyledButton primary style={{ width: "100%", marginTop: "1rem" }}>
        Next <AiOutlineArrowRight style={{ marginLeft: "0.5rem" }} />
      </StyledButton>
    </div>
  );
};

const CameraDiv = styled.div`
  height: 1rem;
  width: 1rem;
  border: 1px solid black;
  padding: 1rem;
  border-radius: 2rem;
  margin: auto;
`;

export default UploadPhoto;
