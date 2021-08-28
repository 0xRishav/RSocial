import { BottomButtons, FlexBox, Navbar } from "../components";
import { StyledButton } from "../components/Button";
import { FcImageFile } from "react-icons/fc";
import { MdBlock } from "react-icons/md";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useState } from "react";
import { uploadPostPhoto, createPost } from "../features/post/PostSlice";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";
import { loaderOptions } from "../utils/utils";
import Loader from "react-loader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Compressor from "compressorjs";

const CreatePost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [fileState, setFileState] = useState(null);
  const [file, setFile] = useState(null);
  const [isPictureUploaded, setIsPictureUploaded] = useState(false);
  const [postInfo, setPostInfo] = useState({
    caption: "",
    url: "",
    public_id: "",
  });
  const [isError, setisError] = useState(false);
  const [loading, setLoading] = useState(false);

  let reader = new FileReader();

  const handleFileChange = (event) => {
    const imageFile = event.target.files[0];
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var MAX_WIDTH = 1000;
        var MAX_HEIGHT = 1000;
        var width = img.width;
        var height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob(
          (blob) => {
            const file = new File([blob], imageFile.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            new Compressor(file, {
              quality: "0.8",
              success: (res) => {
                setFile(res);
                setFileState(URL.createObjectURL(res));
              },
            });
          },
          "image/jpeg",
          1
        );
      };
      img.onerror = () => {
        console.log("error in image upload");
        return false;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  };

  const handleUpload = async () => {
    if (fileState === null) {
      return;
    }
    setLoading(true);
    const response = await dispatch(uploadPostPhoto(file));
    if (response.meta.requestStatus === "fulfilled") {
      setLoading(false);
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
    if (!isPictureUploaded || postInfo.caption === "") {
      setisError(true);
      return;
    }
    setLoading(true);
    const response = await dispatch(createPost(postInfo));
    if (response.meta.requestStatus === "fulfilled") {
      setLoading(false);
      history.push("/");
    }
  };

  return (
    <div>
      {<Loader loaded={!loading} options={loaderOptions} />}
      {width > 725 && <Navbar />}
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
            <LazyLoadImage
              src={fileState}
              alt="post-pic"
              effect="blur"
              style={{ objectFit: "cover", height: "auto", width: "100%" }}
            />

            {!isPictureUploaded && (
              <StyledButton
                primary
                style={{ marginTop: "1rem", width: "100%" }}
                onClick={(e) => handleUpload(e)}
              >
                Upload File
              </StyledButton>
            )}
          </>
        )}
      </FlexBox>
      <CaptionTextArea
        placeholder="Write Caption Here..."
        onChange={(e) => handleCaptionChange(e)}
      />
      {isError && (
        <div style={{ color: "red" }}>
          Please include caption or upload photo
        </div>
      )}
      <StyledButton
        style={{
          marginTop: "1rem",
          width: "100%",
          marginBottom: "3rem",
          opacity: isPictureUploaded ? "1" : "0.5",
        }}
        onClick={createPostHandler}
      >
        Create Post{" "}
        {!isPictureUploaded || (postInfo.caption === "" && <MdBlock />)}
      </StyledButton>
      {width < 725 && <BottomButtons />}
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

export default CreatePost;
