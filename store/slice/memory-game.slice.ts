import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type { InitialState } from "@/types/store/slice/memory-game";
import type { GetRandomCard } from "@/types/helpers/memory-game/game";

const initialState: InitialState = {
  cardList: {},
  lastFlippedCard: null,
};
export const memoryGameSlice = createSlice({
  name: "memory-game-slice",
  initialState,
  reducers: {
    updateCard: (
      state,
      action: PayloadAction<{ key: string; value: boolean }>
    ) => {
      state.cardList[action.payload.key] = action.payload.value;
    },
    removeCard: (state, action: PayloadAction<string>) => {
      delete state.cardList[action.payload];
    },
    updateLastFlippedCard: (
      state,
      action: PayloadAction<(GetRandomCard & { id: string }) | null>
    ) => {
      state.lastFlippedCard = action.payload;
    },
  },
});

export const { updateCard, removeCard, updateLastFlippedCard } =
  memoryGameSlice.actions;
export const cardList = (state: RootState) => state.memoryGame.cardList;
export const lastFlippedCard = (state: RootState) =>
  state.memoryGame.lastFlippedCard;
export default memoryGameSlice.reducer;
