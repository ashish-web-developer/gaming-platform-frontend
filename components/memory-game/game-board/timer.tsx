import type { FC } from "react";
// styled components
import {
  StyledTimer,
  StyledSpan,
  StyledTimeContainer,
  StyledTime,
} from "@/styles/components/memory-game/game-board/timer.style";

// hoc
import withTimer from "@/hoc/memory-game/with-timer";

// icons
import TimerIcon from "@/components/memory-game/game-board/icons/timer";

// redux
import { useAppSelector } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import { player_turn_id } from "@/store/slice/cognimatch.slice";

const Timer: FC<{
  timer_count: number;
}> = ({ timer_count }) => {
  const _player_turn_id = useAppSelector(player_turn_id);
  const { id: user_id } = useAppSelector(user);

  return (
    <StyledTimer>
      {_player_turn_id == user_id ? (
        <StyledSpan>Your Turn!</StyledSpan>
      ) : (
        <StyledSpan>Waiting...</StyledSpan>
      )}
      <StyledTimeContainer>
        <TimerIcon size={18} />
        <StyledTime>00 : {String(timer_count).padStart(2, "0")}</StyledTime>
      </StyledTimeContainer>
    </StyledTimer>
  );
};

export default withTimer(Timer);
