import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.primary ? "#7C37A6" : "transparent")};
  border: 1px solid #7c37a6;
  padding: 0.5rem 1rem;
  font-weight: bold;
  color: ${(props) => (props.primary ? "white" : "#7C37A6")};
  border-radius: 0.3rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #7c37a6;
    color: white;
  }
`;

export default Button;
