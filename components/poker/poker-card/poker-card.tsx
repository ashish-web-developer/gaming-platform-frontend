import { useState } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";
import type { ICardSuit, ICardRank } from "@/types/store/slice/poker";

// styled components
import {
  StyledPokerCardWrapper,
  StyledPokerContentContainer,
  StyledCardTypeWrapper,
  StyledCard,
  StyledCardName,
} from "@/styles/components/poker/poker-card/poker-card.style";

// theme
import { useTheme } from "styled-components";

// local components
import PokerSuit from "@/components/poker/poker-card/poker-suit";

// helpers
import { getCardRankInWord } from "@/helpers/poker/poker.helper";

const PokerCard: FC<{
  suit: ICardSuit;
  rank: ICardRank;
}> = ({ suit, rank }) => {
  const theme = useTheme() as ITheme;
  return (
    <StyledPokerCardWrapper>
      <StyledPokerContentContainer $rank={rank}>
        <StyledCardTypeWrapper $left="4px" $top="4px" $flex_direction="column">
          <StyledCard>{rank}</StyledCard>
          <PokerSuit
            suit={suit}
            fill={theme.palette.secondary.main}
            stroke_color={theme.palette.secondary.main}
          />
        </StyledCardTypeWrapper>
        <StyledCardTypeWrapper
          $right="4px"
          $bottom="4px"
          $flex_direction="column-reverse"
        >
          <StyledCard>{rank}</StyledCard>
          <PokerSuit
            suit={suit}
            fill={theme.palette.secondary.main}
            stroke_color={theme.palette.secondary.main}
          />
        </StyledCardTypeWrapper>
        {rank !== "K" && rank !== "Q" && rank !== "J" && (
          <StyledCardName>
            {getCardRankInWord(rank)} of {suit}
          </StyledCardName>
        )}
      </StyledPokerContentContainer>
    </StyledPokerCardWrapper>
  );
};
export default PokerCard;
