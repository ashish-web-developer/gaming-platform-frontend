import { useContext, useEffect } from "react";
// types
import type { ComponentType } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";
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
  Deck,
  showBuyInModal,
} from "@/store/slice/poker/poker.slice";

// helpers
import { rotateArray } from "@/helpers/common.helper";

// context
import { MediaContext } from "context";

type IProps = {
  poker_players: Array<IPokerPlayer | null>;
  community_cards: IDeckType | null;
  deck: IDeckType;
  show_buy_in_modal: boolean;
  chips_in_pot: number;
  bettor_id: number | null;
  auth_player?: IPokerPlayer;
  dealer_id: number | null;
  no_of_community_cards: number;
  user_id: number | null;
};
const withPokerTableFunctionality = <ExtraProps extends { [key: string]: any }>(
  BaseComponent: ComponentType<IProps & ExtraProps>,
  is_mobile: boolean = false
) => {
  const EnhancedComponent = (props: ExtraProps) => {
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

    const auth_player_seat_number = active_poker_players.findIndex(
      (player) => player.player_id == user_id
    );

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
    const deck = useAppSelector(Deck);
    const show_buy_in_modal = useAppSelector(showBuyInModal);
    const no_of_community_cards = community_cards?.length ?? 0;
    const chips_in_pot = useAppSelector(chipsInPot);
    const bettor_id = useAppSelector(bettorId);
    const dealer_id = useAppSelector(dealerId);
    const auth_player = poker_players.find(
      (player) => player?.player_id == user_id
    );
    const media_ref = useContext(MediaContext);

    useEffect(() => {
      if (bettor_id == user_id && media_ref.current.player_turn_sound) {
        media_ref.current.player_turn_sound.play();
      }
    }, [bettor_id, user_id]);

    return (
      <BaseComponent
        poker_players={poker_players}
        community_cards={community_cards}
        deck={deck}
        show_buy_in_modal={show_buy_in_modal}
        chips_in_pot={chips_in_pot}
        bettor_id={bettor_id}
        auth_player={auth_player}
        dealer_id={dealer_id}
        no_of_community_cards={no_of_community_cards}
        user_id={user_id}
        {...props}
      />
    );
  };
  return EnhancedComponent;
};

export default withPokerTableFunctionality;
