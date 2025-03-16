import { useEffect, useRef } from "react";

// types
import type { RefObject } from "react";
import type { ContextSafeFunc } from "@gsap/react";
import type { IDeckType } from "@/types/store/slice/poker";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip, MotionPathPlugin);

function useLoadMedia() {
  const media_ref = useRef<{
    player_turn_sound?: HTMLAudioElement;
    card_dealing_sound?: HTMLAudioElement;
    button_click_sound?: HTMLAudioElement;
    chips_winning_sound?: HTMLAudioElement;
  }>({});
  useEffect(() => {
    media_ref.current.player_turn_sound = new Audio(
      "/poker/media/player-turn-sound.mp3"
    );
    media_ref.current.card_dealing_sound = new Audio(
      "/poker/media/card-dealing-sound.mp3"
    );
    media_ref.current.button_click_sound = new Audio(
      "/poker/media/button-click-sound.mp3"
    );
    media_ref.current.chips_winning_sound = new Audio(
      "/poker/media/chips-winning-sound.mp3"
    );
  }, []);
  return media_ref;
}

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

export { useLoadMedia, useSeatRotatingAnimation };
