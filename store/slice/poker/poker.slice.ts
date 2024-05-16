import { createSlice } from "@reduxjs/toolkit";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type IPokerInitialState from "@/types/store/slice/poker/poker";
import type { RootState } from "@/store/rootReducer";

const initialState: IPokerInitialState = {
  show_poker_slider: true,
  poker_chips: 1000,
};

const pokerSlice = createSlice({
  name: "poker",
  initialState,
  reducers: {
    updatePokerChips: (state, action: PayloadAction<number>) => {
      state.poker_chips = action.payload;
    },
  },
});

// reducer
export default pokerSlice.reducer;

// selector
export const show_poker_slider = (state: RootState) =>
  state.poker.show_poker_slider;
export const poker_chips = (state: RootState) => state.poker.poker_chips;
// action creaters
export const { updatePokerChips } = pokerSlice.actions;
