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
  IUpdateScoreArgs,
  IUpdateScoreResponse,
  Score,
} from "@/types/store/slice/memory-game";
import { IUsersWithConversation } from "@/types/store/slice/chat";

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

export const updateScoreEvent = createAsyncThunk<
  IUpdateScoreResponse,
  IUpdateScoreArgs,
  { state: RootState }
>(
  "memory-game/update-score",
  async ({ score }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const res = await Axios.post("/memory-game/update-score", {
        room_id: state.game.room_id,
        score,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getCardsApi = createAsyncThunk<
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
  active_cognimatch_players: [],
  game_complexity: 18,
  player_turn_id: null,
  card_list: [],
  last_flipped_card_id: null,
  is_gaming_user_in: false,
  help_tooltip_text: null,
  current_rule_index: 0,
  game_rules_list: [],
  show_audio_play_modal: true,
  show_leaving_snackbar: false,
  is_gaming_user_leaving: false,
  show_help_tooltip: false,
  play_audio: true,
  show_game_board: false,
  score: null,
  show_chat_streaming_modal: false,
  live_stream_chat_list: [],
  show_live_stream_chat: false,
  info_snackbar: {
    show_info_snackbar: false,
    message: "",
    name: "",
  },
  mobile: {
    show_help_drawer: false,
  },
};
export const memoryGameSlice = createSlice({
  name: "memory-game-slice",
  initialState,
  reducers: {
    resetMemoryGame: () => initialState,
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
    updateInfoSnackbar: (
      state,
      action: PayloadAction<{
        show_snacbar: boolean;
        message: string;
        name: string;
      }>
    ) => {
      state.info_snackbar.show_info_snackbar = action.payload.show_snacbar;
      state.info_snackbar.message = action.payload.message;
      state.info_snackbar.name = action.payload.name;
    },
    updateIsGamingUserLeaving: (state, action: PayloadAction<boolean>) => {
      state.is_gaming_user_leaving = action.payload;
      state.show_leaving_snackbar = action.payload;
    },
    updateShowHelpTooltip: (state, action: PayloadAction<boolean>) => {
      state.show_help_tooltip = action.payload;
    },
    updatePlayAudio: (state, action) => {
      state.play_audio = action.payload;
    },
    updateShowGameBoard: (state, action: PayloadAction<boolean>) => {
      state.show_game_board = action.payload;
    },
    updatePlayerTurnId: (state, action: PayloadAction<number | null>) => {
      state.player_turn_id = action.payload;
    },
    updateScore: (state, action: PayloadAction<Score | null>) => {
      state.score = action.payload;
    },
    updateShowChatStreamingModal: (state, action: PayloadAction<boolean>) => {
      state.show_chat_streaming_modal = action.payload;
    },
    updateLiveStreamChatList: (
      state,
      action: PayloadAction<{
        message: string;
        user: IUsersWithConversation;
        viewed: boolean;
        id: string;
      }>
    ) => {
      state.live_stream_chat_list.push(action.payload);
    },
    updateLiveSteamMessageView: (
      state,
      action: PayloadAction<{ id: string; viewed: boolean }>
    ) => {
      state.live_stream_chat_list = state.live_stream_chat_list.map((chat) => {
        if (chat.id == action.payload.id) {
          return {
            ...chat,
            viewed: true,
          };
        }
        return chat;
      });
    },
    updateShowLiveSteamChat: (state, action: PayloadAction<boolean>) => {
      state.show_live_stream_chat = action.payload;
    },
  },
});

export const {
  resetMemoryGame,
  updateCardList,
  updateLastFlippedCard,
  updateIsGamingUserIn,
  updateGameRules,
  updateShowAudioPlayModal,
  updateCurrentRuleIndex,
  updateInfoSnackbar,
  updateIsGamingUserLeaving,
  updateShowHelpTooltip,
  updatePlayAudio,
  updateShowGameBoard,
  updateCardState,
  updatePlayerTurnId,
  updateScore,
  updateShowChatStreamingModal,
  updateLiveStreamChatList,
  updateLiveSteamMessageView,
  updateShowLiveSteamChat,
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
export const info_snackbar = (state: RootState) =>
  state.memoryGame.info_snackbar;

export const is_gaming_user_leaving = (state: RootState) =>
  state.memoryGame.is_gaming_user_leaving;
export const show_help_tooltip = (state: RootState) =>
  state.memoryGame.show_help_tooltip;
export const play_audio = (state: RootState) => state.memoryGame.play_audio;
export const show_game_board = (state: RootState) =>
  state.memoryGame.show_game_board;
export const player_turn_id = (state: RootState) =>
  state.memoryGame.player_turn_id;

export const game_complexity = (state: RootState) =>
  state.memoryGame.game_complexity;

export const score = (state: RootState) => state.memoryGame.score;
export const show_chat_streaming_modal = (state: RootState) =>
  state.memoryGame.show_chat_streaming_modal;
export const live_stream_chat_list = (state: RootState) =>
  state.memoryGame.live_stream_chat_list;
export const show_leaving_snackbar = (state: RootState) =>
  state.memoryGame.show_leaving_snackbar;
export const show_live_stream_chat = (state: RootState) =>
  state.memoryGame.show_live_stream_chat;
export const active_cognimatch_players = (state: RootState) =>
  state.memoryGame.active_cognimatch_players;
export default memoryGameSlice.reducer;
