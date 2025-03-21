import { createContext } from "react";

// types
import type { MutableRefObject } from "react";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";

// speech uttrance
const UttranceContext = createContext<
  MutableRefObject<MutableSpeechUtterance | null>
>({
  current: null,
});

// poker
const PokerInviteDialogTimeOutContext = createContext<
  MutableRefObject<ReturnType<typeof setTimeout> | undefined>
>({ current: undefined });

const MediaContext = createContext<
  MutableRefObject<{
    player_turn_sound?: HTMLAudioElement;
    card_dealing_sound?: HTMLAudioElement;
    button_click_sound?: HTMLAudioElement;
    chips_winning_sound?: HTMLAudioElement;
    clock_ticking_sound?: HTMLAudioElement;
  }>
>({
  current: {},
});

export { UttranceContext, PokerInviteDialogTimeOutContext, MediaContext };
