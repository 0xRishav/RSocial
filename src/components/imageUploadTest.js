import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const [invalidImage, setinvalidImage] = useState(null);
  let reader = new FileReader();
  const handleInputChange = (event) => {
    const imageFile = event.target.files[0];
    const imageFilname = event.target.files[0].name;

    if (!imageFile) {
      setinvalidImage("Please select image.");
      return false;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
      setinvalidImage("Please select valid image JPG,JPEG,PNG");
      return false;
    }
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        //------------- Resize img code ----------------------------------
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 437;
        var MAX_HEIGHT = 437;
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
            const file = new File([blob], imageFilname, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            setuserInfo({
              ...userInfo,
              file: file,
              filepreview: URL.createObjectURL(imageFile),
            });
          },
          "image/jpeg",
          1
        );
        setinvalidImage(null);
      };
      img.onerror = () => {
        setinvalidImage("Invalid image content.");
        return false;
      };
      //debugger
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  };

  const [isSucces, setSuccess] = useState(null);
  const submit = async () => {
    const formdata = new FormData();
    formdata.append("avatar", userInfo.file);
    axios
      .post("http://localhost:8080/imageupload", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          setSuccess("Image upload successfully");
        }
      });
  };

  return (
    <div className="container mr-60">
      <h3 className="text-white">
        Uploading and Resizing Images with ReactJS - <span> codeat21.com </span>{" "}
      </h3>

      <div className="formdesign">
        {isSucces !== null ? <h4> {isSucces} </h4> : null}
        {invalidImage !== null ? (
          <h4 className="error"> {invalidImage} </h4>
        ) : null}
        <div className="form-row">
          <label className="text-white">Select Image :</label>
          <input
            type="file"
            className="form-control"
            name="upload_file"
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={() => submit()}
          >
            {" "}
            Save{" "}
          </button>
        </div>
      </div>

      {userInfo.filepreview !== null ? (
        <img
          className="previewimg"
          src={userInfo.filepreview}
          alt="UploadImage"
        />
      ) : null}
    </div>
  );
}
export default App;
