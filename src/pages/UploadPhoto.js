import { Input } from "../styles/Input.styles";
import { Button, Logo, FlexBox } from "../components";
import styled from "styled-components";
import { NavDiv } from "./Landing";
import { StyledButton } from "../components/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { FcImageFile } from "react-icons/fc";
import { useState } from "react";
import {
  uploadProfilePicture,
  uploadCoverPicture,
} from "../features/user/UserSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createStory } from "../features/story/StorySlice";
import { loaderOptions } from "../utils/utils";
import Loader from "react-loader";

const UploadPhoto = ({ photoType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fileState, setFileState] = useState(null);
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFileState(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handleNext = async () => {
    if (fileState === null) {
      return;
    }
    setLoading(true);
    if (photoType === "Profile") {
      const response = await dispatch(uploadProfilePicture(file));
      if (response.meta.requestStatus === "fulfilled") {
        setLoading(false);
        history.push("/upload-photo/cover");
      }
    } else if (photoType === "Cover") {
      const response = await dispatch(uploadCoverPicture(file));
      if (response.meta.requestStatus === "fulfilled") {
        setLoading(false);
        history.push("/feed");
      }
    } else if (photoType === "Story") {
      const response = await dispatch(createStory(file));
      if (response.meta.requestStatus === "fulfilled") {
        setLoading(false);
        history.push("/feed");
      }
    }
  };

  const skipClickHandler = () => {
    if (photoType === "Profile") {
      history.push("/upload-photo/cover");
    } else if (photoType === "Cover") {
      history.push("/feed");
    }
  };
  return (
    <div>
      {<Loader loaded={!loading} options={loaderOptions} />}
      <NavDiv>
        <Logo />
        <StyledButton onClick={skipClickHandler}>Skip</StyledButton>
      </NavDiv>
      <h2>Add {photoType} Picture</h2>

      {/* <CameraDiv>
        <AiOutlineVideoCameraAdd />
      </CameraDiv> */}
      {fileState === null ? (
        <FlexBox
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <FcImageFile size="60" />
          <FileInput
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileChange}
            enctype="multipart/form-data"
            // value={fileState}
          />

          <SelectFileLabel for="fileInput">Select file</SelectFileLabel>
        </FlexBox>
      ) : (
        <UploadedImage src={fileState} />
      )}

      <StyledButton
        onClick={handleNext}
        primary
        style={{ width: "100%", marginTop: "1rem" }}
      >
        Next <AiOutlineArrowRight style={{ marginLeft: "0.5rem" }} />
      </StyledButton>
    </div>
  );
};

const FileInput = styled.input`
  color: transparent;
  display: none;
`;

const SelectFileLabel = styled.label`
  padding: 0.6rem 1rem;
  background: #7c37a6;
  color: white;
  margin-top: 1rem;
  border-radius: 0.5rem;
`;

const UploadedImage = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
`;

export default UploadPhoto;
