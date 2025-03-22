import { useContext, useEffect, useState, useRef } from "react";
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

const PokerTable = dynamic(
  () => import("@/components/poker/poker-table/poker-table"),
  {
    ssr: false,
  }
);

// redux
import { useAppSelector, useAppDispatch } from "@/hooks/redux.hook";
import { User } from "@/store/slice/login.slice";
import {
  dealerId,
  pokerRoomId,
  roomCreatedAt,
  showBuyInModal,
  resetHoleCards,
} from "@/store/slice/poker/poker.slice";
import {
  updateActivePokerPlayer,
  updateRoomDetails,
  updatePlayerData,
  updateDeck,
  dealHandApi,
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
  const animation_promise_ref = useRef<Promise<void>>();
  const [start_next_round, setStartNextRound] = useState(false);
  const { id: user_id } = useAppSelector(User) ?? {};
  const dealer_id = useAppSelector(dealerId);
  const is_dealer = dealer_id == user_id;

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
          if (animation_promise_ref.current) {
            animation_promise_ref.current.then(() => {
              dispatch(updateRoomDetails(data.poker_room));
            });
          } else {
            dispatch(updateRoomDetails(data.poker_room));
          }
        },
      },

      {
        event: "update-poker-player-data",
        handler: (data: { player: IPokerPlayer }) => {
          if (animation_promise_ref.current) {
            animation_promise_ref.current.then(() => {
              dispatch(updatePlayerData(data.player));
            });
          } else {
            dispatch(updatePlayerData(data.player));
          }
        },
      },
      {
        event: "deck-data-event",
        handler: (data: { deck: IDeckType }) => {
          if (animation_promise_ref.current) {
            animation_promise_ref.current?.then(() => {
              dispatch(updateDeck(data.deck));
            });
          } else {
            dispatch(updateDeck(data.deck));
          }
        },
      },
      {
        event: "winner-data-event",
        handler: (data: { players_id: Array<number> }) => {
          dispatch(updateDeck([]));
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

          async function executeAnimation() {
            for (let player_id of data.players_id) {
              await handleChipsWinningAnimation(player_id);
            }
          }
          animation_promise_ref.current = executeAnimation();
          animation_promise_ref.current.then(() => {
            batch.kill();
            dispatch(resetHoleCards());
            updateShowHoleCards(false);
            setStartNextRound(true);
          });
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

  useEffect(() => {
    if (start_next_round) {
      is_dealer && dispatch(dealHandApi());
      setStartNextRound(false);
    }
  }, [is_dealer, start_next_round]);

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
            <StyledPokerTimerContainer id = "poker-timer-container">
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
