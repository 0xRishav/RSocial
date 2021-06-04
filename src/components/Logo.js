import styled from "styled-components";

const Logo = () => {
  return (
    <LogoWrapper>
      RS<span style={{ color: "#7C37A6" }}>o</span>cial
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export default Logo;
