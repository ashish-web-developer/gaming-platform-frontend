import { useEffect } from "react";
// types
import type { FC } from "react";

// hoc
import withCountDownFunctionality from "@/hoc/common/with-count-down-functionality";

// styled components
import {
  StyledPokerTimerWrapper,
  StyledTimer,
  StyledTimerCount,
  StyledTimerUnit,
} from "@/styles/components/poker/poker-timer/poker-timer.style";

const PokerTimer: FC<{
  count: number;
  is_finished: boolean;
  handleOnFinish: () => void;
}> = ({ count, is_finished, handleOnFinish }) => {
  let minutes = Math.floor(count / 60);
  let seconds = count % 60;

  useEffect(() => {
    if (is_finished) {
      handleOnFinish();
    }
  }, [is_finished]);
  return (
    <StyledPokerTimerWrapper>
      <StyledTimer>
        <StyledTimerCount>
          {minutes.toString().padStart(2, "0")}
        </StyledTimerCount>
        <StyledTimerUnit>MIN</StyledTimerUnit>
      </StyledTimer>
      <StyledTimer>
        <StyledTimerCount>
          {seconds.toString().padStart(2, "0")}
        </StyledTimerCount>
        <StyledTimerUnit>SEC</StyledTimerUnit>
      </StyledTimer>
    </StyledPokerTimerWrapper>
  );
};
export default withCountDownFunctionality<{
  initial_count: number;
  handleOnFinish: () => void;
}>(PokerTimer);
