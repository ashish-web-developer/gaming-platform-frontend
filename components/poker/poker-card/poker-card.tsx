import { useRef } from "react";
// types
import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";
import type { ICardRank, ICardSuit } from "@/types/store/slice/poker";

// theme
import { useTheme } from "styled-components";
// styled components
import {
  StyledContainer,
  StyledDesignPattern,
  StyledVectorWrappper,
  StyledCardDetailsWrapper,
  StyledRank,
} from "@/styles/components/poker/poker-card/poker-card.style";

// icons
import Suit from "@/components/poker/icons/suit";

const CornerDesignVector = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="35"
    fill="none"
    viewBox="0 0 38 35"
  >
    <path
      stroke="#000"
      strokeWidth="1.5"
      d="M37 33.5 33 31V15.5l-10-10M37 15l-5-5m5-3h-8.5l-6-6m11 2.5L6 4m4 2.5L.5 1"
    ></path>
  </svg>
);

const PokerCard: FC<{
  is_hole_card?: boolean;
  is_flipped?: boolean;
  scale?: number;
  suit: ICardSuit;
  rank: ICardRank;
  card_id: string;
  show_card?: boolean;
  ref_callback?: (node: HTMLDivElement | null) => void;
  cardHoverHandler?: (
    node: HTMLDivElement,
    event_type: "enter" | "leave"
  ) => void;
}> = ({
  is_hole_card = false,
  is_flipped = true,
  scale,
  suit,
  rank,
  card_id,
  show_card = true,
  ref_callback,
  cardHoverHandler,
}) => {
  const theme = useTheme() as ITheme;
  const container_ref = useRef<HTMLDivElement | null>(null);

  return (
    <StyledContainer
      className={is_hole_card ? "player-hole-card" : "poker-card"}
      $hide={!show_card}
      data-flip-id={card_id}
      ref={(node) => {
        container_ref.current = node;
        ref_callback?.(node);
      }}
      $scale={scale}
      onMouseEnter={(event) =>
        container_ref.current &&
        cardHoverHandler?.(container_ref.current, "enter")
      }
      onMouseLeave={(event) =>
        container_ref.current &&
        cardHoverHandler?.(container_ref.current, "leave")
      }
    >
      {is_flipped ? (
        <>
          <StyledVectorWrappper $right="4px" $top="4px">
            <CornerDesignVector />
          </StyledVectorWrappper>
          <StyledVectorWrappper $left="4px" $bottom="4px" $rotate="180deg">
            <CornerDesignVector />
          </StyledVectorWrappper>
          <StyledCardDetailsWrapper $position="top">
            <StyledRank>{rank}</StyledRank>
            <Suit
              show_image={true}
              stroke_width={1}
              stroke={theme.palette.primary.main}
              size={20}
              suit_type={suit}
            />
          </StyledCardDetailsWrapper>
          <StyledCardDetailsWrapper $position="bottom">
            <Suit
              show_image={true}
              stroke_width={1}
              stroke={theme.palette.primary.main}
              size={20}
              suit_type={suit}
            />
            <StyledRank>{rank}</StyledRank>
          </StyledCardDetailsWrapper>
          <Suit
            show_image={true}
            stroke_width={0.5}
            stroke={theme.palette.primary.main}
            size={60}
            suit_type={suit}
          />
        </>
      ) : (
        <StyledDesignPattern />
      )}
    </StyledContainer>
  );
};

export default PokerCard;
