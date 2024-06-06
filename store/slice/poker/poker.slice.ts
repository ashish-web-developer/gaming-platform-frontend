import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// types
import { IThunkApiConfig } from "@/types/store/slice/common";
import type { PayloadAction } from "@reduxjs/toolkit";
import type IPokerInitialState from "@/types/store/slice/poker/poker";
import type { RootState } from "@/store/rootReducer";
import {
  IAcceptInvitationApiRequest,
  IUsersWithConversation,
} from "@/types/store/slice/chat";
import { AxiosResponse } from "axios";
import type { IActiveGamingUser } from "@/types/store/slice/poker/poker";

// helpers
import { Axios } from "@/helpers/axios";

export const updateBuyInAmountApi = createAsyncThunk<
  { success: boolean },
  undefined,
  IThunkApiConfig
>("api/update-buy-in-amount", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const response: AxiosResponse<{ success: boolean }> = await Axios.post(
      "/poker/buy-in-amount",
      {
        room_id: state.game.room_id,
        user_id: state.user.user.id,
        buy_in_amount: state.poker.poker_buy_in_amount,
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

const initialState: IPokerInitialState = {
  show_poker_slider: false,
  poker_chips: 0,
  slider_val: 0,
  active_gaming_user: [],
  show_buy_in_modal: true,
  poker_buy_in_amount: 40,
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
    updateActiveGamingUser: (
      state,
      action: PayloadAction<{
        type: "here" | "joining" | "leaving";
        users: IActiveGamingUser[] | IActiveGamingUser;
      }>
    ) => {
      switch (action.payload.type) {
        case "here":
          if (Array.isArray(action.payload.users)) {
            const users = action.payload.users
              .filter(
                (user) =>
                  !state.active_gaming_user.some(
                    (active_user) => active_user.id == user.id
                  )
              )
              .map((user) => user);
            state.active_gaming_user = [...state.active_gaming_user, ...users];
          } else {
            state.active_gaming_user = [
              ...state.active_gaming_user,
              action.payload.users,
            ];
          }
          return;
        case "joining":
          if (Array.isArray(action.payload.users)) {
            const users = action.payload.users
              .filter(
                (user) =>
                  !state.active_gaming_user.some(
                    (active_user) => active_user.id == user.id
                  )
              )
              .map((user) => user);
            state.active_gaming_user = [...state.active_gaming_user, ...users];
          } else {
            const user = action.payload.users;
            if (
              !state.active_gaming_user.some(
                (active_user) => active_user.id == user.id
              )
            ) {
              state.active_gaming_user = [...state.active_gaming_user, user];
            }
          }
          return;
        case "leaving":
          if (Array.isArray(action.payload.users)) {
            const { users } = action.payload;
            state.active_gaming_user = state.active_gaming_user.filter(
              (active_user) => !users.some((user) => active_user.id == user.id)
            );
          } else {
            const { users } = action.payload;
            state.active_gaming_user = state.active_gaming_user.filter(
              (active_user) => active_user.id !== users.id
            );
          }
          return;
      }
    },
    updateBuyInAmount: (
      state,
      action: PayloadAction<{ user_id: number; buy_in_amount: number }>
    ) => {
      state.active_gaming_user = state.active_gaming_user.map((user) => {
        if (user.id == action.payload.user_id) {
          return {
            ...user,
            buy_in_amount: action.payload.buy_in_amount,
          };
        }
        return {
          ...user,
        };
      });
    },
    updateShowBuyInModal: (state, action: PayloadAction<boolean>) => {
      state.show_buy_in_modal = action.payload;
    },
    updatePokerBuyInAmount: (state, action: PayloadAction<number>) => {
      state.poker_buy_in_amount = action.payload;
    },
  },
});

// reducer
export default pokerSlice.reducer;

// selector
export const show_poker_slider = (state: RootState) =>
  state.poker.show_poker_slider;
export const poker_chips = (state: RootState) => state.poker.poker_chips;
export const slider_val = (state: RootState) => state.poker.slider_val;
export const active_gaming_user = (state: RootState) =>
  state.poker.active_gaming_user;
export const show_buy_in_modal = (state: RootState) =>
  state.poker.show_buy_in_modal;
export const poker_buy_in_amount = (state: RootState) =>
  state.poker.poker_buy_in_amount;
// action creaters
export const {
  updatePokerChips,
  updateSliderVal,
  updateShowPokerSlider,
  updateActiveGamingUser,
  updateShowBuyInModal,
  updatePokerBuyInAmount,
  updateBuyInAmount,
} = pokerSlice.actions;
