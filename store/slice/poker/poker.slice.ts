import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// types
import type { IThunkApiConfig } from "@/types/store/slice/common";
import type { PayloadAction } from "@reduxjs/toolkit";
import type IPokerInitialState from "@/types/store/slice/poker/poker";
import type { RootState } from "@/store/rootReducer";
import type { AxiosResponse } from "axios";
import type {
  IPokerPlayer,
  ICreatePokerRoomApiRequest,
  ICreatePokerRoomApiResponse,
  IGetPokerResponseInfoRequest,
  IGetPokerRoomInfoResponse,
  IJoinPokerRoomApiRequest,
  IJoinPokerRoomApiResponse,
  IUpdateSeatAvailableRequest,
  IUpdateSeatAvailableResponse,
} from "@/types/store/slice/poker/poker";

// helpers
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
          room_id: state.game.room_id,
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
          room_id: state.game.room_id,
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
          room_id: state.game.room_id,
        });
      if (response.data.poker_room.seat_available !== 0) {
        dispatch(
          joinPokerRoomApi({
            seat_number: response.data.poker_room.seat_available,
            total_chips_left: poker_buy_in_amount,
          })
        );
        dispatch(
          updateSeatAvailableApi({
            seat_available: ((response.data.poker_room.seat_available + 1) %
              4) as 0 | 1 | 2 | 3,
          })
        );
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState: IPokerInitialState = {
  show_poker_slider: false,
  poker_chips: 0,
  slider_val: 0,
  active_poker_players: [],
  show_buy_in_modal: true,
  small_blind: 5,
  chips_in_pot: 0,
};

const pokerSlice = createSlice({
  name: "poker",
  initialState,
  reducers: {
    updateShowPokerSlider: (state, action: PayloadAction<boolean>) => {
      state.show_poker_slider = action.payload;
    },
    updatePokerChips: (state, action: PayloadAction<number>) => {
      state.poker_chips = action.payload;
    },
    updateSliderVal: (state, action: PayloadAction<number>) => {
      state.slider_val = action.payload;
    },
    updateActivePokerPlayer: (
      state,
      action: PayloadAction<{
        type: "here" | "joining" | "leaving";
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
        case "joining":
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
        case "leaving":
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
    // updateActiveGamingUser: (
    //   state,
    //   action: PayloadAction<{
    //     type: "here" | "joining" | "leaving";
    //     users: IActiveGamingUser[] | IActiveGamingUser;
    //   }>
    // ) => {
    //   switch (action.payload.type) {
    //     case "here":
    //       if (Array.isArray(action.payload.users)) {
    //         const users = action.payload.users
    //           .filter(
    //             (user) =>
    //               !state.active_gaming_user.some(
    //                 (active_user) => active_user.id == user.id
    //               )
    //           )
    //           .map((user) => user);
    //         state.active_gaming_user = [...state.active_gaming_user, ...users];
    //       } else {
    //         state.active_gaming_user = [
    //           ...state.active_gaming_user,
    //           action.payload.users,
    //         ];
    //       }
    //       return;
    //     case "joining":
    //       if (Array.isArray(action.payload.users)) {
    //         const users = action.payload.users
    //           .filter(
    //             (user) =>
    //               !state.active_gaming_user.some(
    //                 (active_user) => active_user.id == user.id
    //               )
    //           )
    //           .map((user) => user);
    //         state.active_gaming_user = [...state.active_gaming_user, ...users];
    //       } else {
    //         const user = action.payload.users;
    //         if (
    //           !state.active_gaming_user.some(
    //             (active_user) => active_user.id == user.id
    //           )
    //         ) {
    //           state.active_gaming_user = [...state.active_gaming_user, user];
    //         }
    //       }
    //       return;
    //     case "leaving":
    //       if (Array.isArray(action.payload.users)) {
    //         const { users } = action.payload;
    //         state.active_gaming_user = state.active_gaming_user.filter(
    //           (active_user) => !users.some((user) => active_user.id == user.id)
    //         );
    //       } else {
    //         const { users } = action.payload;
    //         state.active_gaming_user = state.active_gaming_user.filter(
    //           (active_user) => active_user.id !== users.id
    //         );
    //       }
    //       return;
    //   }
    // },
    // updateBuyInAmount: (
    //   state,
    //   action: PayloadAction<{ user_id: number; buy_in_amount: number }>
    // ) => {
    //   state.active_gaming_user = state.active_gaming_user.map((user) => {
    //     if (user.id == action.payload.user_id) {
    //       return {
    //         ...user,
    //         buy_in_amount: action.payload.buy_in_amount,
    //       };
    //     }
    //     return {
    //       ...user,
    //     };
    //   });
    // },
    updateShowBuyInModal: (state, action: PayloadAction<boolean>) => {
      state.show_buy_in_modal = action.payload;
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
    });
  },
});

// reducer
export default pokerSlice.reducer;

// selector
export const show_poker_slider = (state: RootState) =>
  state.poker.show_poker_slider;
export const poker_chips = (state: RootState) => state.poker.poker_chips;
export const slider_val = (state: RootState) => state.poker.slider_val;
export const active_poker_players = (state: RootState) =>
  state.poker.active_poker_players;
export const show_buy_in_modal = (state: RootState) =>
  state.poker.show_buy_in_modal;
export const small_blind = (state: RootState) => state.poker.small_blind;
// action creaters
export const {
  updatePokerChips,
  updateSliderVal,
  updateShowPokerSlider,
  updateShowBuyInModal,
  updateActivePokerPlayer,
} = pokerSlice.actions;
