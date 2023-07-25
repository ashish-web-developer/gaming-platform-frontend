import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type { InitialState } from "@/types/store/slice/memory-game";

const initialState: InitialState = {
  cardList: {},
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
  },
});

export const { updateCard, removeCard } = memoryGameSlice.actions;
export const cardList = (state: RootState) => state.memoryGame.cardList;
export default memoryGameSlice.reducer;
