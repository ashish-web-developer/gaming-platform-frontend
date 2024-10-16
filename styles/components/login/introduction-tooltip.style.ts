import styled from "styled-components";
import Image from "next/image";
const StyledGirlImageWrapper = styled.div<{
  $width: string;
  $height: string;
  $left?: string;
  $right?: string;
  $display?: string;
}>`
  position: absolute;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  bottom: 0px;
  display: ${(props) => props.$display ?? "block"};
`;

const StyledGirlImage = styled(Image)`
  object-fit: contain;
`;

const StyledInfoTooltip = styled.div<{
  $bottom?: string;
  $left?: string;
  $right?: string;
  $display?: string;
}>`
  position: absolute;
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  display: ${(props) => props.$display ?? "block"};
  z-index: 2;
`;
const StyledInfoTooltipText = styled.p<{
  $font_size: string;
  $rotate: string;
  $top: string;
  $left: string;
  $color: string;
}>`
  position: absolute;
  font-family: ${({ theme }) => theme.fontFamily.bangers};
  font-size: ${(props) => props.$font_size};
  color: ${(props) => props.$color};
  width: 180px;
  line-height: 1;
  transform: rotate(${(props) => props.$rotate});
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
`;

const StyledSpan = styled.span<{
  $color: string;
}>`
  color: ${(props) => props.$color};
`;

export {
  StyledGirlImageWrapper,
  StyledGirlImage,
  StyledInfoTooltip,
  StyledInfoTooltipText,
  StyledSpan,
};
