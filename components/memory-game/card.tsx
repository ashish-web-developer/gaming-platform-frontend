import { useState, useEffect } from "react";

// Types

import type { FC } from "react";

// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  updateCard,
  removeCard,
  updateLastFlippedCard,
  cardList,
  lastFlippedCard,
  memoryGameCardEvent
} from "@/store/slice/memory-game.slice";

// helpers
import { getRandomImage } from "@/helpers/memory-game/game";

// Style
import {
  StyledContainer,
  StyledTopCardSuit,
  StyledBottomCardText,
  StyledBottomCardSuit,
  StyledTopCardText,
  ChildContainer,
  StyledContainerWithBackground
} from "@/styles/components/memory-game/card.style";

interface Props {
  width: number;
  suit: string;
  card: string | number;
  cardColor: "red" | "black";
  isPlay: boolean;
  cardId: string;
  files: string[];
}

const Card: FC<Props> = ({
  width,
  suit,
  card,
  cardColor,
  isPlay,
  cardId,
  files,
}) => {
  const dispatch = useAppDispatch();
  const _cardList = useAppSelector(cardList);
  const _lastFlippedCard = useAppSelector(lastFlippedCard);
  const [isFlipped, setIsFlipped] = useState(false);
  const image = useRandomImage(files);
  useSetCardId(cardId);

  /**
   * whenever player click on a card then we are
   * showing that card, storing it in lastFlipped
   * card variable then when we click on next card
   * then verifying the last clicked card with
   * current card if value matched hten then showing
   * the both card, else if value doesn't matches then
   * showing the card for 1 sec and then flipping it down
   */
  const handleFlipping = () => {
    // user is in play mode
    if (isPlay) {
      /**
       * check if last flipped card is same is current
       * flippped card or if last flipped card is null
       */
      if (
        (_lastFlippedCard?.card == card &&
          _lastFlippedCard.cardColor == cardColor &&
          _lastFlippedCard?.suit == suit) ||
        _lastFlippedCard == null
      ) {
        /**
         * Either current card matched with last flipped
         * card or current flipped card is null in both cases
         * shows the current card
         */
        dispatch(
          updateCard({
            key: cardId,
            value: true,
          })
        );
        if (_lastFlippedCard == null) {
          dispatch(
            updateLastFlippedCard({
              id: cardId,
              suit,
              card,
              cardColor,
            })
          );
        } else {
          dispatch(updateLastFlippedCard(null));
        }
      } else {
        /**
         * if card doesn't match then shows card for a second
         * then flip it down and set the last flipped card value
         * to null
         */
        dispatch(
          updateCard({
            key: cardId,
            value: true,
          })
        );
        setTimeout(() => {
          dispatch(
            updateCard({
              key: cardId,
              value: false,
            })
          );
          dispatch(
            updateCard({
              key: _lastFlippedCard.id,
              value: false,
            })
          );
        }, 1000);
        dispatch(updateLastFlippedCard(null));
      }
      dispatch(memoryGameCardEvent({card_id:cardId,player_id:20}));
    }
    return null;
  };

  return (
    <>
      {_cardList[cardId] ? (
        <StyledContainer width={width}>
          <StyledTopCardText color={cardColor}>{card}</StyledTopCardText>
          <StyledTopCardSuit color={cardColor}>{suit}</StyledTopCardSuit>
          <StyledBottomCardSuit color={cardColor}>{suit}</StyledBottomCardSuit>
          <StyledBottomCardText color={cardColor}>{card}</StyledBottomCardText>
          <ChildContainer color={cardColor}>{suit}</ChildContainer>
        </StyledContainer>
      ) : (
        <StyledContainerWithBackground
          onClick={handleFlipping}
          width={width}
          $image={image}
        ></StyledContainerWithBackground>
      )}
    </>
  );
};

function useRandomImage(files: string[]) {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  useEffect(() => {
    setBackgroundImage(getRandomImage(files));
  }, []);
  return backgroundImage;
}

function useSetCardId(id: string) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      updateCard({
        key: id,
        value: false,
      })
    );
    return () => {
      dispatch(removeCard(id));
    };
  }, []);
}
export default Card;
