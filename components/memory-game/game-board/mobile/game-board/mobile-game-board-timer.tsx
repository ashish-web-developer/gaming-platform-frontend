import { useState, useEffect } from "react";
// types
import type { FC } from "react";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { user } from "@/store/slice/user.slice";
import { player_turn_id } from "@/store/slice/memory-game.slice";
import {
  timer_start_count,
  updatePlayerTurnEvent,
} from "@/store/slice/game.slice";

const MobileGameBoardTimer: FC = () => {
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

  return <>{String(timerCount).padStart(2, "0")}</>;
};

export default MobileGameBoardTimer;
