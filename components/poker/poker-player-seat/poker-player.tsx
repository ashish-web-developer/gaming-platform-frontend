import { forwardRef } from "react";

// types
import type { FC, ForwardRefRenderFunction } from "react";

// local components
import PokerCard from "@/components/poker/poker-card/poker-card";

// styled components
import {
  StyledPokerPlayerWrapper,
  StyledPokerPlayerDetails,
  StyledHoleCardWrapper,
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
      <StyledHoleCardWrapper>
        <PokerCard scale={0.4} />
        <PokerCard scale={0.4} />
      </StyledHoleCardWrapper>
    </StyledPokerPlayerWrapper>
  );
};
export default forwardRef(PokerPlayer);
