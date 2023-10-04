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
  help_tooltip_text: null,
  current_rule_index: 0,
  game_rules_list: [],
  show_audio_play_modal: true,
  show_info_snackbar: false,
  is_gaming_user_leaving: false,
  show_mobile_chat: false,
  show_help_tooltip: false,
  play_audio: true,
  mobile: {
    show_help_drawer: false,
  },
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
    updateGameRules: (state, action: PayloadAction<[string, string][]>) => {
      state.game_rules_list = action.payload;
      state.help_tooltip_text = action.payload[0];
    },
    updateShowAudioPlayModal: (state, action: PayloadAction<boolean>) => {
      state.show_audio_play_modal = action.payload;
    },
    updateCurrentRuleIndex: (state, action: PayloadAction<number>) => {
      state.current_rule_index = action.payload;
      state.help_tooltip_text = state.game_rules_list[action.payload];
    },
    updateShowInfoSnackbar: (state, action: PayloadAction<boolean>) => {
      state.show_info_snackbar = action.payload;
    },
    updateIsGamingUserLeaving: (state, action: PayloadAction<boolean>) => {
      state.is_gaming_user_leaving = action.payload;
      state.show_info_snackbar = action.payload;
    },
    updateShowMobileChat: (state, action: PayloadAction<boolean>) => {
      state.show_mobile_chat = action.payload;
    },
    updateShowHelpTooltip: (state, action: PayloadAction<boolean>) => {
      state.show_help_tooltip = action.payload;
    },
    updatePlayAudio: (state, action) => {
      state.play_audio = action.payload;
    },
    updateShowHelpDrawer: (state, action: PayloadAction<boolean>) => {
      state.mobile.show_help_drawer = action.payload;
    },
  },
});

export const {
  updateCard,
  removeCard,
  updateLastFlippedCard,
  updateIsGamingUserIn,
  updateGameRules,
  updateShowAudioPlayModal,
  updateCurrentRuleIndex,
  updateShowInfoSnackbar,
  updateIsGamingUserLeaving,
  updateShowMobileChat,
  updateShowHelpTooltip,
  updatePlayAudio,
  updateShowHelpDrawer,
} = memoryGameSlice.actions;
export const cardList = (state: RootState) => state.memoryGame.cardList;
export const lastFlippedCard = (state: RootState) =>
  state.memoryGame.lastFlippedCard;
export const is_gaming_user_in = (state: RootState) =>
  state.memoryGame.is_gaming_user_in;
export const game_rules_list = (state: RootState) =>
  state.memoryGame.game_rules_list;
export const help_tooltip_text = (state: RootState) =>
  state.memoryGame.help_tooltip_text;
export const show_audio_play_modal = (state: RootState) =>
  state.memoryGame.show_audio_play_modal;
export const current_rule_index = (state: RootState) =>
  state.memoryGame.current_rule_index;
export const show_info_snackbar = (state: RootState) =>
  state.memoryGame.show_info_snackbar;

export const is_gaming_user_leaving = (state: RootState) =>
  state.memoryGame.is_gaming_user_leaving;
export const show_mobile_chat = (state: RootState) =>
  state.memoryGame.show_mobile_chat;
export const show_help_tooltip = (state: RootState) =>
  state.memoryGame.show_help_tooltip;
export const play_audio = (state: RootState) => state.memoryGame.play_audio;
export const show_help_drawer = (state: RootState) =>
  state.memoryGame.mobile.show_help_drawer;

export default memoryGameSlice.reducer;
