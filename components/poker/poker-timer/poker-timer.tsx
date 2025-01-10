// types
import type { FC } from "react";

// styled components
import {
  StyledPokerTimerContainer,
  StyledTimer,
  StyledTimerCount,
  StyledTimerUnit,
} from "@/styles/components/poker/poker-timer/poker-timer.style";

const PokerTimer: FC = () => {
  return (
    <StyledPokerTimerContainer>
      <StyledTimer>
        <StyledTimerCount>00</StyledTimerCount>
        <StyledTimerUnit>MIN</StyledTimerUnit>
      </StyledTimer>
      <StyledTimer>
        <StyledTimerCount>00</StyledTimerCount>
        <StyledTimerUnit>SEC</StyledTimerUnit>
      </StyledTimer>
    </StyledPokerTimerContainer>
  );
};
export default PokerTimer;
