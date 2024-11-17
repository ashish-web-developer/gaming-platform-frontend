import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: red;
  background: url("login/welcome-login-screen/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const StyledImageContainer = styled.div<{
  $width: string;
  $height: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $translateX?: string;
  $translateY?: string;
}>`
  position: absolute;
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  transform: translate(
    ${(props) => props.$translateX ?? 0},
    ${(props) => props.$translateY ?? 0}
  );
`;
const StyledImage = styled(Image)<{
  $object_position?: string;
}>`
  object-fit: contain;
  object-position: ${(props) => props.$object_position ?? "50% 50%"};
`;

const StyledContentContainer = styled.div`
  width: 75rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const StyledGridColumnsContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const StyledRightContentContainer = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
const StyledLogo = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 5rem;
  // color: ${({ theme }) => theme.palette.secondary.main};
  background-image: url("/login/welcome-login-screen/logo-text.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: text;
  color: transparent;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: #fff;
  line-height: 1;
`;

const StyledSubTitle = styled.h4`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  color: ${({ theme }) => theme.palette.info.main};
  font-size: 1.375rem;
  line-height: 1;
`;

const StyledGameBannerContainer = styled.div`
  width: 416px;
  height: 300px;
  position: relative;
  background: url("/login/welcome-login-screen/game-banner-background-image.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCornerVector = styled.span<{
  $left?: string;
  $right?: string;
  $top?: string;
  $bottom?: string;
  $rotate: string;
}>`
  position: absolute;
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  transform: rotate(${(props) => props.$rotate});
`;

const StyledBannerGameLogo = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 2rem;
  color: #f5d547;
  position: absolute;
  transform: translateY(-50%) rotate(-5deg);
  text-align: center;
  line-height: 1.1;
  margin-top: 4rem;
`;

const StyledPokerCardWrapper = styled.div<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $rotate: string;
}>`
  position: absolute;
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  transform: rotate(${(props) => props.$rotate});
`;
const StyledPlayCta = styled.div`
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  width: 235px;
  height: 78px;
`;

const StyledPlayCtaVector = styled.div`
  position: absolute;
`;

export {
  StyledPage,
  StyledContentContainer,
  StyledGridColumnsContent,
  StyledRightContentContainer,
  StyledImageContainer,
  StyledImage,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledGameBannerContainer,
  StyledBannerGameLogo,
  StyledPokerCardWrapper,
  StyledPlayCta,
  StyledPlayCtaVector,
  StyledCornerVector,
};
