import { useState } from "react";
// types
import type { ComponentType, SetStateAction, Dispatch } from "react";
import type { ISeatType, IPokerPlayer } from "@/types/store/slice/poker/poker";
import type { IDeckType } from "@/types/store/slice/poker";

// redux
import { user } from "@/store/slice/user.slice";
import { useAppSelector } from "@/hooks/redux.hook";
import {
  active_poker_players,
  community_cards,
  chips_in_pot,
  bettor_id,
  show_poker_slider,
} from "@/store/slice/poker/poker.slice";

type IProps = {
  left_poker_players: IPokerPlayer[];
  right_poker_players: IPokerPlayer[];
  bottom_poker_players: IPokerPlayer[];
  community_cards: IDeckType | null;
  chips_in_pot: number;
  total_chips_betted: number;
  show_poker_slider: boolean;
  bettor_id: number | null;
  show_action_cta: boolean;
  set_show_action_cta: Dispatch<SetStateAction<boolean>>;
  no_of_community_cards: number;
  user_id: number | null;
};
const withPokerTableFunctionality = (
  BaseComponent: ComponentType<IProps>,
  is_mobile: boolean = false
) => {
  const EnhancedComponent = () => {
    let _active_poker_players = useAppSelector(active_poker_players);

    /**
     * Sorting array in descending order on the
     * on the basis of seat number
     */
    _active_poker_players = [..._active_poker_players].sort(
      (a, b) => b.seat_number - a.seat_number
    );

    _active_poker_players = [
      ..._active_poker_players,
      ...new Array(7 - _active_poker_players.length).fill(null),
    ].map((player, index) => {
      if (player) {
        return player;
      }
      return {
        seat_number: index,
      };
    });
    const { id: user_id } = useAppSelector(user);

    const auth_player_index = _active_poker_players.findIndex(
      (player) => player.player_id == user_id
    );

    /**
     * rotating array such that
     * seat index of auth player
     * be at 3 index
     */
    _active_poker_players = _active_poker_players
      .slice(-(3 - auth_player_index))
      .concat(_active_poker_players.slice(0, -(3 - auth_player_index)))
      .map((player, index) => {
        return {
          ...player,
          seat_index: index as ISeatType,
        };
      });

    /**
     * Deciding what to be kept on left, right and bottom
     * of the table on the basis of seat_index
     */
    const left_poker_players = _active_poker_players.filter((player) =>
      [...(is_mobile ? [0, 1, 2] : [0, 1])].includes(
        player.seat_index as number
      )
    );
    const bottom_poker_players = _active_poker_players.filter((player) =>
      [...(is_mobile ? [3] : [2, 3, 4])].includes(player.seat_index as number)
    );
    const right_poker_players = _active_poker_players.filter((player) =>
      [...(is_mobile ? [4, 5, 6] : [5, 6])].includes(
        player.seat_index as number
      )
    );
    const _community_cards = useAppSelector(community_cards);
    const no_of_community_cards = _community_cards?.length ?? 0;
    const _chips_in_pot = useAppSelector(chips_in_pot);
    const total_chips_betted = _active_poker_players.reduce(
      (accumulator, player) => {
        if (player.current_betted_amount) {
          return accumulator + player.current_betted_amount;
        }
        return accumulator;
      },
      0
    );
    const _bettor_id = useAppSelector(bettor_id);
    const _show_poker_slider = useAppSelector(show_poker_slider);
    const [show_action_cta, set_show_action_cta] = useState<boolean>(true);
    return (
      <BaseComponent
        left_poker_players={left_poker_players}
        right_poker_players={right_poker_players}
        bottom_poker_players={bottom_poker_players}
        community_cards={_community_cards}
        chips_in_pot={_chips_in_pot}
        total_chips_betted={total_chips_betted}
        show_poker_slider={_show_poker_slider}
        bettor_id={_bettor_id}
        show_action_cta={show_action_cta}
        set_show_action_cta={set_show_action_cta}
        no_of_community_cards={no_of_community_cards}
        user_id={user_id}
      />
    );
  };
  return EnhancedComponent;
};

export default withPokerTableFunctionality;
