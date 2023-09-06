import styled from "styled-components";

const StyledNavContainer = styled.div`
  width: 252px;
  height: 70px;
  border-radius: 49px;
  background: #000;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 40px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 27px;
`;

const StyledProfileContainer = styled.div`
  width: 54px;
  height: 54px;
  background-image: linear-gradient(to right, #ff2400, #3d3ba9);
  box-shadow: 0px 4px 4px 0px #D62839;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledProfile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #000;
`;

export { StyledNavContainer, StyledProfileContainer, StyledProfile };
