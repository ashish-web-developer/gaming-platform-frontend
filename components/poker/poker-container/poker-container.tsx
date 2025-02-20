import { useState } from "react";
import dynamic from "next/dynamic";
// types
import type { FC } from "react";
import type { IPokerPlayer, IPokerRoom } from "@/types/store/slice/poker/poker";
import type { IDeckType } from "@/types/store/slice/poker";

// local components
import PokerHeader from "@/components/poker/poker-header/poker-header";
import PokerTimer from "@/components/poker/poker-timer/poker-timer";
import PokerWaitingBanner from "@/components/poker/poker-waiting-banner/poker-waiting-banner";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import {
  pokerRoomId,
  roomCreatedAt,
  showBuyInModal,
} from "@/store/slice/poker/poker.slice";
import {
  updateActivePokerPlayer,
  updateRoomDetails,
  updatePlayerData,
  updateDeck,
} from "@/store/slice/poker/poker.slice";
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
  StyledPokerTimerContainer,
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
    channel_name: `poker.${poker_room_id}`,
    dependency: poker_room_id,
    memberHandler: (data, action_type) => {
      dispatch(
        updateActivePokerPlayer({
          type: action_type,
          poker_players: data.info.poker_player,
        })
      );
    },
    events: [
      {
        event: "update-poker-room-data-event",
        handler: (data: { poker_room: IPokerRoom }) => {
          dispatch(updateRoomDetails(data.poker_room));
        },
      },

      {
        event: "update-poker-player-data",
        handler: (data: { player: IPokerPlayer }) => {
          console.log("data", data);
          dispatch(updatePlayerData(data.player));
        },
      },
      {
        event: "deck-data-event",
        handler: (data: { deck: IDeckType }) => {
          dispatch(updateDeck(data.deck));
        },
      },
    ],
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
  const [show_waiting_banner, setShowWaitingBanner] = useState(false);
  const show_buy_in_modal = useAppSelector(showBuyInModal);
  const room_created_at = useAppSelector(roomCreatedAt);
  const seconds = Math.floor(
    new Date(room_created_at as string).getTime() / 1000 +
      60 -
      new Date().getTime() / 1000
  );
  return (
    <StyledPage>
      {!show_buy_in_modal && <JoinPokerChannel />}
      <StyledContainer $opacity={show_waiting_banner ? 0.2 : 1}>
        <PokerHeader />
        <PokerTable
          time_left={seconds}
          updateShowWaitingBanner={(val: boolean) => {
            setShowWaitingBanner(val);
          }}
        />
        {!show_buy_in_modal && !show_waiting_banner && (
          <StyledPokerTimerContainer>
            <PokerTimer initial_count={30} handleOnFinish={() => {}} />
          </StyledPokerTimerContainer>
        )}
      </StyledContainer>
      {show_waiting_banner && (
        <PokerWaitingBanner
          initial_count={seconds}
          updateShowWaitigBanner={(val: boolean) => {
            setShowWaitingBanner(val);
          }}
        />
      )}
      <div id="poker-buy-in-dialog-container"></div>
    </StyledPage>
  );
};

export default PokerContainer;
