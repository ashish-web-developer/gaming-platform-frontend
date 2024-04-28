import styled from "styled-components";
// types
import type { ICardRank } from "@/types/store/slice/poker";

const StyledPokerCardWrapper = styled.div<{
  $show_card: boolean;
}>`
  width: 60px;
  height: 90px;
  border: 2px ${(props) => (props.$show_card ? "solid" : "dashed")}
    ${({ theme }) => theme.palette.secondary.main};
  border-radius: 6px;
  background: ${(props) => (props.$show_card ? "#000" : "transparent")};
  overflow: hidden;
`;

const StyledPokerContentContainer = styled.div<{
  $rank: ICardRank;
}>`
  width: 100%;
  height: 100%;
  position: relative;
  ${(props) => {
    switch (props.$rank) {
      case "K":
        return `
          background:url("/poker/poker-card/king.png");
          background-size:90%;
          background-repeat:no-repeat;
          background-position:center;
        `;
      case "Q":
        return `
          background:url("/poker/poker-card/queen.png");
          background-size:90%;
          background-repeat:no-repeat;
          background-position:center;
        `;
      case "J":
        return `
          background:url("/poker/poker-card/jack.png");
          background-size:90%;
          background-repeat:no-repeat;
          background-position:center;
        `;
      default:
        return `
          background:transparent;
        `;
    }
  }}
`;

const StyledCardTypeWrapper = styled.div<{
  $left?: string;
  $right?: string;
  $top?: string;
  $bottom?: string;
  $flex_direction: "column" | "column-reverse";
}>`
  position: absolute;
  left: ${(props) => props.$left ?? "auto"};
  right: ${(props) => props.$right ?? "auto"};
  top: ${(props) => props.$top ?? "auto"};
  bottom: ${(props) => props.$bottom ?? "auto"};
  display: flex;
  flex-direction: ${(props) => props.$flex_direction};
  align-items: center;
  gap: 2px;
`;
const StyledCard = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.lobster};
  font-size: 0.625rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export {
  StyledPokerCardWrapper,
  StyledPokerContentContainer,
  StyledCardTypeWrapper,
  StyledCard,
};
