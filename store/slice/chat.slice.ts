// types
import type {
  InitialState,
  SendMessgeResponseType,
  Conversation,
  ISearchUserResponse,
} from "@/types/store/slice/chat";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import type { RootState } from "@/store/rootReducer";
import type { AxiosResponse } from "axios";

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
    return rejectWithValue(error);
  }
});

export const searchUserApi = createAsyncThunk<
  ISearchUserResponse,
  undefined,
  { state: RootState }
>(
  "api/chat/search-user",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const res: AxiosResponse<{
        success: boolean;
        user: User[];
      }> = await Axios.post("/chat/search-user", null, {
        params: {
          query: state.chat.searched_input_value,
        },
      });
      dispatch(updateSearchedUser(res.data.user));
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: InitialState = {
  users: [],
  active_user: null,
  active_user_conversation: [],
  is_submitting: false,
  chat_input_value: "",
  show_chat: false,
  is_audio_playing: false,
  searched_user: [],
  searched_input_value: "",
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
        const newConversation = action.payload as Conversation;
        if (
          !state.active_user_conversation.some(
            (conversation) => conversation.id == newConversation.id
          )
        ) {
          state.active_user_conversation.push(action.payload);
        }
      }
    },
    updateChatInputValue: (state, action: PayloadAction<string>) => {
      state.chat_input_value = action.payload;
    },
    updateShowChat: (state, action: PayloadAction<boolean>) => {
      state.show_chat = action.payload;
    },
    updateIsAudioPlaying: (state, action: PayloadAction<boolean>) => {
      state.is_audio_playing = action.payload;
    },
    updateSearchedUser: (state, action: PayloadAction<User[]>) => {
      state.searched_user = action.payload;
    },
    updateSearchedInputValue: (state, action: PayloadAction<string>) => {
      state.searched_input_value = action.payload;
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
export const active_user = (state: RootState) => state.chat.active_user;
export const active_user_conversation = (state: RootState) =>
  state.chat.active_user_conversation;
export const is_submitting = (state: RootState) => state.chat.is_submitting;
export const chat_input_value = (state: RootState) =>
  state.chat.chat_input_value;

export const show_chat = (state: RootState) => state.chat.show_chat;
export const is_audio_playing = (state: RootState) =>
  state.chat.is_audio_playing;
export const searched_user = (state: RootState) => state.chat.searched_user;
export const searched_input_value = (state: RootState) =>
  state.chat.searched_input_value;
export const {
  updateUsersList,
  updateActiveUser,
  updateActiveUserConversation,
  updateChatInputValue,
  updateShowChat,
  updateIsAudioPlaying,
  updateSearchedUser,
  updateSearchedInputValue,
} = chatSlice.actions;
