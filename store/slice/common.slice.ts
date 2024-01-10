// types
import type { InitialState } from "@/types/store/slice/common";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/rootReducer";
//redux
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialState = {
  showEmoji: false,
  mode: "light",
};
export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    updateShowEmoji: (state, action: PayloadAction<boolean>) => {
      state.showEmoji = action.payload;
    },
    updateMode: (state, action: PayloadAction<"dark" | "light">) => {
      state.mode = action.payload;
    },
  },
});

export default commonSlice.reducer;
export const showEmoji = (state: RootState) => state.common.showEmoji;
export const mode = (state: RootState) => state.common.mode;
export const { updateShowEmoji, updateMode } = commonSlice.actions;
