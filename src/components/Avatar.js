import styled from "styled-components";

export default styled.img`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  border-radius: 100%;
  object-fit: cover;
`;
