import dynamic from "next/dynamic";
// types
import type { FC } from "react";
import type { IPokerPlayer } from "@/types/store/slice/poker/poker";

// local components
import PokerHeader from "@/components/poker/poker-header/poker-header";
import PokerTimer from "@/components/poker/poker-timer/poker-timer";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { pokerRoomId, showBuyInModal } from "@/store/slice/poker/poker.slice";
import { updateActivePokerPlayer } from "@/store/slice/poker/poker.slice";
// hooks
import { usePresenceChannel } from "@/hooks/pusher.hook";

const PokerTable = dynamic(
  () => import("@/components/poker/poker-table/poker-table"),
  {
    ssr: false,
  }
);

// styled components
import {
  StyledPage,
  StyledContainer,
} from "@/styles/components/poker/poker-container/poker-container.style";

const JoinPokerChannel = () => {
  const dispatch = useAppDispatch();
  const poker_room_id = useAppSelector(pokerRoomId);
  usePresenceChannel<
    string | null,
    {
      id: string;
      info: {
        poker_player: IPokerPlayer;
      };
    }
  >({
    channel_name: `poker-${poker_room_id}`,
    dependency: poker_room_id,
    memberHandler: (data, action_type) => {
      dispatch(
        updateActivePokerPlayer({
          type: action_type,
          poker_players: data.info.poker_player,
        })
      );
    },
    events: [],
    handleSubscription: (data) => {
      dispatch(
        updateActivePokerPlayer({
          type: "here",
          poker_players: data.info.poker_player,
        })
      );
    },
  });
  return null;
};

const PokerContainer: FC = () => {
  const show_buy_in_modal = useAppSelector(showBuyInModal);
  return (
    <StyledPage>
      {!show_buy_in_modal && <JoinPokerChannel />}
      <StyledContainer>
        <PokerHeader />
        <PokerTable />
        <PokerTimer />
      </StyledContainer>
      <div id="poker-buy-in-dialog-container"></div>
    </StyledPage>
  );
};

export default PokerContainer;
