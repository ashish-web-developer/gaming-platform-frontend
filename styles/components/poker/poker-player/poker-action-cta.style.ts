import styled from "styled-components";

const StyledPokerActionCta = styled.div`
  bottom: -60px;
  z-index: 4;
  position: relative;
  width: 250px;
  height: 125px;
`;
const StyledVectorWrapper = styled.div<{
  $left?: string;
  $right?: string;
  $top?: string;
  $bottom?: string;
}>`
  position: absolute;
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
`;

export {
  StyledPokerActionCta,
  StyledVectorWrapper,
};
