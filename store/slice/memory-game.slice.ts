import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  InitialState,
  MemoryGameCardEventArgs,
  MemoryGameCardEventRespose,
} from "@/types/store/slice/memory-game";
import type { GetRandomCard } from "@/types/helpers/memory-game/game";
import type { User } from "@/types/user";

// helpers
import { Axios } from "@/helpers/axios";

export const memoryGameCardEvent = createAsyncThunk<
  MemoryGameCardEventRespose,
  MemoryGameCardEventArgs
>("memory-game/event", async ({ card_id, player_id }, { rejectWithValue }) => {
  try {
    const res = await Axios.post("/memory-game-event", {
      card_id,
      player_id,
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

const initialState: InitialState = {
  cardList: {},
  lastFlippedCard: null,
  gaming_user: null,
  show_snackbar: false,
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
    updateGamingUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload) {
        state.show_snackbar = true;
      } else {
        state.show_snackbar = false;
      }
      state.gaming_user = action.payload;
    },
  },
});

export const {
  updateCard,
  removeCard,
  updateLastFlippedCard,
  updateGamingUser,
} = memoryGameSlice.actions;
export const cardList = (state: RootState) => state.memoryGame.cardList;
export const lastFlippedCard = (state: RootState) =>
  state.memoryGame.lastFlippedCard;
export const gaming_user = (state: RootState) => state.memoryGame.gaming_user;
export const show_snackbar = (state: RootState) =>
  state.memoryGame.show_snackbar;
export default memoryGameSlice.reducer;
