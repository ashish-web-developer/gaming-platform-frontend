// types
import type {
  InitialState,
  ISendInvitationResponse,
  ISendInvitationRequest,
  IAcceptInvitationRequest,
  IAcceptInvitationResponse,
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
      console.log(response);
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
      dispatch(updateShowSnackbar(false));
      if (!is_accepted) updateGamingUser(null);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: InitialState = {
  gaming_user: null,
  room_id: null,
  show_snackbar: false,
  sending_invitation: false,
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
    updateShowSnackbar: (state, action: PayloadAction<boolean>) => {
      state.show_snackbar = action.payload;
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
export const show_snackbar = (state: RootState) => state.game.show_snackbar;
export const sending_invitation = (state: RootState) =>
  state.game.sending_invitation;
export const { updateGamingUser, updateRoomId, updateShowSnackbar } =
  gameSlice.actions;
