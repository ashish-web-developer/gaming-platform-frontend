import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: url("login/welcome-login-screen/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
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
  opacity: 0.6;
`;

const StyledLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 200px;
`;
const StyledLogo = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 3.75rem;
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
  font-size: 1rem;
  line-height: 1;
`;

const StyledBottomShadow = styled.div`
  width: 100%;
  height: 160px;
  position: absolute;
  bottom: 0px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.5) 31%,
    rgba(0, 0, 0, 1) 100%
  );
  z-index: 2;
`;

const StyledPlayCta = styled.div`
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  width: 150px;
  height: 51px;
  position: absolute;
  right: 24px;
  bottom: 24px;
`;

const StyledPlayCtaVector = styled.div`
  position: absolute;
`;
export {
  StyledPage,
  StyledImageContainer,
  StyledImage,
  StyledPokerCardWrapper,
  StyledLogoContainer,
  StyledLogo,
  StyledSubTitle,
  StyledBottomShadow,
  StyledPlayCta,
  StyledPlayCtaVector,
};
