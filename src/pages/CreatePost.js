import { BottomButtons, FlexBox } from "../components";
import { StyledButton } from "../components/Button";
import { FcImageFile } from "react-icons/fc";
import { MdBlock } from "react-icons/md";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useState } from "react";
import { uploadPostPhoto, createPost } from "../features/post/PostSlice";

const CreatePost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fileState, setFileState] = useState(null);
  const [file, setFile] = useState(null);
  const [isPictureUploaded, setIsPictureUploaded] = useState(false);
  const [postInfo, setPostInfo] = useState({
    caption: "",
    url: "",
    public_id: "",
  });

  const handleFileChange = (event) => {
    setFileState(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (fileState === null) {
      return;
    }
    const response = await dispatch(uploadPostPhoto(file));
    console.log(response);
    if (response.meta.requestStatus === "fulfilled") {
      setIsPictureUploaded(true);
      setPostInfo({
        ...postInfo,
        url: response.payload.url,
        public_id: response.payload.public_id,
      });
    }
  };

  const handleCaptionChange = (e) => {
    setPostInfo({
      ...postInfo,
      caption: e.target.value,
    });
  };

  const createPostHandler = async () => {
    const response = await dispatch(createPost(postInfo));
    if (response.meta.requestStatus === "fulfilled") {
      history.push("/");
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <FlexBox
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {fileState === null ? (
          <>
            <FcImageFile size="60" />
            <FileInput
              type="file"
              id="files"
              class="hidden"
              onChange={handleFileChange}
              enctype="multipart/form-data"
            />
            <FileInputLabel for="files" onChange={(e) => handleFileChange(e)}>
              Select file
            </FileInputLabel>
          </>
        ) : (
          <>
            <UploadedImage src={fileState} alt="post-pic" />
            <StyledButton
              primary
              style={{ marginTop: "1rem", width: "100%" }}
              onClick={(e) => handleUpload(e)}
            >
              Upload File
            </StyledButton>
          </>
        )}
      </FlexBox>
      <CaptionTextArea
        placeholder="Write Caption Here..."
        onChange={(e) => handleCaptionChange(e)}
      />
      <StyledButton
        style={{
          marginTop: "1rem",
          width: "100%",
          marginBottom: "3rem",
          opacity: isPictureUploaded ? "1" : "0.5",
        }}
        onClick={createPostHandler}
      >
        Create Post {!isPictureUploaded && <MdBlock />}
      </StyledButton>
      <BottomButtons />
    </div>
  );
};

const FileInput = styled.input`
  color: transparent;
  display: none;
`;

const FileInputLabel = styled.label`
  background: #7c37a6;
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: white;
  width: 90%;
  border-radius: 0.3rem;
  margin-top: 1rem;
`;

const CaptionTextArea = styled.textarea`
  width: 90%;
  height: 10rem;
  margin-top: 2rem;
  background: #ededef;
  resize: none;
  padding: 1rem;
  border-radius: 0.5rem;
  outline: unset;
`;

const UploadedImage = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
`;

export default CreatePost;
