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
import {
  player_turn_id,
  card_turn_count,
  last_flipped_card_id,
  memoryGameCardEvent,
  updateLastFlippedCardEvent,
  updateCardTurnCount,
} from "@/store/slice/memory-game.slice";
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
  const _card_turn_count = useAppSelector(card_turn_count);
  const _last_flipped_card_id = useAppSelector(last_flipped_card_id);

  useEffect(() => {
    const updateCountDown = () => {
      const target_time = (_timer_start_count as number) + 30000;
      const time_remaining = target_time - new Date().getTime();
      if (time_remaining <= 0) {
        if (_player_turn_id == _user.id) {
          dispatch(updatePlayerTurnEvent());
          if (_card_turn_count == 1) {
            dispatch(
              memoryGameCardEvent({
                card_id: _last_flipped_card_id as string,
                flipped: false,
              })
            );
            dispatch(updateCardTurnCount(0));
            dispatch(updateLastFlippedCardEvent({ card_id: null }));
          }
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
  }, [_timer_start_count, _card_turn_count, _last_flipped_card_id]);

  return (
    <StyledTimer>
      {_player_turn_id == _user.id ? (
        <StyledSpan>Your Turn!</StyledSpan>
      ) : (
        <StyledSpan>Waiting...</StyledSpan>
      )}
      <StyledTimeContainer>
        <TimerIcon size={18} />
        <StyledTime>00 : {String(timerCount).padStart(2, "0")}</StyledTime>
      </StyledTimeContainer>
    </StyledTimer>
  );
};

export default Timer;
