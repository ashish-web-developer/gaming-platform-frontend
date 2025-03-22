import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: url("/poker/welcome-poker-screen/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow:hidden;
`;

const StyledContentContainer = styled.div`
  width: 75rem;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
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
  $objectFit?: string;
}>`
  object-fit: ${(props) => props.$objectFit ?? "contain"};
  object-position: ${(props) => props.$object_position ?? "50% 50%"};
`;

const StyledLogoContainer = styled.div``;

const StyledPlatformLogo = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 2.25rem;
  background-image: url("/login/welcome-login-screen/logo-text.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: text;
  color: transparent;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: ${({ theme }) => theme.palette.info.main};
  line-height: 1;
  transform: translateY(18px) rotate(-8deg);
  line-height: 1;
`;
const StyledGameLogo = styled.h1`
  font-size: 7.5rem;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  text-align: center;
  line-height: 1;
  transform: rotate(-8deg);
  color: transparent;
  -webkit-text-stroke-width: 0.01px;
  -webkit-text-stroke-color: ${({ theme }) => theme.palette.info.main};
  letter-spacing: 5px;
`;

const StyledSuitWrapper = styled.span<{
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}>`
  position: absolute;
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
`;

const StyledCountDown = styled.h4`
  position: absolute;
  right: 0px;
  bottom: 48px;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 10rem;
  color: ${({ theme }) => theme.palette.primary.main};
  text-shadow: 12px 12px 0 #fff;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${({ theme }) => theme.palette.secondary.main};
`;

export {
  StyledPage,
  StyledContentContainer,
  StyledImageContainer,
  StyledImage,
  StyledLogoContainer,
  StyledPlatformLogo,
  StyledGameLogo,
  StyledSuitWrapper,
  StyledCountDown,
};
