import { useState } from "react";

// types
import type { ICard } from "@/types/store/slice/memory-game";
import type { FC } from "react";
// styled components
import {
  StyledCard,
  StyledBorder,
  StyledText,
  StyledTextSpan,
  StyledCardNumber,
  StyledCardName,
} from "@/styles/components/memory-game/game-board/card.style";

// helpers
import { getCardName } from "@/helpers/memory-game/game";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  updateCardState,
  memoryGameCardEvent,
} from "@/store/slice/memory-game.slice";
import {
  card_turn_count,
  updateCardTurnCount,
} from "@/store/slice/memory-game.slice";
import { updatePlayerTurn } from "@/store/slice/game.slice";

interface IProps extends ICard {
  is_clickable: boolean;
}

const Card: FC<IProps> = ({
  suit,
  card,
  cardColor,
  flipped,
  id,
  is_clickable,
}) => {
  const dispatch = useAppDispatch();
  const _card_turn_count = useAppSelector(card_turn_count);

  const getCardColor: any = () => {
    if (flipped) {
      return cardColor == "red" ? "#D62839" : "#090302";
    }
    return "#000";
  };
  return (
    <StyledCard
      onClick={() => {
        if (is_clickable) {
          dispatch(memoryGameCardEvent({ card_id: id, flipped: true }));
          dispatch(updateCardTurnCount((_card_turn_count + 1) as 0 | 1));
          if (_card_turn_count == 1) {
            dispatch(updateCardTurnCount(0));
            dispatch(updatePlayerTurn());
          }
        }
      }}
      $showBackground={!flipped}
    >
      <StyledBorder
        $backgroundColor={flipped ? "#F3FAE1" : "rgba(255,255,255,0)"}
        $borderColor={getCardColor}
      >
        {flipped && (
          <>
            <StyledCardNumber $position="top" $color={getCardColor}>
              <span>{card}</span>
              <span style={{ fontSize: "7px", marginTop: "-4px" }}>{suit}</span>
            </StyledCardNumber>
            <StyledCardNumber $position="bottom" $color={getCardColor}>
              <span>{card}</span>
              <span style={{ fontSize: "7px", marginTop: "-4px" }}>{suit}</span>
            </StyledCardNumber>
            <StyledCardName $color={getCardColor}>
              {getCardName({ suit, card })}
            </StyledCardName>
          </>
        )}
      </StyledBorder>
      {!flipped && (
        <StyledText>
          Cogni<StyledTextSpan>Match</StyledTextSpan>
        </StyledText>
      )}
    </StyledCard>
  );
};

export default Card;
