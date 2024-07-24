import styled from "styled-components";

const StyledPokerCardWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 60px;
  border: 1.5px solid ${({ theme }) => theme.palette.secondary.main};
  border-radius: 4px;
  background: #000;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPokerCardRank = styled.span<{
  $left?: string;
  $right?: string;
  $top?: string;
  $bottom?: string;
}>`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 10px;
  color: ${({ theme }) => theme.palette.secondary.main};
  position: absolute;
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
`;
export { StyledPokerCardWrapper, StyledPokerCardRank };
