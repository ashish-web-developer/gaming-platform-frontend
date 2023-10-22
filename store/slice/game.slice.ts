// types
import type {
  InitialState,
  ISendInvitationResponse,
  ISendInvitationRequest,
  IAcceptInvitationRequest,
  IAcceptInvitationResponse,
  IUpdatePlayerTurnResponse,
  IUpdateTimerStartCountEventResponse,
  IUpdateTimerStartCountEventRequest,
} from "@/types/store/slice/game";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import type { RootState } from "@/store/rootReducer";
import type { AxiosResponse } from "axios";
// redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helpers
import { Axios } from "@/helpers/axios";
// helpers package
import { v4 as uuidv4 } from "uuid";

export const sendInvitation = createAsyncThunk<
  ISendInvitationResponse,
  ISendInvitationRequest,
  { state: RootState }
>(
  "game/send-invitation",
  async ({ game }, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      const room_id = uuidv4();
      const response: AxiosResponse<ISendInvitationResponse> = await Axios.post(
        "/game/game-invitation",
        {
          room_id,
          game,
          receiver_id: state.chat.active_user?.id,
        }
      );
      dispatch(udpateIsProposalSender(true));
      dispatch(updateRoomId(room_id));
      dispatch(updateGamingUser(state.chat.active_user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const acceptInvitation = createAsyncThunk<
  IAcceptInvitationResponse,
  IAcceptInvitationRequest,
  { state: RootState }
>(
  "game/accept-invitation",
  async ({ is_accepted }, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState();
      const response = await Axios.post("/game/accept-invitation", {
        receiver_id: state.game.gaming_user?.id,
        is_accepted,
      });
      dispatch(updateShowInvitationSnackbar(false));
      if (is_accepted) {
      } else {
        updateGamingUser(null);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePlayerTurnEvent = createAsyncThunk<
  IUpdatePlayerTurnResponse,
  undefined,
  { state: RootState }
>(
  "game/update-player-turn-event",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState();
      const response = await Axios.post("/game/update-player-turn", {
        room_id: state.game.room_id,
        player_turn_id: state.game.gaming_user?.id,
      });
      dispatch(
        updateTimerStartCountEvent({ timer_count: new Date().getTime() })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateTimerStartCountEvent = createAsyncThunk<
  IUpdateTimerStartCountEventResponse,
  IUpdateTimerStartCountEventRequest,
  { state: RootState }
>(
  "game/update-timer-start-count",
  async ({ timer_count }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await Axios.post("/game/update-timer-start-count", {
        room_id: state.game.room_id,
        timer_start_count: timer_count,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: InitialState = {
  gaming_user: null,
  room_id: null,
  show_invitation_snackbar: false,
  show_denied_snackbar: false,
  sending_invitation: false,
  is_proposal_sender: false,
  timer_start_count: null,
};
const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGamingUser: (state, action: PayloadAction<User | null>) => {
      state.gaming_user = action.payload;
    },
    updateRoomId: (state, action: PayloadAction<string | null>) => {
      state.room_id = action.payload;
    },
    updateShowInvitationSnackbar: (state, action: PayloadAction<boolean>) => {
      state.show_invitation_snackbar = action.payload;
    },
    updateShowDeniedSnackbar: (state, action: PayloadAction<boolean>) => {
      state.show_denied_snackbar = action.payload;
    },
    udpateIsProposalSender: (state, action: PayloadAction<boolean>) => {
      state.is_proposal_sender = action.payload;
    },
    updateTimerStartCount: (state, action: PayloadAction<number | null>) => {
      state.timer_start_count = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendInvitation.pending, (state) => {
      state.sending_invitation = true;
    });
    builder.addCase(sendInvitation.fulfilled, (state) => {
      state.sending_invitation = false;
    });
    builder.addCase(sendInvitation.rejected, (state) => {
      state.sending_invitation = false;
    });
  },
});

export default gameSlice.reducer;
export const gaming_user = (state: RootState) => state.game.gaming_user;
export const room_id = (state: RootState) => state.game.room_id;
export const show_invitation_snackbar = (state: RootState) =>
  state.game.show_invitation_snackbar;
export const show_denied_snackbar = (state: RootState) =>
  state.game.show_denied_snackbar;
export const sending_invitation = (state: RootState) =>
  state.game.sending_invitation;
export const is_proposal_sender = (state: RootState) =>
  state.game.is_proposal_sender;
export const timer_start_count = (state: RootState) =>
  state.game.timer_start_count;
export const {
  updateGamingUser,
  updateRoomId,
  updateShowInvitationSnackbar,
  updateShowDeniedSnackbar,
  udpateIsProposalSender,
  updateTimerStartCount,
} = gameSlice.actions;
