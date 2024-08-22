import { useEffect, useState } from "react";
// types
import type { ComponentType } from "react";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  player_turn_id,
  active_cognimatch_players,
  timer_start_count,
  updateTimerStartTimeApi,
} from "@/store/slice/cognimatch.slice";

type IBaseProps = {
  timer_count: number;
};
const withTimer = (BaseComponent: ComponentType<IBaseProps>) => {
  const EnhancedComponent = () => {
    const dispatch = useAppDispatch();
    const [timer_count, set_timer_count] = useState(0);
    const { id: user_id } = useAppSelector(user);
    const _player_turn_id = useAppSelector(player_turn_id);
    const opponent_player_id = useAppSelector(active_cognimatch_players).filter(
      (player) => player.id !== _player_turn_id
    )[0]?.id;
    const _timer_start_count = useAppSelector(timer_start_count);
    const [is_timer_api_triggered, set_is_timer_api_triggered] =
      useState(false);

    useEffect(() => {
      const updateTimer = () => {
        const target_time = _timer_start_count + 33000; // keeping timer of 30 seconds;
        const time_remaining = target_time - new Date().getTime();
        if (
          time_remaining < 1000 &&
          _player_turn_id == user_id &&
          !is_timer_api_triggered
        ) {
          /**
           * if there is no remaining time
           * we are updating the turn for the
           * opponent player
           */
          dispatch(
            updateTimerStartTimeApi({ next_player_turn_id: opponent_player_id })
          );
          set_is_timer_api_triggered(true);
        } else if (time_remaining >= 0) {
          const seconds = Math.floor((time_remaining / 1000) % 60);
          set_timer_count(seconds);
        }
      };
      const timer = setInterval(updateTimer, 1000);
      return () => {
        clearInterval(timer);
      };
    }, [_timer_start_count, opponent_player_id, is_timer_api_triggered]);
    useEffect(() => {
      set_is_timer_api_triggered(false);
    }, [_timer_start_count]);
    return <BaseComponent timer_count={timer_count} />;
  };
  return EnhancedComponent;
};

export default withTimer;
