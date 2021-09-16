import { RiHome6Line } from "react-icons/ri";
import { RiHome6Fill } from "react-icons/ri";
import { RiSearch2Fill } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { AiFillNotification } from "react-icons/ai";
import { AiOutlineNotification } from "react-icons/ai";
import { RiUser3Line } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import { RiAddBoxLine } from "react-icons/ri";
import { RiAddBoxFill } from "react-icons/ri";
import FlexBox from "./FlexBox";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ImCompass2 } from "react-icons/im";
import { IoIosCompass } from "react-icons/io";
import { useSelector } from "react-redux";

const DesktopButtons = () => {
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
      justifyContent="space-between"
      alignItems="center"
      style={{
        background: "transparent",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      {buttons.map((button, i) => (
        <Button key={i} style={{ margin: "auto 0.5rem" }}>
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

export default DesktopButtons;
