import type { NextPage } from "next";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// local components
import PokerContainer from "@/components/poker/poker-container/poker-container";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { Theme } from "@/theme/poker.theme";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { room_id } from "@/store/slice/game.slice";
import {
  show_buy_in_modal,
  updateActivePokerPlayer,
} from "@/store/slice/poker/poker.slice";

// hooks
import { usePresenceChannel } from "@/hooks/pusher.hook";

const JoinPokerChannel = () => {
  const dispatch = useAppDispatch();
  const _room_id = useAppSelector(room_id);
  usePresenceChannel<
    undefined,
    { poker_player: IPokerPlayer }[] | { poker_player: IPokerPlayer }
  >({
    channel: `poker.${_room_id}`,
    events: [
      {
        event: "Game.Poker.PokerBuyInAmountEvent",
        callback: (data: { user_id: number; buy_in_amount: number }) => {
          // dispatch(updateBuyInAmount(data));
        },
      },
    ],
    handler: (players, type) => {
      if (Array.isArray(players)) {
        const _poker_players = players.map((_player) => _player.poker_player);
        dispatch(
          updateActivePokerPlayer({ poker_players: _poker_players, type })
        );
      } else {
        const _poker_player = players.poker_player;
        dispatch(
          updateActivePokerPlayer({
            poker_players: { ..._poker_player },
            type,
          })
        );
      }
    },
  });
  return null;
};

const PokerPage: NextPage = () => {
  const _show_buy_in_modal = useAppSelector(show_buy_in_modal);
  return (
    <ThemeProvider theme={Theme}>
      {!_show_buy_in_modal && <JoinPokerChannel />}
      <PokerContainer />
    </ThemeProvider>
  );
};
export default PokerPage;
