import styled from "styled-components";

const StyledPlayButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  width: 151px;
  height: 57px;
`;

const StyledPlayButtonWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
`;

const StyledArrowVectorWrapper = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-60%, -50%);
  color: ${({ theme }) => theme.palette.primary.light};
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export {
  StyledPlayButton,
  StyledPlayButtonWrapper,
  StyledArrowVectorWrapper,
  StyledText,
};
