import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100%;
  height: 100vh;
  background: red;
  background: url("login/background.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const StyledLogoContainer = styled.div`
  position: absolute;
  left: 5rem;
  top: 5rem;
`;

const StyledLogo = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  // color: ${({ theme }) => theme.palette.secondary.main};
  background-image: url("/login/welcome-login-screen/logo-text.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-clip: text;
  color: transparent;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: #fff;
  font-size: 2rem;
  line-height: 1;
  transform: rotate(-5deg);
`;

const StyledUploadModalWrapper = styled.div<{
  $is_modal_open: boolean;
}>`
  ${(props) =>
    props.$is_modal_open &&
    `
    position:absolute;
    width:100%;
    height:100%;
    background:transparent;
    z-index:3;
  `}
`;

export {
  StyledPage,
  StyledImageContainer,
  StyledImage,
  StyledContentContainer,
  StyledLogoContainer,
  StyledLogo,
  StyledUploadModalWrapper,
};
