import styled from "styled-components";

const StyledWrapper = styled.div`
  position: relative;
  width: 251px;
  height: 126px;
`;
const StyledTextPatternWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const StyledPlayButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: -5px;
`;

const StyledTextWrapper = styled.p`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  position: absolute;
  top: 30px;
  left: 20px;
  transform: rotate(2deg);
`;

export {
  StyledWrapper,
  StyledTextPatternWrapper,
  StyledPlayButton,
  StyledTextWrapper,
};
