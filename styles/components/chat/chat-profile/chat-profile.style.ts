import styled from "styled-components";

const StyledWrapper = styled.div`
  position: absolute;
  border: 2px solid red;
  z-index: 6;
  width: 100%;
  height: 100vh;
  top: 0px;
  left: 0px;
  background: #000000;
  border: 6px dashed #a2f263;
`;

const StyledHeader = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 28px;
  position: relative;
`;
const StyledBackButton = styled.button`
  width: 60px;
  height: 60px;
  background: #a2f263;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

const StyledHeaderText = styled.h3`
  color: #a2f263;
  text-align: center;
  font-family: ${({ theme }) => theme.palette.fontFamily.poppins};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export { StyledWrapper, StyledHeader, StyledBackButton, StyledHeaderText };
