import { useState } from "react";
// types
import type { ComponentType, SetStateAction, Dispatch } from "react";
import type { ISeatType, IPokerPlayer } from "@/types/store/slice/poker/poker";
import type { IDeckType } from "@/types/store/slice/poker";
import type { IUser } from "@/types/store/slice/login";

// redux
import { User } from "@/store/slice/login.slice";
import { useAppSelector } from "@/hooks/redux.hook";
import {
  activePokerPlayers,
  communityCards,
  chipsInPot,
  bettorId,
  dealerId,
  showPokerSlider,
} from "@/store/slice/poker/poker.slice";

// helpers
import { rotateArray } from "@/helpers/common.helper";

type IProps = {
  poker_players: Array<IPokerPlayer | null>;
  community_cards: IDeckType | null;
  chips_in_pot: number;
  total_chips_betted: number;
  show_poker_slider: boolean;
  bettor_id: number | null;
  dealer_id: number | null;
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
    const { id: user_id } = useAppSelector(User) as IUser;
    /**
     * Sorting the active poker player with respect
     * to the their seat number
     */
    let active_poker_players = [...useAppSelector(activePokerPlayers)].sort(
      (a, b) => {
        return a.seat_number - b.seat_number;
      }
    );
    /**
     * As we have 9 seats availble for the player
     * so making the player list such that all the seats
     * which have not been taken by the player is set to null
     * this would be useful to center the position of the
     * auth player in the poker table in user interface
     */
    let poker_players = [
      ...active_poker_players,
      ...new Array(9 - active_poker_players.length).fill(null),
    ];
    const { seat_number: auth_player_seat_number } =
      active_poker_players.find(
        (poker_player) => poker_player.player_id == user_id
      ) ?? {};

    /**
     * Rotating the array in such a way so that
     * auth player stays in the middle of the table
     * in bottom
     */
    auth_player_seat_number !== undefined &&
      rotateArray(
        poker_players,
        Math.abs(4 - auth_player_seat_number),
        4 - auth_player_seat_number > 0 ? "right" : "left"
      );

    const community_cards = useAppSelector(communityCards);
    const no_of_community_cards = community_cards?.length ?? 0;
    const chips_in_pot = useAppSelector(chipsInPot);
    const total_chips_betted = active_poker_players.reduce(
      (accumulator, player) => {
        if (player.current_betted_amount) {
          return accumulator + player.current_betted_amount;
        }
        return accumulator;
      },
      0
    );
    const bettor_id = useAppSelector(bettorId);
    const dealer_id = useAppSelector(dealerId);
    const show_poker_slider = useAppSelector(showPokerSlider);
    const [show_action_cta, set_show_action_cta] = useState<boolean>(true);
    return (
      <BaseComponent
        poker_players={poker_players}
        community_cards={community_cards}
        chips_in_pot={chips_in_pot}
        total_chips_betted={total_chips_betted}
        show_poker_slider={show_poker_slider}
        bettor_id={bettor_id}
        dealer_id={dealer_id}
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
