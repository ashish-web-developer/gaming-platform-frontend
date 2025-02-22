import { useContext, useEffect, useRef } from "react";
// types
import type { MutableRefObject, RefObject } from "react";
import type { ContextSafeFunc } from "@gsap/react";
import type { IDeckType } from "@/types/store/slice/poker";

// redux
import { useAppSelector } from "../redux.hook";
import { activePokerPlayers } from "@/store/slice/poker/poker.slice";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip, MotionPathPlugin);

// context
import { HoleCardNodesMapContext } from "context";

/**
 * Rotating the player seat in random direction
 * for the first time, when user joins the room
 */

function useSeatRotatingAnimation({
  scope,
}: {
  scope: RefObject<HTMLDivElement>;
}): ContextSafeFunc {
  const { contextSafe } = useGSAP(
    () => {
      const players_position = [
        0.897, 0.797, 0.693, 0.591, 0.495, 0.396, 0.29, 0.19, 0.09,
      ];
      const player_containers = Array.from(
        document.getElementsByClassName("poker-player-container")
      );
      gsap.set(player_containers, {
        scale: 1.5,
        borderWidth: 10,
      });
      /**
       * Animation will rotate the seat around the table in
       * random direction according the svg path
       */
      player_containers.forEach((container, index) => {
        gsap.fromTo(
          container,
          {
            opacity: 0,
          },
          {
            motionPath: {
              path: "#path",
              align: "#path",
              alignOrigin: [0.5, 0.5],
              start: gsap.utils.random(0, 1),
              end: players_position[index],
            },
            opacity: 1,
            duration: 3,
            delay: 0.1,
          }
        );
      });
    },
    { scope }
  );
  return contextSafe;
}

function useCardDealingAnimation({
  deck_node_ref,
  updateShowHoleCards,
}: {
  deck_node_ref: MutableRefObject<Map<string, HTMLDivElement> | undefined>;
  updateShowHoleCards: (val: boolean) => void;
}) {
  const active_poker_players = useAppSelector(activePokerPlayers);
  const hole_card_nodes_ref = useContext(HoleCardNodesMapContext);
  const card_dealing_audio = useRef<HTMLAudioElement>();
  useEffect(() => {
    const batch = Flip.batch("card-dealing-animation");
    batch.add({
      getState() {
        /**
         * reducing hole cards of all the player to an array
         * then getting the node of those hole cards inside the
         * deck container,then based on those cards_node we are
         * getting the flip state
         */
        const hole_cards_of_all_player = active_poker_players.reduce<IDeckType>(
          (hole_cards, player) => {
            if (player.hole_cards) {
              return [...hole_cards, ...player.hole_cards];
            }
            return hole_cards;
          },
          []
        );

        // converting hole_cards to card node
        const card_node = hole_cards_of_all_player.map((card) => {
          return deck_node_ref.current?.get(card.card_id) as HTMLDivElement;
        });
        return Flip.getState(card_node);
      },
      setState() {
        updateShowHoleCards(true);
      },
      animate(self) {
        // we are reducing array to the node of hole cards of each player
        const target_element = active_poker_players.reduce<HTMLDivElement[]>(
          (prev, player) => {
            if (player.hole_cards) {
              const hole_card_node = player.hole_cards?.map(
                (card) =>
                  hole_card_nodes_ref.current?.get(
                    card.card_id
                  ) as HTMLDivElement
              );

              return [...prev, ...hole_card_node];
            }
            return prev;
          },
          []
        );
        Flip.from(self.state, {
          targets: target_element,
          ease: "expo.inOut",
          spin: true,
          /**
           * Here we are handling card dealing
           * sound effect
           */
          onStart() {
            if (!card_dealing_audio.current) {
              card_dealing_audio.current = new Audio(
                "/poker/media/card-dealing-sound.mp3"
              );
            }
            card_dealing_audio.current.playbackRate = 1.5; 
            function handleCardDealingEffect() {
              const card_dealing_audio_promise = new Promise(function (
                resolve,
                reject
              ) {
                if (!card_dealing_audio.current) {
                  reject(new Error("audio file is not set"));
                } else {
                  card_dealing_audio.current.onended = resolve;
                }
              });
              card_dealing_audio.current?.play();
              return card_dealing_audio_promise;
            }
            (async function () {
              for (let i = 0; i <= active_poker_players.length - 1; i++) {
                await handleCardDealingEffect();
              }
            })();
          },
          stagger: {
            each: 0.2,
          },
        });
      },
    });
    batch.run();
    return () => {
      batch.clear();
    };
  }, [active_poker_players.length]);
}

export { useSeatRotatingAnimation, useCardDealingAnimation };
