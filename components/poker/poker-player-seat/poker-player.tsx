import { forwardRef } from "react";

// types
import type { FC, ForwardRefRenderFunction } from "react";

// styled components
import {
  StyledPokerPlayerWrapper,
  StyledPokerPlayerDetails,
  StyledPlayerName,
  StyledPlayerAmount,
} from "@/styles/components/poker/poker-player-seat/poker-player.style";

const PokerPlayer: ForwardRefRenderFunction<HTMLDivElement> = (
  {},
  container_ref
) => {
  return (
    <StyledPokerPlayerWrapper id="player" ref={container_ref}>
      <StyledPokerPlayerDetails>
        <StyledPlayerName>Stafani Gwen</StyledPlayerName>
        <StyledPlayerName>$ 143.7 M</StyledPlayerName>
      </StyledPokerPlayerDetails>
    </StyledPokerPlayerWrapper>
  );
};
export default forwardRef(PokerPlayer);
