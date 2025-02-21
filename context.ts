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

const CardDealingAnimationContext = createContext<{
  is_card_dealing_animation_completed: boolean;
  updateCardDealingAnimation?: (val: boolean) => void;
}>({
  is_card_dealing_animation_completed: false,
});

export {
  UttranceContext,
  PokerInviteDialogTimeOutContext,
  CardDealingAnimationContext,
};
