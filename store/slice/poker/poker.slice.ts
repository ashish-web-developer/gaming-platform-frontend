import { createSlice } from "@reduxjs/toolkit";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type IPokerInitialState from "@/types/store/slice/poker/poker";
import type { RootState } from "@/store/rootReducer";

const initialState: IPokerInitialState = {
  show_poker_slider: false,
  poker_chips: 2000,
  slider_val: 0,
};

const pokerSlice = createSlice({
  name: "poker",
  initialState,
  reducers: {
    updateShowPokerSlider: (state, action: PayloadAction<boolean>) => {
      state.show_poker_slider = action.payload;
    },
    updatePokerChips: (state, action: PayloadAction<number>) => {
      state.poker_chips = action.payload;
    },
    updateSliderVal: (state, action: PayloadAction<number>) => {
      state.slider_val = action.payload;
    },
  },
});

// reducer
export default pokerSlice.reducer;

// selector
export const show_poker_slider = (state: RootState) =>
  state.poker.show_poker_slider;
export const poker_chips = (state: RootState) => state.poker.poker_chips;
export const slider_val = (state: RootState) => state.poker.slider_val;
// action creaters
export const { updatePokerChips, updateSliderVal, updateShowPokerSlider } =
  pokerSlice.actions;
