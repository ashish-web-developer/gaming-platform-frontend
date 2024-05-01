import { createSlice } from "@reduxjs/toolkit";
// types
import type IPokerInitialState from "@/types/store/slice/poker/poker";
import type { RootState } from "@/store/rootReducer";

const initialState: IPokerInitialState = {
  show_poker_slider: true,
};

const pokerSlice = createSlice({
  name: "poker",
  initialState,
  reducers: {},
});

// reducer
export default pokerSlice.reducer;

// selector
export const show_poker_slider = (state: RootState) =>
  state.poker.show_poker_slider;
