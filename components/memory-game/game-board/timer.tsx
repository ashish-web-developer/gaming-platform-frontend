import { useState, useEffect } from "react";
// styled components
import {
  StyledTimer,
  StyledSpan,
  StyledTimeContainer,
  StyledTime,
} from "@/styles/components/memory-game/game-board/timer.style";

// icons
import TimerIcon from "@/components/memory-game/game-board/icons/timer";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { player_turn_id } from "@/store/slice/memory-game.slice";
import {
  timer_start_count,
  updatePlayerTurnEvent,
} from "@/store/slice/game.slice";

const Timer = () => {
  const dispatch = useAppDispatch();
  const [timerCount, setTimerCount] = useState(0);
  const _user = useAppSelector(user);
  const _player_turn_id = useAppSelector(player_turn_id);
  const _timer_start_count = useAppSelector(timer_start_count);

  useEffect(() => {
    const updateCountDown = () => {
      const target_time = (_timer_start_count as number) + 30000;
      const time_remaining = target_time - new Date().getTime();
      if (time_remaining <= 0) {
        if (_player_turn_id == _user.id) {
          dispatch(updatePlayerTurnEvent());
        }
      } else {
        const seconds = Math.floor((time_remaining / 1000) % 60);
        setTimerCount(seconds);
      }
    };
    const timer = setInterval(updateCountDown, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [_timer_start_count]);
  return (
    <StyledTimer>
      {_player_turn_id == _user.id ? (
        <StyledSpan>Your Turn!</StyledSpan>
      ) : (
        <StyledSpan>Waiting...</StyledSpan>
      )}
      <StyledTimeContainer>
        <TimerIcon size={18} />
        <StyledTime>00 : {timerCount}</StyledTime>
      </StyledTimeContainer>
    </StyledTimer>
  );
};

export default Timer;
