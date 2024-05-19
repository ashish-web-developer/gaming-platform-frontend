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
  $cursor?: "auto" | "pointer";
}>`
  position: absolute;
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  cursor: ${(props) => props.$cursor ?? "auto"};
`;

export { StyledPokerActionCta, StyledVectorWrapper };
