// types
import type { FC } from "react";
import type { ITheme } from "@/theme/poker.theme";

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
  is_flipped?: boolean;
  scale?: number;
}> = ({ is_flipped = true, scale }) => {
  const theme = useTheme() as ITheme;

  return (
    <StyledContainer $is_flipped={is_flipped} $scale={scale}>
      {is_flipped ? (
        <>
          <StyledVectorWrappper $right="4px" $top="4px">
            <CornerDesignVector />
          </StyledVectorWrappper>
          <StyledVectorWrappper $left="4px" $bottom="4px" $rotate="180deg">
            <CornerDesignVector />
          </StyledVectorWrappper>
          <StyledCardDetailsWrapper $position="top">
            <StyledRank>A</StyledRank>
            <Suit
              show_image={true}
              stroke_width={1}
              stroke={theme.palette.primary.main}
              size={20}
              suit_type="spade"
            />
          </StyledCardDetailsWrapper>
          <StyledCardDetailsWrapper $position="bottom">
            <Suit
              show_image={true}
              stroke_width={1}
              stroke={theme.palette.primary.main}
              size={20}
              suit_type="spade"
            />
            <StyledRank>A</StyledRank>
          </StyledCardDetailsWrapper>
          <Suit
            show_image={true}
            stroke_width={0.5}
            stroke={theme.palette.primary.main}
            size={60}
            suit_type="spade"
          />
        </>
      ) : (
        <StyledDesignPattern />
      )}
    </StyledContainer>
  );
};

export default PokerCard;
