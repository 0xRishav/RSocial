import { RiHome6Line } from "react-icons/ri";
import { RiHome6Fill } from "react-icons/ri";
import { RiSearch2Fill } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { AiFillNotification } from "react-icons/ai";
import { AiOutlineNotification } from "react-icons/ai";
import { IoIosCompass } from "react-icons/io";
import { RiUser3Line } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import { RiAddBoxLine } from "react-icons/ri";
import { RiAddBoxFill } from "react-icons/ri";
import { ImCompass2 } from "react-icons/im";
import FlexBox from "./FlexBox";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const BottomButtons = () => {
  const [selectedButton, setSelectedButton] = useState("Home");
  const { user } = useSelector((state) => state.user);
  const buttonClickHandler = (button) => {
    setSelectedButton(button);
  };
  const buttons = [
    {
      line: (
        <RiHome6Line size="28" onClick={() => buttonClickHandler("home")} />
      ),
      fill: (
        <RiHome6Fill size="28" onClick={() => buttonClickHandler("home")} />
      ),
      buttonName: "home",
      linkTo: "/feed",
    },
    {
      line: (
        <RiSearch2Line size="28" onClick={() => buttonClickHandler("search")} />
      ),
      fill: (
        <RiSearch2Fill size="28" onClick={() => buttonClickHandler("search")} />
      ),
      buttonName: "search",
      linkTo: "/search",
    },
    {
      line: (
        <RiAddBoxLine size="28" onClick={() => buttonClickHandler("add")} />
      ),
      fill: (
        <RiAddBoxFill size="28" onClick={() => buttonClickHandler("add")} />
      ),
      buttonName: "add",
      linkTo: "/create-post",
    },
    {
      line: (
        <ImCompass2 size="28" onClick={() => buttonClickHandler("explore")} />
      ),
      fill: (
        <IoIosCompass size="28" onClick={() => buttonClickHandler("explore")} />
      ),
      buttonName: "explore",
      linkTo: "/explore",
    },
    {
      line: (
        <RiUser3Line size="28" onClick={() => buttonClickHandler("user")} />
      ),
      fill: (
        <RiUser3Fill size="28" onClick={() => buttonClickHandler("user")} />
      ),
      buttonName: "user",
      linkTo: `/profile/${user._id}`,
    },
  ];
  return (
    <FlexBox
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center"
      style={{
        position: "fixed",
        bottom: "0rem",
        left: 0,
        right: 0,
        width: "auto",
        background: "white",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        marginTop: "2rem",
      }}
    >
      {buttons.map((button, i) => (
        <Button key={i}>
          <Link to={button.linkTo}>
            {selectedButton === button.buttonName ? button.fill : button.line}
          </Link>
        </Button>
      ))}
    </FlexBox>
  );
};

const Button = styled.div`
  a {
    color: black;
    text-decoration: none;
  }
`;

export default BottomButtons;
