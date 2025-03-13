import { useContext, useState } from "react";
import dynamic from "next/dynamic";
// types
import type { FC } from "react";
import type { IPokerPlayer, IPokerRoom } from "@/types/store/slice/poker/poker";
import type { IDeckType } from "@/types/store/slice/poker";

// local components
import PokerHeader from "@/components/poker/poker-header/poker-header";
const PokerWaitingBanner = dynamic(
  () => import("@/components/poker/poker-waiting-banner/poker-waiting-banner"),
  {
    ssr: false,
  }
);
const PokerTimer = dynamic(
  () => import("@/components/poker/poker-timer/poker-timer"),
  {
    ssr: false,
  }
);

const PokerTable = dynamic(
  () => import("@/components/poker/poker-table/poker-table"),
  {
    ssr: false,
  }
);

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
import { useIsMounted } from "@/hooks/common.hook";
import { useLoadMedia } from "@/hooks/poker/poker.hook";

// styled components
import {
  StyledPage,
  StyledContainer,
  StyledPokerTimerContainer,
} from "@/styles/components/poker/poker-container/poker-container.style";

// context
import { MediaContext } from "context";

// packages

// gsap
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

const JoinPokerChannel: FC<{
  updateShowHoleCards: (val: boolean) => void;
}> = ({ updateShowHoleCards }) => {
  const dispatch = useAppDispatch();
  const poker_room_id = useAppSelector(pokerRoomId);
  const media_ref = useContext(MediaContext);

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
          dispatch(updatePlayerData(data.player));
        },
      },
      {
        event: "deck-data-event",
        handler: (data: { deck: IDeckType }) => {
          updateShowHoleCards(false);
          dispatch(updateDeck(data.deck));
        },
      },
      {
        event: "winner-data-event",
        handler: (data: { players_id: Array<number> }) => {
          const batch = Flip.batch(`chips-winning-animation`);
          function handleChipsWinningAnimation(player_id: number) {
            return new Promise(function (resolve, reject) {
              let target = document.getElementById(`player-chips-${player_id}`);
              batch.add({
                getState() {
                  const element = document.getElementById("chips-in-pot");
                  return Flip.getState(element);
                },
                setState() {
                  target?.setAttribute(
                    "data-flip-id",
                    "chips-winning-flip-animation"
                  );
                },
                animate(self) {
                  Flip.from(self.state, {
                    targets: target,
                    ease: "expo.inOut",
                    repeat: 10,
                    duration: 0.2,
                  });
                },
                onStart() {
                  media_ref.current.chips_winning_sound?.play();
                },
                onComplete() {
                  target?.removeAttribute("data-flip-id");
                  resolve("animation got resolved");
                },
              });
              batch.run();
            });
          }

          (async function () {
            try {
              for (let player_id of data.players_id) {
                await handleChipsWinningAnimation(player_id);
              }
            } finally {
              batch.kill();
            }
          })();
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
  const [show_hole_cards, setShowHoleCards] = useState(false);
  const show_buy_in_modal = useAppSelector(showBuyInModal);
  const room_created_at = useAppSelector(roomCreatedAt);
  const seconds = Math.floor(
    new Date(room_created_at as string).getTime() / 1000 +
      60 -
      Date.now() / 1000
  );
  const is_mounted = useIsMounted();
  const media_ref = useLoadMedia();

  return (
    <MediaContext.Provider value={media_ref}>
      <StyledPage>
        {!show_buy_in_modal && (
          <JoinPokerChannel
            updateShowHoleCards={(val) => {
              setShowHoleCards(val);
            }}
          />
        )}
        <StyledContainer $opacity={show_waiting_banner ? 0.2 : 1}>
          <PokerHeader />
          {is_mounted && (
            <PokerTable
              show_hole_cards={show_hole_cards}
              updateShowHoleCards={(val) => {
                setShowHoleCards(val);
              }}
              time_left={seconds}
              updateShowWaitingBanner={(val: boolean) => {
                setShowWaitingBanner(val);
              }}
            />
          )}
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
    </MediaContext.Provider>
  );
};

export default PokerContainer;
