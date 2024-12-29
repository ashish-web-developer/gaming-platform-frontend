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
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(5, 50px);
  gap: 8px;
`;

const StyledActionCtaWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  top: 375px;
  display: flex;
  gap: 12px;
`;

const StyledActionCta = styled.button`
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  line-height: 1;
  color: ${({ theme }) => theme.palette.info.main};
  background: ${({ theme }) => theme.palette.primary.main};
  padding: 10px 16px;
  border: 2px solid ${({ theme }) => theme.palette.success.main};
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const StyledActionCtaIcons = styled(Image)`
  object-fit: cover;
`;

const StyledPokerSliderWrapper = styled.div`
  position: absolute;
  left:50%;
  transform:translateX(-50%);
  z-index: 3;
  top:375px;
`;

export {
  StyledImageContainer,
  StyledImage,
  StyledSvgWrapper,
  StyledCommunityCardsWrapper,
  StyledActionCtaWrapper,
  StyledActionCta,
  StyledActionCtaIcons,
  StyledPokerSliderWrapper,
};
