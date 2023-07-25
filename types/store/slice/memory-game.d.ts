import type { GetRandomCard } from "@/types/helpers/memory-game/game";

type InitialState = {
  cardList: {
    [key: string]: boolean;
  };
  lastFlippedCard:
    | (GetRandomCard & {
        id: string;
      })
    | null;
};

export { InitialState };
