import styled from "styled-components";

const StyledAnimationContainer = styled.div`
  width: 528px;
  height: 328px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledVectorPosition = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $rotate:string;
}>`
  position: absolute;
  top: ${(prop) => prop.$top ?? "auto"};
  bottom: ${(prop) => prop.$bottom ?? "auto"};
  left: ${(prop) => prop.$left ?? "auto"};
  right: ${(prop) => prop.$right ?? "auto"};
  rotate:${(prop)=>prop.$rotate};
`;

const StyledWaitingBannerWrapper = styled.div`
  width: 500px;
  height: 300px;
  border: 4px solid ${({ theme }) => theme.palette.info.main};
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("/poker/poker-waiting-banner/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledWaitingBannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
const StyledInfoText = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.palette.info.main};
  line-height: 1.1;
  text-align: center;
`;

export {
  StyledAnimationContainer,
  StyledVectorPosition,
  StyledWaitingBannerWrapper,
  StyledWaitingBannerContent,
  StyledInfoText,
};
