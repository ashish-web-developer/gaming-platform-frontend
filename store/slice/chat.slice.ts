// types
import type { InitialState } from "@/types/store/slice/chat";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import type { RootState } from "@/store/rootReducer";
import type { Conversation } from "@/types/store/slice/chat";
import type { AxiosResponse } from "axios";
import type { SendMessgeResponseType } from "@/types/store/slice/chat";

// Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helpers
import { Axios } from "@/helpers/axios";

export const sendMessage = createAsyncThunk<
  SendMessgeResponseType,
  undefined,
  { state: RootState }
>("api/send-message", async (_, { rejectWithValue, getState, dispatch }) => {
  try {
    const state = getState();
    const res: AxiosResponse<{
      success: boolean;
      conversation: Conversation;
    }> = await Axios.post("/chat/send-message", {
      sender_id: state.user.user.id,
      receiver_id: state.chat.active_user?.id,
      message: state.chat.chat_input_value,
    });
    dispatch(updateActiveUserConversation(res.data.conversation));
    return res.data;
  } catch (error) {
    return rejectWithValue(error?.response.error);
  }
});

const initialState: InitialState = {
  users: [],
  mobile_navigation: 0,
  active_user: null,
  active_user_conversation: [],
  is_submitting: false,
  chat_input_value: "",
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateUsersList: (state, action: PayloadAction<User | User[]>) => {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((newUser) => {
          if (
            !state.users.some((existingUser) => existingUser.id == newUser.id)
          ) {
            state.users.push(newUser);
          }
        });
      } else {
        const newUser = action.payload as User;
        if (!state.users.some((user) => user.id == newUser.id)) {
          state.users.push(action.payload);
        }
      }
    },
    updateMobileNavigation: (state, action: PayloadAction<number>) => {
      state.mobile_navigation = action.payload;
    },
    updateActiveUser: (state, action: PayloadAction<User>) => {
      state.active_user = action.payload;
    },
    updateActiveUserConversation: (
      state,
      action: PayloadAction<Conversation[] | Conversation>
    ) => {
      if (Array.isArray(action.payload)) {
        state.active_user_conversation = action.payload;
      } else {
        state.active_user_conversation.push(action.payload);
      }
    },
    updateChatInputValue: (state, action: PayloadAction<string | null>) => {
      state.chat_input_value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state, action) => {
      state.is_submitting = true;
    });
    builder.addCase(sendMessage.fulfilled, (state) => {
      state.is_submitting = false;
      state.chat_input_value = "";
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.is_submitting = true;
    });
  },
});

export default chatSlice.reducer;
export const users = (state: RootState) => state.chat.users;
export const mobile_navigation = (state: RootState) =>
  state.chat.mobile_navigation;
export const active_user = (state: RootState) => state.chat.active_user;
export const active_user_conversation = (state: RootState) =>
  state.chat.active_user_conversation;
export const is_submitting = (state: RootState) => state.chat.is_submitting;
export const chat_input_value = (state: RootState) =>
  state.chat.chat_input_value;
export const {
  updateUsersList,
  updateMobileNavigation,
  updateActiveUser,
  updateActiveUserConversation,
  updateChatInputValue,
} = chatSlice.actions;
