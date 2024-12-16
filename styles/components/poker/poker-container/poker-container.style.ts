import styled from "styled-components";
import Image from "next/image";

const StyledPage = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("/poker/background.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  user-select: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
    background: url("/poker/mobile-background.jpg");
    background-size: cover;
  }
`;
const StyledContainer = styled.div`
  width: 75rem;
  height: 100%;
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
`;

const StyledTableWrapper = styled.div``;

const StyledImageContainer = styled.div<{
  $width: string;
  $height: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
  $translateX?: string;
  $translateY?: string;
  $zIndex?: number;
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
  z-index: ${(props) => props.$zIndex ?? "auto"};
`;
const StyledImage = styled(Image)<{
  $object_position?: string;
}>`
  object-fit: contain;
  object-position: ${(props) => props.$object_position ?? "50% 50%"};
`;

export {
  StyledPage,
  StyledContainer,
  StyledTableWrapper,
  StyledImageContainer,
  StyledImage,
};
