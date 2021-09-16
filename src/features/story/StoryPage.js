import { useLocation, useHistory } from "react-router";
import styled from "styled-components";
import { StyledButton } from "../../components/Button";
import { useDispatch } from "react-redux";
import { createStory } from "./StorySlice";

const StoryPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { file, fileState } = location.state;
  const handleUpload = async () => {
    if (fileState === null) {
      return;
    }
    const response = await dispatch(createStory(file));
    if (response.meta.requestStatus === "fulfilled") {
      history.push("/feed");
    }
  };
  return (
    <div>
      <h2>Create Story</h2>
      <UploadedImage src={fileState} alt="Story-pic" />
      <StyledButton
        onClick={(e) => handleUpload(e)}
        primary
        style={{ width: "100%" }}
      >
        Upload Story
      </StyledButton>
    </div>
  );
};

const UploadedImage = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
`;

export default StoryPage;
