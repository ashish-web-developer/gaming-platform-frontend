import { createContext } from "react";

// types
import type { MutableRefObject } from "react";

// helpers
import MutableSpeechUtterance from "@/helpers/mutable-speech-uttrance";
import { current } from "@reduxjs/toolkit";

// theme mode context

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

export { UttranceContext, PokerInviteDialogTimeOutContext };
