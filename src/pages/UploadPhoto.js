import { Input } from "../styles/Input.styles";
import { Button, Logo, FlexBox, BottomButtons, Navbar } from "../components";
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
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Compressor from "compressorjs";
import useWindowDimensions from "../custom-hooks/useWindowDimensions";

const UploadPhoto = ({ photoType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fileState, setFileState] = useState(null);
  const [file, setFile] = useState(null);
  let reader = new FileReader();
  const { width } = useWindowDimensions();

  let maxHeight, maxWidth;

  if (photoType === "Profile" || photoType === "Cover") {
    maxHeight = 512;
    maxWidth = 512;
  } else {
    maxHeight = 1440;
    maxWidth = 810;
  }

  const handleFileChange = (event) => {
    const imageFile = event.target.files[0];
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var MAX_WIDTH = maxWidth;
        var MAX_HEIGHT = maxHeight;
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
      {width > 725 && photoType === "Story" ? (
        <Navbar />
      ) : (
        <NavDiv>
          <Logo />
          <StyledButton onClick={skipClickHandler}>Skip</StyledButton>
        </NavDiv>
      )}

      {/* {photoType !== "Story" && (
        <NavDiv>
          <Logo />
          <StyledButton onClick={skipClickHandler}>Skip</StyledButton>
        </NavDiv>
      )} */}
      <h2>Add {photoType} Picture</h2>

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
        <LazyLoadImage
          src={fileState}
          alt="UploadedPic"
          effect="blur"
          style={{ objectFit: "cover", height: "auto", width: "100%" }}
        />
      )}

      <StyledButton
        onClick={handleNext}
        primary
        style={{ width: "100%", marginTop: "1rem" }}
      >
        Next <AiOutlineArrowRight style={{ marginLeft: "0.5rem" }} />
      </StyledButton>
      {width < 725 && photoType === "Story" && <BottomButtons />}
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
