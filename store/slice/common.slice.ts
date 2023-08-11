// types
import type { InitialState } from "@/types/store/slice/common";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/rootReducer";
//redux
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialState = {
  showEmoji: false,
};
export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateShowEmoji: (state, action: PayloadAction<boolean>) => {
      state.showEmoji = action.payload;
    },
  },
});

export default commonSlice.reducer;
export const showEmoji = (state: RootState) => state.common.showEmoji;
export const { updateShowEmoji } = commonSlice.actions;
