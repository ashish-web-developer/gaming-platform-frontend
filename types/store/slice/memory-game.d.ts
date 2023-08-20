import type { GetRandomCard } from "@/types/helpers/memory-game/game";

type MemoryGameCardEventArgs = {
  card_id: string;
  player_id: number;
};

type MemoryGameCardEventRespose = {
  success: boolean;
  message: string;
};

type InitialState = {
  cardList: {
    [key: string]: boolean;
  };
  lastFlippedCard:
    | (GetRandomCard & {
        id: string;
      })
    | null;
  gaming_user: User;
  show_snackbar:boolean;
};

export { InitialState, MemoryGameCardEventArgs, MemoryGameCardEventRespose };
