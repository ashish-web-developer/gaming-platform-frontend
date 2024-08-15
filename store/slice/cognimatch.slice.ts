import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// types
import type { RootState } from "../rootReducer";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUsersWithConversation } from "@/types/store/slice/chat";
import {
  ICogniMatchInitialState,
  ICognimatchRoom,
  ICreateCognimatchRoomApiRequest,
  ICreateCognimatchRoomApiResponse,
  IGetCognimatchRoomInfoApiResponse,
  IUpdateTimerStartTimeApiRequest,
  IUpdatePlayersCountApiRequest,
  IFlipCardApiRequest,
  IFlipCardApiResponse,
  ILiveStreamChat,
  ILiveStreamChatApiRequest,
  ILiveStreamChatApiResponse,
} from "@/types/store/slice/cognimatch";
import type {
  IThunkApiConfig,
  IBaseResponse,
} from "@/types/store/slice/common";
import type { AxiosResponse } from "axios";

// helpers
import { Axios } from "@/helpers/axios";
export const createCognimatchRoomApi = createAsyncThunk<
  ICreateCognimatchRoomApiResponse,
  ICreateCognimatchRoomApiRequest,
  IThunkApiConfig
>(
  "api/create-cognimatch-room",
  async ({ room_id, players_id }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ICreateCognimatchRoomApiResponse> =
        await Axios.post("/cognimatch/create-cognimatch-room", {
          room_id,
          players_id,
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getCognimatchRoomInfoApi = createAsyncThunk<
  IGetCognimatchRoomInfoApiResponse,
  undefined,
  IThunkApiConfig
>("api/cognimatch-room-info", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const response: AxiosResponse<IGetCognimatchRoomInfoApiResponse> =
      await Axios.post("/cognimatch/cognimatch-room-info", {
        room_id: state.game.room_id,
      });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const updateTimerStartTimeApi = createAsyncThunk<
  IBaseResponse,
  IUpdateTimerStartTimeApiRequest,
  IThunkApiConfig
>(
  "api/update-timer-start-time",
  async ({ next_player_turn_id }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response: AxiosResponse<IBaseResponse> = await Axios.patch(
        "/cognimatch/update-timer-start-time",
        {
          room_id: state.game.room_id,
          next_player_turn_id,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updatePlayersCountApi = createAsyncThunk<
  IBaseResponse,
  IUpdatePlayersCountApiRequest,
  IThunkApiConfig
>(
  "api/update-players-count",
  async ({ type }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response: AxiosResponse<IBaseResponse> = await Axios.patch(
        "/cognimatch/update-players-count",
        {
          room_id: state.game.room_id,
          type,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const liveStreamChatApi = createAsyncThunk<
  ILiveStreamChatApiResponse,
  ILiveStreamChatApiRequest,
  { state: RootState }
>(
  "api/live-stream-chat",
  async ({ message }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await Axios.post("/cognimatch/live-stream-chat", {
        room_id: state.game.room_id,
        message,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const flipCardApi = createAsyncThunk<
  IFlipCardApiResponse,
  IFlipCardApiRequest,
  IThunkApiConfig
>("api/flip-card", async ({ card_id }, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const response: AxiosResponse<IFlipCardApiResponse> = await Axios.patch(
      "/cognimatch/flip-card",
      {
        room_id: state.game.room_id,
        card_id,
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});
const initialState: ICogniMatchInitialState = {
  active_cognimatch_players: [],
  deck: [],
  player_turn_id: null,
  score: {},
  timer_start_count: 0,
  show_cognimatch_board: false,
  live_stream_chat_list: [],
  show_chat_streaming_modal: false,
  info_snackbar: {
    show_info_snackbar: false,
    message: "",
    name: "",
  },
  help_tooltip: {
    game_rules_list: [],
    tooltip_text: null,
    show_tooltip: false,
    current_rule_index: 0,
    play_audio: true,
  },
};
export const cognimatchSlice = createSlice({
  name: "cognimatch",
  initialState,
  reducers: {
    resetCognimatch: () => initialState,
    updateCognimatchRoomData: (
      state,
      action: PayloadAction<ICognimatchRoom>
    ) => {
      state.deck = action.payload.deck;
      state.player_turn_id = action.payload.player_turn_id;
      state.score = action.payload.score;
      state.timer_start_count = new Date(
        `${action.payload.timer_start_time}  UTC (+00:00)`
      ).getTime();
    },
    flipCardUp: (state, action: PayloadAction<{ card_id: string }>) => {
      state.deck = state.deck.map((card) => {
        if (card.id == action.payload.card_id) {
          return {
            ...card,
            flipped: true,
          };
        }
        return card;
      });
    },
    updateShowCognimatchBoard: (state, action: PayloadAction<boolean>) => {
      state.show_cognimatch_board = action.payload;
    },
    updateLiveStreamChat: (state, action: PayloadAction<ILiveStreamChat>) => {
      state.live_stream_chat_list.push(action.payload);
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
    updateGameRules: (state, action: PayloadAction<[string, string][]>) => {
      state.help_tooltip.game_rules_list = action.payload;
      state.help_tooltip.tooltip_text = action.payload[0];
    },
    updateShowHelpTooltip: (state, action: PayloadAction<boolean>) => {
      state.help_tooltip.show_tooltip = action.payload;
    },
    updatePlayHelpTooltipAudio: (state, action: PayloadAction<boolean>) => {
      state.help_tooltip.play_audio = action.payload;
    },
    updateCurrentRuleIndex: (state, action: PayloadAction<number>) => {
      state.help_tooltip.current_rule_index = action.payload;
      state.help_tooltip.tooltip_text =
        state.help_tooltip.game_rules_list[action.payload];
    },
    updateShowChatStreamingModal: (state, action: PayloadAction<boolean>) => {
      state.show_chat_streaming_modal = action.payload;
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
    updateActiveCogniMatchPlayers: (
      state,
      action: PayloadAction<{
        type: "here" | "joining" | "leaving";
        cognimatch_players: IUsersWithConversation | IUsersWithConversation[];
      }>
    ) => {
      switch (action.payload.type) {
        case "here":
          if (Array.isArray(action.payload.cognimatch_players)) {
            const cognimatch_players = action.payload.cognimatch_players.filter(
              (poker_player) =>
                !state.active_cognimatch_players.some(
                  (active_poker_player) =>
                    active_poker_player.id == poker_player.id
                )
            );
            state.active_cognimatch_players = [
              ...state.active_cognimatch_players,
              ...cognimatch_players,
            ];
          } else {
            state.active_cognimatch_players = [
              ...state.active_cognimatch_players,
              action.payload.cognimatch_players,
            ];
          }
          if (state.active_cognimatch_players.length == 2) {
            state.show_cognimatch_board = true;
          }
          return;
        case "joining":
          if (Array.isArray(action.payload.cognimatch_players)) {
            const cognimatch_players = action.payload.cognimatch_players.filter(
              (poker_player) =>
                !state.active_cognimatch_players.some(
                  (active_poker_player) =>
                    active_poker_player.id == poker_player.id
                )
            );
            state.active_cognimatch_players = [
              ...state.active_cognimatch_players,
              ...cognimatch_players,
            ];
          } else {
            const poker_player = action.payload.cognimatch_players;
            if (
              !state.active_cognimatch_players.some(
                (active_poker_player) =>
                  active_poker_player.id == poker_player.id
              )
            ) {
              state.active_cognimatch_players = [
                ...state.active_cognimatch_players,
                poker_player,
              ];
            }
          }
          if (state.active_cognimatch_players.length == 2) {
            state.show_cognimatch_board = true;
          }
          return;
        case "leaving":
          if (Array.isArray(action.payload.cognimatch_players)) {
            const { cognimatch_players } = action.payload;
            state.active_cognimatch_players =
              state.active_cognimatch_players.filter(
                (active_poker_player) =>
                  !cognimatch_players.some(
                    (poker_player) => active_poker_player.id == poker_player.id
                  )
              );
          } else {
            const { cognimatch_players } = action.payload;
            state.active_cognimatch_players =
              state.active_cognimatch_players.filter(
                (active_poker_player) =>
                  active_poker_player.id !== cognimatch_players.id
              );
          }
          return;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCognimatchRoomApi.fulfilled, (state, action) => {
      state.deck = action.payload.cognimatch_room.deck;
      state.player_turn_id = action.payload.cognimatch_room.player_turn_id;
      state.score = action.payload.cognimatch_room.score;
    });
    builder.addCase(getCognimatchRoomInfoApi.fulfilled, (state, action) => {
      state.deck = action.payload.cognimatch_room.deck;
      state.player_turn_id = action.payload.cognimatch_room.player_turn_id;
      state.score = action.payload.cognimatch_room.score;
    });
  },
});

export default cognimatchSlice.reducer;
export const active_cognimatch_players = (state: RootState) =>
  state.cognimatch.active_cognimatch_players;
export const score = (state: RootState) => state.cognimatch.score;
export const player_turn_id = (state: RootState) =>
  state.cognimatch.player_turn_id;
export const deck = (state: RootState) => state.cognimatch.deck;
export const timer_start_count = (state: RootState) =>
  state.cognimatch.timer_start_count;
export const show_cognimatch_board = (state: RootState) =>
  state.cognimatch.show_cognimatch_board;
export const live_stream_chat_list = (state: RootState) =>
  state.cognimatch.live_stream_chat_list;
export const info_snackbar = (state: RootState) =>
  state.cognimatch.info_snackbar;
export const help_tooltip = (state: RootState) => state.cognimatch.help_tooltip;
export const show_chat_streaming_modal = (state: RootState) =>
  state.cognimatch.show_chat_streaming_modal;
export const {
  resetCognimatch,
  updateActiveCogniMatchPlayers,
  updateShowCognimatchBoard,
  updateCognimatchRoomData,
  flipCardUp,
  updateLiveStreamChat,
  updateInfoSnackbar,
  updateGameRules,
  updateShowHelpTooltip,
  updatePlayHelpTooltipAudio,
  updateCurrentRuleIndex,
  updateShowChatStreamingModal,
  updateLiveSteamMessageView
} = cognimatchSlice.actions;
