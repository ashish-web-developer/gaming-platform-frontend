import styled from "styled-components";

const StyledPokerActionCta = styled.div`
  position: relative;
  width: 255px;
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
  &:hover > span {
    display: inline-block;
  }
`;

const StyledTooltip = styled.span`
  position: relative;
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  color: #fff;
  background: #000;
  padding: 8px 16px;
  border: 2px solid ${({ theme }) => theme.palette.secondary.main};
  white-space: nowrap;
  border-radius: 30px;
  z-index: 2;
  display: none;
`;

export { StyledPokerActionCta, StyledVectorWrapper, StyledTooltip };
