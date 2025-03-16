import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// types
import { IBaseResponse } from "@/types/store/slice/common";
import type { IThunkApiConfig } from "@/types/store/slice/common";
import type { PayloadAction } from "@reduxjs/toolkit";
import type IPokerInitialState from "@/types/store/slice/poker/poker";
import type { RootState } from "@/store/rootReducer";
import type { AxiosResponse } from "axios";
import type { IDeckType } from "@/types/store/slice/poker";
import type {
  ISeatType,
  IPokerPlayer,
  ICreatePokerRoomApiRequest,
  ICreatePokerRoomApiResponse,
  IGetPokerResponseInfoRequest,
  IGetPokerRoomInfoResponse,
  IJoinPokerRoomApiRequest,
  IJoinPokerRoomApiResponse,
  IUpdateSeatAvailableRequest,
  IUpdateSeatAvailableResponse,
  IPokerRoom,
  ITriggerActionApiRequest,
} from "@/types/store/slice/poker/poker";

// helpers
import axios from "axios";
import { Axios } from "@/helpers/axios";

/**
 * ========================= API ===========================
 */

export const createPokerRoomApi = createAsyncThunk<
  ICreatePokerRoomApiResponse,
  ICreatePokerRoomApiRequest,
  IThunkApiConfig
>(
  "api/create-poker-room",
  async ({ room_id, small_blind, chips_in_pot }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ICreatePokerRoomApiResponse> =
        await Axios.post("poker/create-poker-room", {
          room_id,
          small_blind,
          chips_in_pot,
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const joinPokerRoomApi = createAsyncThunk<
  IJoinPokerRoomApiResponse,
  IJoinPokerRoomApiRequest,
  IThunkApiConfig
>(
  "api/poker/join-poker-room",
  async ({ seat_number, total_chips_left }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const response: AxiosResponse<IJoinPokerRoomApiResponse> =
        await Axios.post("/poker/join-poker-room", {
          room_id: state.poker.poker_room_id,
          seat_number,
          total_chips_left,
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateSeatAvailableApi = createAsyncThunk<
  IUpdateSeatAvailableResponse,
  IUpdateSeatAvailableRequest,
  IThunkApiConfig
>(
  "api/poker/update-seat-available",
  async ({ seat_available }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const response: AxiosResponse<IUpdateSeatAvailableResponse> =
        await Axios.post("/poker/update-seat-available", {
          room_id: state.poker.poker_room_id,
          seat_available,
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const getPokerRoomInfoApi = createAsyncThunk<
  IGetPokerRoomInfoResponse,
  IGetPokerResponseInfoRequest,
  IThunkApiConfig
>(
  "api/poker-room-info",
  async ({ poker_buy_in_amount }, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState();
      const response: AxiosResponse<IGetPokerRoomInfoResponse> =
        await Axios.post("/poker/poker-room-info", {
          room_id: state.poker.poker_room_id,
        });
      if (response.data.poker_room.seat_available !== null) {
        dispatch(
          joinPokerRoomApi({
            seat_number: response.data.poker_room.seat_available,
            total_chips_left: poker_buy_in_amount,
          })
        );
        let seat_available = ((response.data.poker_room.seat_available + 1) %
          9) as ISeatType | null;
        seat_available = seat_available == 0 ? null : seat_available;
        dispatch(
          updateSeatAvailableApi({
            seat_available,
          })
        );
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const startRoundApi = createAsyncThunk<
  IBaseResponse,
  undefined,
  IThunkApiConfig<string>
>("api/start-round", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const response: AxiosResponse<IBaseResponse> = await Axios.post(
      "/poker/start-round",
      {
        room_id: state.poker.poker_room_id,
      }
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue("Internal server error");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const dealHandApi = createAsyncThunk<
  IBaseResponse,
  undefined,
  IThunkApiConfig
>("api/deal-hand", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const response: AxiosResponse<IBaseResponse> = await Axios.post(
      "poker/deal-hand",
      {
        room_id: state.poker.poker_room_id,
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const triggerActionApi = createAsyncThunk<
  IBaseResponse & {
    start_next_round: boolean;
  },
  ITriggerActionApiRequest,
  IThunkApiConfig
>(
  "api/poker/trigger-action",
  async (
    { action_type, current_betted_amount },
    { getState, rejectWithValue, dispatch }
  ) => {
    try {
      const state = getState();
      const response: AxiosResponse<
        IBaseResponse & {
          start_next_round: boolean;
        }
      > = await Axios.post("/poker/trigger-action", {
        room_id: state.poker.poker_room_id,
        action_type,
        current_betted_amount,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState: IPokerInitialState = {
  poker_room_id: null,
  room_created_at: null,
  show_poker_slider: false,
  dealer_id: null,
  bettor_id: null,
  poker_chips: 0,
  active_poker_players: [],
  community_cards: [],
  show_buy_in_modal: true,
  min_amount_to_be_betted: null,
  min_amount_to_be_raised: null,
  small_blind: 5,
  chips_in_pot: 0,
  deck: [],
};

const pokerSlice = createSlice({
  name: "poker",
  initialState,
  reducers: {
    updatePokerRoomId: (state, action: PayloadAction<string | null>) => {
      state.poker_room_id = action.payload;
    },
    updateShowPokerSlider: (state, action: PayloadAction<boolean>) => {
      state.show_poker_slider = action.payload;
    },
    updatePokerChips: (state, action: PayloadAction<number>) => {
      state.poker_chips = action.payload;
    },
    updateActivePokerPlayer: (
      state,
      action: PayloadAction<{
        type: "here" | "added" | "removed";
        poker_players: IPokerPlayer | IPokerPlayer[];
      }>
    ) => {
      switch (action.payload.type) {
        case "here":
          if (Array.isArray(action.payload.poker_players)) {
            const poker_players = action.payload.poker_players.filter(
              (poker_player) =>
                !state.active_poker_players.some(
                  (active_poker_player) =>
                    active_poker_player.id == poker_player.id
                )
            );
            state.active_poker_players = [
              ...state.active_poker_players,
              ...poker_players,
            ];
          } else {
            state.active_poker_players = [
              ...state.active_poker_players,
              action.payload.poker_players,
            ];
          }
          return;
        case "added":
          if (Array.isArray(action.payload.poker_players)) {
            const poker_players = action.payload.poker_players.filter(
              (poker_player) =>
                !state.active_poker_players.some(
                  (active_poker_player) =>
                    active_poker_player.id == poker_player.id
                )
            );
            state.active_poker_players = [
              ...state.active_poker_players,
              ...poker_players,
            ];
          } else {
            const poker_player = action.payload.poker_players;
            if (
              !state.active_poker_players.some(
                (active_poker_player) =>
                  active_poker_player.id == poker_player.id
              )
            ) {
              state.active_poker_players = [
                ...state.active_poker_players,
                poker_player,
              ];
            }
          }
          return;
        case "removed":
          if (Array.isArray(action.payload.poker_players)) {
            const { poker_players } = action.payload;
            state.active_poker_players = state.active_poker_players.filter(
              (active_poker_player) =>
                !poker_players.some(
                  (poker_player) => active_poker_player.id == poker_player.id
                )
            );
          } else {
            const { poker_players } = action.payload;
            state.active_poker_players = state.active_poker_players.filter(
              (active_poker_player) =>
                active_poker_player.id !== poker_players.id
            );
          }
          return;
      }
    },
    updateShowBuyInModal: (state, action: PayloadAction<boolean>) => {
      state.show_buy_in_modal = action.payload;
    },
    updateDealerId: (state, action: PayloadAction<number>) => {
      state.dealer_id = action.payload;
    },
    updatePlayerData: (state, action: PayloadAction<IPokerPlayer>) => {
      state.active_poker_players = state.active_poker_players.map((player) => {
        if (player.player_id == action.payload.player_id) {
          return action.payload;
        }
        return player;
      });
    },
    resetHoleCards: (state) => {
      state.active_poker_players = state.active_poker_players.map((player) => {
        player.hole_cards = null;
        return player;
      });
    },
    updateRoomDetails: (state, action: PayloadAction<IPokerRoom>) => {
      state.bettor_id = action.payload.bettor_id;
      state.dealer_id = action.payload.dealer_id;
      state.chips_in_pot = action.payload.chips_in_pot;
      state.min_amount_to_be_betted = action.payload.min_amount_to_be_betted;
      state.min_amount_to_be_raised = action.payload.min_amount_to_be_raised;
      state.community_cards = action.payload.community_cards;
    },
    updateRoomCreatedAt: (state, action: PayloadAction<string | null>) => {
      state.room_created_at = action.payload;
    },
    updateDeck: (state, action: PayloadAction<IDeckType>) => {
      state.deck = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPokerRoomInfoApi.fulfilled, (state, action) => {
      state.small_blind = action.payload.poker_room.small_blind;
      state.chips_in_pot = action.payload.poker_room.chips_in_pot;
      state.active_poker_players = [
        ...state.active_poker_players,
        ...action.payload.poker_room.poker_player,
      ];
      state.dealer_id = action.payload.poker_room.dealer_id;
    });
    builder.addCase(createPokerRoomApi.fulfilled, (state, action) => {
      state.poker_room_id = action.payload.poker_room.room_id;
      state.dealer_id = action.payload.poker_room.dealer_id;
    });
  },
});

// reducer
export default pokerSlice.reducer;

// selector
export const pokerRoomId = (state: RootState) => state.poker.poker_room_id;
export const showPokerSlider = (state: RootState) =>
  state.poker.show_poker_slider;
export const pokerChips = (state: RootState) => state.poker.poker_chips;
export const activePokerPlayers = (state: RootState) =>
  state.poker.active_poker_players;
export const showBuyInModal = (state: RootState) =>
  state.poker.show_buy_in_modal;
export const smallBlind = (state: RootState) => state.poker.small_blind;
export const dealerId = (state: RootState) => state.poker.dealer_id;
export const bettorId = (state: RootState) => state.poker.bettor_id;
export const chipsInPot = (state: RootState) => state.poker.chips_in_pot;
export const minAmountToBeBetted = (state: RootState) =>
  state.poker.min_amount_to_be_betted;

export const minAmountToBeRaised = (state: RootState) =>
  state.poker.min_amount_to_be_raised;
export const Deck = (state: RootState) => state.poker.deck;
export const communityCards = (state: RootState) => state.poker.community_cards;
export const roomCreatedAt = (state: RootState) => state.poker.room_created_at;
// action creaters
export const {
  updatePokerRoomId,
  updatePokerChips,
  updateShowPokerSlider,
  updateShowBuyInModal,
  updateActivePokerPlayer,
  updateDealerId,
  updatePlayerData,
  resetHoleCards,
  updateRoomDetails,
  updateRoomCreatedAt,
  updateDeck,
} = pokerSlice.actions;
