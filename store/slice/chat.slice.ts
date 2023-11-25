import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// types
import { PayloadAction } from "@reduxjs/toolkit";
import type IChatInitialState from "@/types/store/slice/chat";
import type {
  IFetchUserResponse,
  IFetchDefaultUserResponse,
  IUsersWithConversation,
  IFetchMessagesResponse,
  ISendMessageRequest,
  ISendMessageResponse,
  IConversation,
  IUpdateViewRequest,
  IUpdateViewResponse,
} from "@/types/store/slice/chat";
import type { RootState } from "@/store/rootReducer";
import type { AxiosResponse } from "axios";

// helpers
import { Axios } from "@/helpers/axios";

// api calls
export const fetchUser = createAsyncThunk<
  IFetchUserResponse,
  undefined,
  { state: RootState }
>("api/chat/search-user", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const response: AxiosResponse<IFetchUserResponse> = await Axios.post(
      "/chat/search-user",
      null,
      {
        params: {
          query: state.chat.search_input_value,
          page: state.chat.fetch_user.page,
          skip_id: state.chat.default_users.map(({ id }) => id),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const fetchDefaultUser = createAsyncThunk<
  IFetchDefaultUserResponse,
  undefined,
  { state: RootState }
>("api/chat/get-default-user", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IFetchDefaultUserResponse> = await Axios.get(
      "/chat/get-user"
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const fetchMessages = createAsyncThunk<
  IFetchMessagesResponse,
  undefined,
  { state: RootState }
>("api/chat/get-messages", async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const response: AxiosResponse<IFetchMessagesResponse> = await Axios.post(
      "/chat/get-messages",
      {
        sender_id: state.user.user.id,
        receiver_id: state.chat.active_user?.id,
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const updateView = createAsyncThunk<
  IUpdateViewResponse,
  IUpdateViewRequest,
  { state: RootState }
>("api/chat/view", async ({ conversation_id }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IUpdateViewResponse> = await Axios.post(
      "chat/viewed",
      {
        conversation_id,
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const sendMessage = createAsyncThunk<
  ISendMessageResponse,
  ISendMessageRequest,
  { state: RootState }
>(
  "api/chat/send-message",
  async ({ message }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response: AxiosResponse<ISendMessageResponse> = await Axios.post(
        "/chat/send-message",
        {
          sender_id: state.user.user.id,
          receiver_id: state.chat.active_user?.id,
          message,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState: IChatInitialState = {
  search_input_value: "",
  fetch_user: {
    page: 1,
    fetched_user_result: [],
    is_request_pending: false,
  },
  default_users: [],
  active_user: null,
  active_user_conversation: [],
  send_message: {
    is_request_pending: false,
  },
  show_emoji: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateSearchInputValue: (state, action: PayloadAction<string>) => {
      state.search_input_value = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.fetch_user.page = action.payload;
    },
    updateFetchUserResult: (
      state,
      action: PayloadAction<IUsersWithConversation[]>
    ) => {
      if (!action.payload.length) {
        state.fetch_user.fetched_user_result = [];
      } else {
        state.fetch_user.fetched_user_result = [
          ...state.fetch_user.fetched_user_result,
          ...action.payload,
        ];
      }
    },
    updateIsRequestPending: (state, action: PayloadAction<boolean>) => {
      state.fetch_user.is_request_pending = action.payload;
    },
    updateDefaultUser: (
      state,
      action: PayloadAction<IUsersWithConversation>
    ) => {
      state.default_users.push(action.payload);
    },
    updateActiveUser: (
      state,
      action: PayloadAction<IUsersWithConversation>
    ) => {
      state.active_user = action.payload;
    },
    updateShowEmoji: (state, action: PayloadAction<boolean>) => {
      state.show_emoji = action.payload;
    },
    updateActiveUserConversation: (
      state,
      action: PayloadAction<IConversation>
    ) => {
      state.active_user_conversation.push(action.payload);
      state.default_users = state.default_users.map((user) => {
        if (user.id == action.payload.sender_id) {
          return {
            ...user,
            latest_conversation: action.payload,
          };
        }
        return user;
      });
    },
    updateConversationView: (state, action: PayloadAction<IConversation>) => {
      const updatedConversation = action.payload;
      const updatedConversations = state.active_user_conversation.map(
        (conversation) => {
          if (conversation.id === updatedConversation.id) {
            return updatedConversation;
          }
          return conversation;
        }
      );

      return {
        ...state,
        active_user_conversation: updatedConversations,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.fetch_user.fetched_user_result = [
        ...state.fetch_user.fetched_user_result,
        ...action.payload.user_data.data,
      ];
      state.fetch_user.page = state.fetch_user.page + 1;
      state.fetch_user.is_request_pending = false;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.fetch_user.is_request_pending = true;
    });
    builder.addCase(fetchDefaultUser.fulfilled, (state, action) => {
      state.default_users = action.payload.users;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.active_user_conversation = action.payload.conversation;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.active_user_conversation.push(action.payload.conversation);
      state.send_message.is_request_pending = false;
      state.default_users = state.default_users.map((user) => {
        if (user.id == action.payload.conversation.receiver_id) {
          {
            return {
              ...user,
              latest_conversation: action.payload.conversation,
            };
          }
        }
        return user;
      });
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      state.send_message.is_request_pending = true;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.send_message.is_request_pending = false;
    });
    builder.addCase(updateView.fulfilled, (state, action) => {
      const updatedConversation = action.payload.conversation;
      const updatedConversations = state.active_user_conversation.map(
        (conversation) => {
          if (conversation.id === updatedConversation.id) {
            return updatedConversation;
          }
          return conversation;
        }
      );

      return {
        ...state,
        active_user_conversation: updatedConversations,
      };
    });
  },
});

export default chatSlice.reducer;
export const search_input_value = (state: RootState) =>
  state.chat.search_input_value;
export const page = (state: RootState) => state.chat.fetch_user.page;
export const fetched_user_result = (state: RootState) =>
  state.chat.fetch_user.fetched_user_result;
export const is_request_pending = (state: RootState) =>
  state.chat.fetch_user.is_request_pending;
export const default_users = (state: RootState) => state.chat.default_users;

export const active_user = (state: RootState) => state.chat.active_user;

export const active_user_conversation = (state: RootState) =>
  state.chat.active_user_conversation;
export const send_message_request_pending = (state: RootState) =>
  state.chat.send_message.is_request_pending;
export const show_emoji = (state: RootState) => state.chat.show_emoji;
export const {
  updateSearchInputValue,
  updatePage,
  updateFetchUserResult,
  updateIsRequestPending,
  updateDefaultUser,
  updateActiveUser,
  updateShowEmoji,
  updateActiveUserConversation,
  updateConversationView,
} = chatSlice.actions;
