import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  InitialState,
  MemoryGameCardEventArgs,
  MemoryGameCardEventRespose,
  IGetCardRequest,
  IGetCardsResponse,
} from "@/types/store/slice/memory-game";
import type { GetRandomCard } from "@/types/helpers/memory-game/game";

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

export const getCards = createAsyncThunk<
  IGetCardsResponse,
  IGetCardRequest,
  { state: RootState }
>("api/memory-game", async ({ game_complexity }, { getState }) => {
  const res = await Axios.post("/memory-game/get-card", {
    game_complexity,
  });
  console.log(res);
  return res.data;
});

const initialState: InitialState = {
  cardList: {},
  lastFlippedCard: null,
  is_gaming_user_in: false,
  show_rules_tooltip: true,
  rules_tooltip_text: null,
  current_rule_index:-1,
  game_rules_list: [],
  show_audio_play_modal:true,
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
    updateIsGamingUserIn: (state, action: PayloadAction<boolean>) => {
      state.is_gaming_user_in = action.payload;
    },
    updateShowRulesTip: (state, action: PayloadAction<boolean>) => {
      state.show_rules_tooltip = action.payload;
    },
    updateGameRules: (state, action: PayloadAction<[string, string][]>) => {
      state.game_rules_list = action.payload;
      state.rules_tooltip_text = action.payload[0]
    },
    updateShowAudioPlayModal:(state,action:PayloadAction<boolean>)=>{
      state.show_audio_play_modal = action.payload;
    },
    updateCurrentRuleIndex:(state,action:PayloadAction<number>)=>{
      state.current_rule_index = action.payload;
      state.rules_tooltip_text = state.game_rules_list[action.payload];
    }
  },
});

export const {
  updateCard,
  removeCard,
  updateLastFlippedCard,
  updateIsGamingUserIn,
  updateShowRulesTip,
  updateGameRules,
  updateShowAudioPlayModal,
  updateCurrentRuleIndex
} = memoryGameSlice.actions;
export const cardList = (state: RootState) => state.memoryGame.cardList;
export const lastFlippedCard = (state: RootState) =>
  state.memoryGame.lastFlippedCard;
export const is_gaming_user_in = (state: RootState) =>
  state.memoryGame.is_gaming_user_in;
export const show_rules_tooltip = (state: RootState) =>
  state.memoryGame.show_rules_tooltip;
export const game_rules_list = (state: RootState) =>
  state.memoryGame.game_rules_list;
export const rules_tooltip_text = (state: RootState) =>
  state.memoryGame.rules_tooltip_text;
export const show_audio_play_modal = (state:RootState) => state.memoryGame.show_audio_play_modal;
export const current_rule_index = (state:RootState) => state.memoryGame.current_rule_index;
export default memoryGameSlice.reducer;
