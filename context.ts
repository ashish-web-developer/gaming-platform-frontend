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

const HoleCardNodesMapContext = createContext<
  MutableRefObject<Map<string, HTMLDivElement> | null>
>({
  current: null,
});

export {
  UttranceContext,
  PokerInviteDialogTimeOutContext,
  HoleCardNodesMapContext,
};
