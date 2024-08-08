// types
import type { ITheme } from "@/theme/poker.theme";
import type { FC } from "react";
import type { ICardRank, ICardSuit } from "@/types/store/slice/poker";

// theme
import { useTheme } from "styled-components";

// styled components
import {
  StyledPokerCardWrapper,
  StyledPokerCardRank,
} from "@/styles/components/poker/poker-card/mobile/mobile-poker-card.style";

// local components
import PokerSuit from "@/components/poker/poker-card/poker-suit";

type IProps = {
  rank: ICardRank;
  suit: ICardSuit;
};

const MobilePokerCard: FC<IProps> = ({ rank, suit }) => {
  const theme = useTheme() as ITheme;
  return (
    <StyledPokerCardWrapper>
      <StyledPokerCardRank $left="3px" $top="3px">
        {rank}
      </StyledPokerCardRank>
      <StyledPokerCardRank $right="3px" $bottom="3px">
        {rank}
      </StyledPokerCardRank>
      <PokerSuit
        suit={suit}
        stroke_color={theme.palette.secondary.main}
        fill={theme.palette.secondary.main}
        is_mobile={true}
      />
    </StyledPokerCardWrapper>
  );
};
export default MobilePokerCard;
