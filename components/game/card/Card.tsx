import { useState, useEffect } from "react";
import styled from "styled-components";

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
} from "@/store/memory-game.slice";

// helpers
import { getRandomImage } from "@/helpers/memory-game/game";

interface StyledContainerProps {
  width: number;
}

interface StyledTextProps {
  color: "red" | "black";
}

interface StyledBackgroundProps {
  $image: string;
}

const StyledContainer = styled.div<StyledContainerProps>`
    width:${(props) => props.width}px;
    height:${(props) => props.width * 1.4}px;
    border-radius:8px;
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgb(231,233,237) !important;
    transition: box-shadow 0.2s ease-in-out; /* Optional: Add smooth transition */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}
`;

const StyledContainerWithBackground = styled(
  StyledContainer
)<StyledBackgroundProps>`
  background-image: url(/memory-game/${(props) => props.$image});
  background-size: cover;
  background-repeat: no-repeat;
`;

const StyledTopCardText = styled.h1<StyledTextProps>`
  font-family: "Rubik Moonrocks", cursive;
  position: absolute;
  top: 15px;
  left: 15px;
  color: ${(props) => props.color};
  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

const StyledBottomCardText = styled.h1<StyledTextProps>`
  font-family: "Rubik Moonrocks", cursive;
  transform: rotate(180deg);
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: ${(props) => props.color};
  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

const StyledTopCardSuit = styled.span<StyledTextProps>`
    position:absolute;
    font-size:40px;
    color:${(props) => props.color};
    top:50px;
    left:15px;
    @media (max-width: 600px) {
        font-size:30px;
        top:40px;
    }
}
`;

const StyledBottomCardSuit = styled.span<StyledTextProps>`
    position:absolute;
    font-size:40px;
    color:${(props) => props.color};
    bottom:50px;
    transform:rotate(180deg);
    right:15px;
    @media (max-width: 600px) {
        font-size:30px;
        bottom:40px; 
    }
}
`;

const ChildContainer = styled.div<StyledTextProps>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  color: ${(props) => props.color};
  @media (max-width: 600px) {
    font-size: 50px;
  }
`;

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
