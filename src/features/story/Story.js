import styled from "styled-components";
import { Avatar, FlexBox } from "../../components";
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { createStory, fetchAllStories } from "./StorySlice";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import React from "react";
import { defaultProfilePicture, loaderOptions } from "../../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "react-loader";

const Story = () => {
  const storyState = useSelector((state) => state.story);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllStories());
  }, []);

  const currentUserStory = storyState.allStories.filter(
    (story) => story.user._id === user._id
  );
  const otherUserStories = storyState.allStories.filter(
    (story) => story.user._id !== user._id
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement("#root");

  return (
    <>
      <FlexBox>
        {currentUserStory.length === 0 ? (
          <div style={{ position: "relative" }}>
            <Link to="/upload-photo/story">
              {" "}
              <Avatar
                size="4rem"
                alt="story-pic"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : defaultProfilePicture
                }
              />
              <IoMdAddCircle
                color="#7C37A6"
                size="1.5rem"
                style={{
                  position: "absolute",
                  right: "-0.1rem",
                  bottom: "-0.1rem",
                }}
              />
            </Link>
          </div>
        ) : (
          currentUserStory.map((story, i) => (
            <>
              <div
                kay={i}
                style={{
                  // marginRight: "1rem",
                  cursor: "pointer",
                }}
                onClick={openModal}
              >
                <Avatar
                  size="4rem"
                  alt="story-pic"
                  src={
                    story.user.profilePicture
                      ? story.user.profilePicture
                      : defaultProfilePicture
                  }
                  style={{
                    borderColor: "#7C37A6",
                    borderWidth: "0.3rem",
                    borderRadius: "30%",
                    borderStyle: "solid",
                  }}
                  onClick={() => setCurrentStory(story)}
                />
              </div>
            </>
          ))
        )}
        {otherUserStories.length > 0 &&
          otherUserStories.map((story, i) => (
            <>
              <div
                kay={i}
                style={{
                  margin: "0 1rem",
                  cursor: "pointer",
                }}
                onClick={openModal}
              >
                <Avatar
                  size="4rem"
                  alt="story-pic"
                  src={
                    story.user.profilePicture
                      ? story.user.profilePicture
                      : defaultProfilePicture
                  }
                  style={{
                    borderColor: "#7C37A6",
                    borderWidth: "0.3rem",
                    borderRadius: "30%",
                    borderStyle: "solid",
                  }}
                  onClick={() => setCurrentStory(story)}
                />
              </div>
            </>
          ))}
      </FlexBox>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <FlexBox
            flexDirection="column"
            justifyContent="center"
            alignItems="space-between"
          >
            <FlexBox
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              style={{ marginBottom: "1rem" }}
            >
              <Avatar
                src={
                  currentStory?.user?.profilePicture
                    ? currentStory?.user?.profilePicture
                    : defaultProfilePicture
                }
                size="3rem"
              />
              <AiOutlineClose onClick={closeModal} size="30" cursor="pointer" />
            </FlexBox>

            <LazyLoadImage
              src={currentStory?.photoUrl}
              alt="story"
              effect="blur"
              style={{ objectFit: "cover", height: "70vh", width: "100%" }}
              placeholder={<Loader options={loaderOptions} />}
            />
          </FlexBox>
        </div>
      </Modal>
    </>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default Story;
