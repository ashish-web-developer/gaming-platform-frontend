import styled from "styled-components";
import Image from "next/image";

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

const StyledSvgWrapper = styled.div`
  position: absolute;
  z-index: 3;
  top: 44px;
  left: 24px;
`;

const StyledCommunityCardsWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 95px;
  transform: translateX(-60%);
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(5, 50px);
  gap: 8px;
`;

const StyledPokerSliderWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  top: 375px;
`;

const StyledChipsInPotWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  top: 330px;
  background: red;
  padding: 6px 24px 6px 12px;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.palette.primary.main};
  border: 2px dashed ${({ theme }) => theme.palette.info.main};
  border-radius:16px;
`;

const StyledChipsInPot = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: 1.125rem;
  line-height: 1;
  color: ${({ theme }) => theme.palette.info.main};
`;

export {
  StyledImageContainer,
  StyledImage,
  StyledSvgWrapper,
  StyledCommunityCardsWrapper,
  StyledPokerSliderWrapper,
  StyledChipsInPotWrapper,
  StyledChipsInPot,
};
