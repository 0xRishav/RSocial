import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setErrorNull } from "../features/user/UserSlice";

const ErrorBox = ({ message, delay }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let compTimer = setTimeout(() => {
      dispatch(setErrorNull());
    }, delay);
    return () => {
      clearTimeout(compTimer);
    };
  }, [delay]);

  return <ErrorBoxDiv>{message}</ErrorBoxDiv>;
};

export const ErrorBoxDiv = styled.div`
  width: auto;
  font-size: 1rem;
  background-color: #b00020;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-weight: 600;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  color: white;
`;

export default ErrorBox;
