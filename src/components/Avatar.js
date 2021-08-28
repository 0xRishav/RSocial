import styled from "styled-components";

export default styled.img`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-radius: 20%;
  object-fit: cover;
`;
