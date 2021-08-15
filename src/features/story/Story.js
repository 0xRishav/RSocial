import styled from "styled-components";
import { Avatar, FlexBox } from "../../components";
import { IoMdAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { createStory } from "./StorySlice";

const Story = () => {
  const storyState = useSelector((state) => state.story);
  console.log("storyState", storyState);
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [fileState, setFileState] = useState(null);
  const [file, setFile] = useState(null);

  // useEffect(() => {
  //   if (fileState !== null && setFileState !== null) {
  //     const response = dispatch(createStory(file));
  //     console.log(response);
  //   }
  // }, [fileState, file]);

  useEffect(() => {
    (async () => {
      if (fileState !== null && setFileState !== null) {
        const response = await dispatch(createStory(file));
        console.log(response);
      }
    })();
  }, [fileState, file]);

  const handleFileChange = (event) => {
    setFileState(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };
  return (
    <FlexBox>
      {true && (
        <div style={{ position: "relative" }}>
          <FileInput
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileChange}
            enctype="multipart/form-data"
          />

          <SelectFileLabel for="fileInput">
            {" "}
            <Avatar size="4rem" alt="story-pic" src={user.profilePicture} />
            <IoMdAddCircle
              color="#7C37A6"
              size="1.5rem"
              style={{
                position: "absolute",
                right: "-0.1rem",
                bottom: "-0.1rem",
              }}
            />
          </SelectFileLabel>
        </div>
      )}
      {/* {storyState.allStories.length > 0 &&
        storyState.allStories.map((story, i) => (
          <div>
            <Avatar
              size="4rem"
              alt="story-pic"
              src={story.user.profilePicture}
              style={{
                borderColor: "#7C37A6",
                borderWidth: "1rem",
                borderRadius: "100%",
              }}
            />
          </div>
        ))} */}
    </FlexBox>
  );
};

const FileInput = styled.input`
  color: transparent;
  display: none;
`;
const SelectFileLabel = styled.label`
  /* padding: 0.6rem 1rem;
  background: #7c37a6;
  color: white;
  margin-top: 1rem;
  border-radius: 0.5rem; */
`;

export default Story;
