import { useState } from "react";

// types
import type { ICard } from "@/types/store/slice/memory-game";
import type { FC } from "react";
import type { User } from "@/types/user";
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
  updateLastFlippedCardEvent,
  card_list,
  updateScoreEvent,
} from "@/store/slice/memory-game.slice";
import {
  // states
  card_turn_count,
  score,
  last_flipped_card_id,
  // actions
  updateCardTurnCount,
} from "@/store/slice/memory-game.slice";
import { updatePlayerTurnEvent } from "@/store/slice/game.slice";

interface IProps extends ICard {
  is_clickable: boolean;
  user: User;
}

const Card: FC<IProps> = ({
  suit,
  card,
  cardColor,
  flipped,
  id,
  is_clickable,
  user,
}) => {
  const _card_list = useAppSelector(card_list);
  const dispatch = useAppDispatch();
  const _card_turn_count = useAppSelector(card_turn_count);
  const _last_flipped_card_id = useAppSelector(last_flipped_card_id);
  const _last_flipped_card = _card_list.filter(
    (card) => card.id == _last_flipped_card_id
  )[0];
  const _score = useAppSelector(score);

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
          if (_card_turn_count == 0) {
            dispatch(updateLastFlippedCardEvent({ card_id: id }));
          }
          if (_card_turn_count == 1) {
            if (
              _last_flipped_card &&
              (_last_flipped_card.card !== card ||
                _last_flipped_card.cardColor !== cardColor ||
                _last_flipped_card.suit !== suit)
            ) {
              setTimeout(() => {
                dispatch(
                  memoryGameCardEvent({
                    card_id: _last_flipped_card.id,
                    flipped: false,
                  })
                );
                dispatch(memoryGameCardEvent({ card_id: id, flipped: false }));
              }, 2000);
            } else {
              if (_score) {
                dispatch(
                  updateScoreEvent({
                    score: {
                      ..._score,
                      [user.id as number]: _score[user.id as number] + 1,
                    },
                  })
                );
              }
            }
            dispatch(updateCardTurnCount(0));
            dispatch(updatePlayerTurnEvent());
            dispatch(updateLastFlippedCardEvent({ card_id: null }));
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
