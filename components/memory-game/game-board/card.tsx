import { forwardRef, useEffect, useId, useRef } from "react";
// types
import type { ICard } from "@/types/store/slice/memory-game";
import type { FC } from "react";
import type { User } from "@/types/user";
import type { ForwardRefRenderFunction } from "react";
import type { Score } from "@/types/store/slice/memory-game";
// styled components
import {
  StyledCard,
  StyledBorder,
  StyledText,
  StyledTextSpan,
  StyledCardNumber,
  StyledCardName,
  StyledPatternContainer,
  StyledCardPattern,
  StyledCardContent,
} from "@/styles/components/memory-game/game-board/card.style";

// helpers
import { getCardName } from "@/helpers/memory-game/game";

// redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hook";
import {
  memoryGameCardEvent,
  updateLastFlippedCardEvent,
  card_list,
  updateScoreEvent,
} from "@/store/slice/memory-game.slice";
import {
  // states
  score,
  last_flipped_card_id,
} from "@/store/slice/memory-game.slice";
import { updatePlayerTurnEvent } from "@/store/slice/game.slice";

// hooks
import { useIsMobile } from "@/hooks/common.hook";

const PatternBottom: FC<{ size: number | string }> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path stroke="#000" d="M19 0v13.5a6 6 0 01-6 6H0"></path>
    </svg>
  );
};

const PatternTop: FC<{ size: number | string }> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 21"
    >
      <path stroke="#000" d="M1 20.5V7a6 6 0 016-6h13"></path>
    </svg>
  );
};

const CardPattern: FC<{ size: number | string; image: string }> = ({
  size,
  image,
}) => {
  const image_id = useId();
  const image_path = `/memory-game/game-board/card/${image}.jpg`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 52 52"
    >
      <path
        fill={`url(#pattern-${image_id})`}
        fillRule="evenodd"
        stroke="#000"
        d="M29.923 1.364c5.641 1.177 8.908 6.517 12.48 10.828 2.661 3.211 3.987 6.94 5.433 10.788 1.498 3.988 3.407 7.8 3.139 12.026-.334 5.254-.22 11.79-4.836 14.703-4.635 2.924-10.916.19-16.216-1.419-3.986-1.209-6.25-5.027-10.108-6.567-5.82-2.324-14.448.471-17.835-4.59-3.175-4.745 2.222-10.651 4.061-15.995 1.836-5.33 2.21-11.459 6.66-15.144 4.61-3.817 11.249-5.877 17.222-4.63z"
        clipRule="evenodd"
      ></path>
      <defs>
        <pattern
          id={`pattern-${image_id}`}
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            transform="matrix(.00093 0 0 .00093 -.006 0)"
            xlinkHref={`#${image_id}`}
          ></use>
        </pattern>
        <image
          id={image_id}
          width="1094"
          height="1080"
          xlinkHref={image_path}
        ></image>
      </defs>
    </svg>
  );
};

interface IProps extends ICard {
  is_clickable: boolean;
  user: User;
  player_turn_id: number;
}
interface IForwardedRef {
  card_match_sound: HTMLAudioElement | null;
}

const Card: ForwardRefRenderFunction<IForwardedRef, IProps> = (
  {
    suit,
    card,
    cardColor,
    flipped,
    id,
    is_clickable,
    user,
    card_image,
    player_turn_id,
  },
  ref
) => {
  const is_mobile = useIsMobile();
  const _card_list = useAppSelector(card_list);
  const dispatch = useAppDispatch();
  const _last_flipped_card_id = useAppSelector(last_flipped_card_id);
  const _last_flipped_card = _card_list.filter(
    (card) => card.id == _last_flipped_card_id
  )[0];
  const _score = useAppSelector(score) as Score;
  const getCardColor: any = () => {
    if (flipped) {
      return cardColor == "red" ? "#D62839" : "#090302";
    }
    return "#000";
  };
  const timeout_ref = useRef<NodeJS.Timeout>();

  useEffect(() => {
    console.log("component got rerender");
    return () => {
      console.log("unmount");
      clearTimeout(timeout_ref.current);
    };
  }, []);
  return (
    <StyledCard
      $filter={player_turn_id == user.id ? false : true}
      onClick={() => {
        if (is_clickable) {
          // To flip the card for both user;
          dispatch(
            memoryGameCardEvent({
              card_id: id,
              flipped: true,
            })
          );
          /**
           * Here we are checking if two card
           * are not matching or not
           * if two card matches then we
           * then we update the score
           * else we flip down the
           * both card
           */
          if (_last_flipped_card) {
            if (
              _last_flipped_card.card == card &&
              _last_flipped_card.cardColor == cardColor &&
              _last_flipped_card.suit == suit
            ) {
              dispatch(
                updateScoreEvent({
                  score: {
                    ..._score,
                    [user.id as number]: _score[user.id as number] + 1,
                  },
                })
              );
              typeof ref !== "function"
                ? ref?.current?.card_match_sound?.play()
                : null;
            } else {
              timeout_ref.current = setTimeout(() => {
                dispatch(
                  memoryGameCardEvent({
                    card_id: _last_flipped_card_id as string,
                    flipped: false,
                  })
                );
                dispatch(
                  memoryGameCardEvent({
                    card_id: id,
                    flipped: false,
                  })
                );
              }, 2000);
            }
            dispatch(updatePlayerTurnEvent());
          }
          /**
           * last_flipped_card_id state is used to track
           * the last flipped card, once one card has been
           * flipped then next time we match the first card
           * to the second card and check if it's a match
           * or not, then we set it to null for both
           * user
           */
          dispatch(
            updateLastFlippedCardEvent({
              card_id: _last_flipped_card_id ? null : id,
            })
          );
        }
      }}
      $showBackground={!flipped}
      $cursor={is_clickable}
    >
      <StyledCardContent $display={flipped ? "block" : "none"}>
        <StyledBorder $backgroundColor={"#F3FAE1"} $borderColor={getCardColor}>
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
        </StyledBorder>
      </StyledCardContent>
      <StyledCardContent $display={!flipped ? "block" : "none"}>
        <StyledText $top="20px" $right="-12px" $rotate="90deg">
          Cogni<StyledTextSpan>Match</StyledTextSpan>
        </StyledText>
        <StyledText $bottom="20px" $left="-12px" $rotate="270deg">
          Cogni<StyledTextSpan>Match</StyledTextSpan>
        </StyledText>
        <StyledPatternContainer $top="3px" $left="2.5px">
          <PatternTop size={20} />
        </StyledPatternContainer>
        <StyledPatternContainer $bottom="-1px" $right="3px">
          <PatternBottom size={20} />
        </StyledPatternContainer>
        <StyledCardPattern>
          <CardPattern size={is_mobile ? "100%" : 52} image={card_image} />
        </StyledCardPattern>
      </StyledCardContent>
    </StyledCard>
  );
};

export default forwardRef(Card);
