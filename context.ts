import { createContext } from "react";

// types
import type { MutableRefObject } from "react";
export type IDeckNodeType = Map<string, HTMLDivElement>;

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";
import { current } from "@reduxjs/toolkit";

// gsap
import Flip from "gsap/Flip";

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

const DeckNodeContext = createContext<MutableRefObject<IDeckNodeType | null>>({
  current: null,
});

const FlipBatchContext = createContext<
  MutableRefObject<ReturnType<typeof Flip.batch> | null | undefined>
>({ current: null });
export {
  UttranceContext,
  PokerInviteDialogTimeOutContext,
  DeckNodeContext,
  FlipBatchContext,
};
