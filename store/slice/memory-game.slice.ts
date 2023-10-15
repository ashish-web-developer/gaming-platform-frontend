import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  InitialState,
  MemoryGameCardEventArgs,
  MemoryGameCardEventRespose,
  IGetCardsResponse,
  ICard,
  IUpdateLastFlippedCardArgs,
  IUpdateLastFlippedCardResponse,
} from "@/types/store/slice/memory-game";
import type { GetRandomCard } from "@/types/helpers/memory-game/game";

// helpers
import { Axios } from "@/helpers/axios";

export const memoryGameCardEvent = createAsyncThunk<
  MemoryGameCardEventRespose,
  MemoryGameCardEventArgs,
  { state: RootState }
>(
  "memory-game/event",
  async ({ card_id, flipped }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const res = await Axios.post("/memory-game/event", {
        room_id: state.game.room_id,
        card_id,
        flipped,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateLastFlippedCardEvent = createAsyncThunk<
  IUpdateLastFlippedCardResponse,
  IUpdateLastFlippedCardArgs,
  { state: RootState }
>(
  "memory-game/update-last-flipped-card",
  async ({ card_id }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const res = await Axios.post("/memory-game/update-last-flipped-card", {
        room_id: state.game.room_id,
        card_id,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getCards = createAsyncThunk<
  IGetCardsResponse,
  undefined,
  { state: RootState }
>("api/memory-game", async (_, { getState, dispatch }) => {
  const state = getState();
  const res = await Axios.post("/memory-game/get-card", {
    game_complexity: state.memoryGame.game_complexity,
    room_id: state.game.room_id,
  });
  return res.data;
});

const initialState: InitialState = {
  game_complexity: 18,
  player_turn_id: null,
  card_list: [],
  last_flipped_card_id: null,
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
  show_game_board: false,
  card_turn_count: 0,
  mobile: {
    show_help_drawer: false,
  },
};
export const memoryGameSlice = createSlice({
  name: "memory-game-slice",
  initialState,
  reducers: {
    updateCardList: (state, action: PayloadAction<ICard[]>) => {
      state.card_list = action.payload;
    },
    updateCardState: (
      state,
      action: PayloadAction<{ id: string; flipped: boolean }>
    ) => {
      const id = state.card_list.findIndex(
        (card) => card.id == action.payload.id
      );
      state.card_list[id] = {
        ...state.card_list[id],
        flipped: action.payload.flipped,
      };
    },
    removeCard: (state, action: PayloadAction<string>) => {
      delete state.cardList[action.payload];
    },
    updateLastFlippedCard: (state, action: PayloadAction<string | null>) => {
      state.last_flipped_card_id = action.payload;
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
    updateShowGameBoard: (state, action: PayloadAction<boolean>) => {
      state.show_game_board = action.payload;
    },
    updatePlayerTurnId: (state, action: PayloadAction<number | null>) => {
      state.player_turn_id = action.payload;
    },
    updateCardTurnCount: (state, action: PayloadAction<0 | 1>) => {
      state.card_turn_count = action.payload;
    },
  },
});

export const {
  updateCardList,
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
  updateShowGameBoard,
  updateCardState,
  updatePlayerTurnId,
  updateCardTurnCount,
} = memoryGameSlice.actions;
export const card_list = (state: RootState) => state.memoryGame.card_list;
export const last_flipped_card_id = (state: RootState) =>
  state.memoryGame.last_flipped_card_id;
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
export const show_game_board = (state: RootState) =>
  state.memoryGame.show_game_board;
export const player_turn_id = (state: RootState) =>
  state.memoryGame.player_turn_id;

export const card_turn_count = (state: RootState) =>
  state.memoryGame.card_turn_count;
export const game_complexity = (state: RootState) =>
  state.memoryGame.game_complexity;

export default memoryGameSlice.reducer;
