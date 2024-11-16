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
export {
  StyledPage,
  StyledImageContainer,
  StyledImage,
  StyledPokerCardWrapper,
};
