// styled components
import {
  StyledTimer,
  StyledSpan,
} from "@/styles/components/memory-game/game-board/timer.style";

const Timer = () => {
  return (
    <StyledTimer>
      <StyledSpan>Your Turn!</StyledSpan>
    </StyledTimer>
  );
};

export default Timer;
