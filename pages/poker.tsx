// types
import type { NextPage } from "next";
import type { IPokerPlayer, IPokerRoom } from "@/types/store/slice/poker/poker";
import type { GetServerSideProps } from "next";
import type { IUser } from "@/types/store/slice/login";

// local components
import PokerContainer from "@/components/poker/poker-container/poker-container";

// theme provider
import { ThemeProvider } from "styled-components";

// theme
import { Theme } from "@/theme/poker.theme";

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { poker_room_id } from "@/store/slice/poker/poker.slice";
import {
  showBuyInModal,
  updateActivePokerPlayer,
  updateDealerId,
  updatePlayerData,
  updateRoomDetails,
} from "@/store/slice/poker/poker.slice";
import { User } from "@/store/slice/login.slice";

// hooks
import { usePresenceChannel } from "@/hooks/pusher.hook";

const JoinPokerChannel = () => {
  const dispatch = useAppDispatch();
  const room_id = useAppSelector(poker_room_id);
  const user = useAppSelector(User) as IUser;

  usePresenceChannel<
    string | null,
    {
      id: number;
      info: {
        poker_player: IPokerPlayer;
      };
    }
  >({
    channel_name: `poker.${room_id}`,
    events: [
      {
        event: "Game.Poker.UpdateDealerEvent",
        handler: (data: { poker_room: IPokerRoom }) => {
          if (user.id) {
            dispatch(updateDealerId(data.poker_room.dealer_id));
          }
        },
      },
      {
        event: "update-poker-room-data-event",
        handler: (data: { poker_room: IPokerRoom }) => {
          dispatch(updateRoomDetails(data.poker_room));
        },
      },
      {
        event: "update-poker-player-data",
        handler: (data: { player: IPokerPlayer }) => {
          dispatch(updatePlayerData(data.player));
        },
      },
    ],
    handleSubscription: (member) => {
      dispatch(
        updateActivePokerPlayer({
          type: "added",
          poker_players: member.info.poker_player,
        })
      );
    },
    memberHandler: (member, action_type) => {
      dispatch(
        updateActivePokerPlayer({
          poker_players: member.info.poker_player,
          type: action_type,
        })
      );
    },
    dependency: room_id,
  });
  return null;
};

const PokerPage: NextPage = () => {
  const show_buy_in_modal = useAppSelector(showBuyInModal);

  return (
    <ThemeProvider theme={Theme}>
      {!show_buy_in_modal && <JoinPokerChannel />}
      <PokerContainer />
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const referer = req.headers.referer;
  if (referer) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/chat",
        permanent: false,
      },
    };
  }
};

export default PokerPage;
