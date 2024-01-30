import { useEffect, useState } from "react";
// types
import type { ComponentType } from "react";
// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { user } from "@/store/slice/user.slice";
import {
  player_turn_id,
  last_flipped_card_id,
  memoryGameCardEvent,
  updateLastFlippedCardEvent,
} from "@/store/slice/memory-game.slice";
import {
  timer_start_count,
  updatePlayerTurnEvent,
} from "@/store/slice/game.slice";

type IBaseProps = {
  timer_count: number;
};
const withTimer = (BaseComponent: ComponentType<IBaseProps>) => {
  const EnhancedComponent = () => {
    const dispatch = useAppDispatch();
    const [timer_count, set_timer_count] = useState(0);
    const _user = useAppSelector(user);
    const _player_turn_id = useAppSelector(player_turn_id);
    const _timer_start_count = useAppSelector(timer_start_count);
    const _last_flipped_card_id = useAppSelector(last_flipped_card_id);

    useEffect(() => {
      const updateCountDown = () => {
        const target_time = (_timer_start_count as number) + 30000;
        const time_remaining = target_time - new Date().getTime();
        if (time_remaining <= 0) {
          if (_player_turn_id == _user.id) {
            dispatch(updatePlayerTurnEvent());
            /**
             * if user have flipped up only one card
             * in 30 sec then flip down that card
             * again
             */
            if (_last_flipped_card_id) {
              dispatch(
                memoryGameCardEvent({
                  card_id: _last_flipped_card_id,
                  flipped: false,
                })
              );
              dispatch(
                updateLastFlippedCardEvent({
                  card_id: null,
                })
              );
            }
          }
        } else {
          const seconds = Math.floor((time_remaining / 1000) % 60);
          set_timer_count(seconds);
        }
      };
      const timer = setInterval(updateCountDown, 1000);
      return () => {
        clearInterval(timer);
      };
    }, [_timer_start_count, _last_flipped_card_id]);
    return <BaseComponent timer_count={timer_count} />;
  };
  return EnhancedComponent;
};

export default withTimer;
