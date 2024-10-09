import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type IChatInitialState from "@/types/store/slice/chat";
import type { IThunkApiConfig } from "@/types/store/slice/common";
import type { IUser } from "@/types/store/slice/login";
import type {
  IConversation,
  IUsersWithConversation,
  IFetchUserApiRequest,
  IFetchUserApiResponse,
  IFetchDefaultUserResponse,
  IFetchMessagesResponse,
  IUpdateViewRequest,
  IUpdateViewResponse,
  ISendInvitationApiRequest,
  ISendInvitationApiResponse,
  ISendMessagePayload,
  ISendMessageResponse,
} from "@/types/store/slice/chat";
import type { RootState } from "@/store/rootReducer";
import type { AxiosResponse } from "axios";

// thunk api
import { fetchGroupMessagesApi } from "@/store/slice/group.slice";

// helpers
import axios from "axios";
import { Axios } from "@/helpers/axios";

export const fetchUserApi = createAsyncThunk<
  IFetchUserApiResponse & {
    fetch_type: "chat" | "group";
  },
  IFetchUserApiRequest,
  IThunkApiConfig<string>
>(
  "api/chat/search-user",
  async ({ query, fetch_type }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response: AxiosResponse<IFetchUserApiResponse> = await Axios.post(
        "/chat/search-user",
        null,
        {
          params: {
            query,
            page: state.chat.fetch_user.page,
            skip_id: state.chat.default_users.map(({ id }) => id),
          },
        }
      );
      return {
        fetch_type,
        ...response.data,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue("Internal server error");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

/**
 * User to whom conversation have been made
 */
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

/**
 * Fetches messsages related to certain user
 */

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
        sender_id: state.login.user?.id,
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

export const sendInvitationApi = createAsyncThunk<
  ISendInvitationApiResponse,
  ISendInvitationApiRequest,
  { state: RootState }
>(
  "api/game/invitation",
  async ({ game, room_id }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      if (state.chat.active_user) {
        const response: AxiosResponse<ISendInvitationApiResponse> =
          await Axios.post("game/game-invitation", {
            receiver_ids: [state.chat.active_user.id],
            game,
            room_id,
          });

        return response.data;
      }
      const response: AxiosResponse<ISendInvitationApiResponse> =
        await Axios.post("game/game-invitation", {
          receiver_ids: state.group.active_group
            ? [
                ...state.group.active_group?.user_group
                  .filter(
                    (_user_group) =>
                      _user_group.user_id !== state.login.user?.id
                  )
                  .map((_user_group) => _user_group.user_id),
                ...(state.group.active_group.admin &&
                state.login.user?.id !== state.group.active_group.admin.id
                  ? [state.group.active_group.admin.id]
                  : []),
              ]
            : [],
          game,
          room_id,
        });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const sendMessageApi = createAsyncThunk<
  ISendMessageResponse,
  ISendMessagePayload,
  IThunkApiConfig
>("api/chat/send-message", async ({ form_data }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ISendMessageResponse> = await Axios.post(
      "/chat/send-message",
      form_data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

const initialState: IChatInitialState = {
  fetch_user: {
    page: 1,
    fetched_user_result: [],
    fetch_type: null,
    is_request_pending: false,
  },
  default_users: [],
  active_user: null,
  active_user_status: false,
  active_conversation: [],
  send_message: {
    is_request_pending: false,
  },
  mobile: {
    show_chat: false,
    show_search_dialog: false,
  },
  invites_dialog: {
    show_cognimatch_invite_dialog: false,
    show_poker_invite_dialog: false,
  },
  typing_user: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChat: () => initialState,
    updatePage: (state, action: PayloadAction<number>) => {
      state.fetch_user.page = action.payload;
    },
    updateFetchUserResult: (
      state,
      action: PayloadAction<IUsersWithConversation[]>
    ) => {
      if (!action.payload.length) {
        state.fetch_user.fetched_user_result = [];
        state.fetch_user.fetch_type = null;
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
    updateDefaultUser: (state, action: PayloadAction<IUser>) => {
      state.default_users.push(action.payload as IUsersWithConversation);
    },
    updateActiveUser: (
      state,
      action: PayloadAction<IUsersWithConversation | null>
    ) => {
      state.active_user = action.payload;
    },
    updateActiveUserConversation: (
      state,
      action: PayloadAction<IConversation>
    ) => {
      state.active_conversation.push(action.payload);
    },
    updateDefaultUserConversation: (
      state,
      action: PayloadAction<{
        user: IUser;
        conversation: IConversation;
      }>
    ) => {
      let is_user_exit = state.default_users.find(
        (user) => user.id == action.payload.user.id
      );
      if (is_user_exit) {
        state.default_users = state.default_users.map((user) => {
          if (user.id == action.payload.user.id) {
            return {
              ...user,
              latest_conversation: action.payload.conversation,
              not_viewed: user.not_viewed + 1,
            };
          }
          return user;
        });
      } else {
        state.default_users.push({
          ...action.payload.user,
          latest_conversation: action.payload.conversation,
          not_viewed: 1,
        });
      }
    },
    updateConversationView: (state, action: PayloadAction<IConversation>) => {
      const updatedConversation = action.payload;
      const updatedConversations = state.active_conversation.map(
        (conversation) => {
          if (conversation.id === updatedConversation.id) {
            return updatedConversation;
          }
          return conversation;
        }
      );

      return {
        ...state,
        active_conversation: updatedConversations,
      };
    },
    updateTypingUser: (
      state,
      action: PayloadAction<{
        user: IUser | null;
      }>
    ) => {
      state.typing_user = action.payload.user;
    },
    updateShowChat: (state, action: PayloadAction<boolean>) => {
      state.mobile.show_chat = action.payload;
    },
    updateShowSearch: (state, action: PayloadAction<boolean>) => {
      state.mobile.show_search_dialog = action.payload;
    },
    updateInviteDialog: (
      state,
      action: PayloadAction<{
        modal_type: "cognimatch" | "poker";
        is_open: boolean;
      }>
    ) => {
      state.invites_dialog[`show_${action.payload.modal_type}_invite_dialog`] =
        action.payload.is_open;
    },
    updateActiveUserStatus: (state, action: PayloadAction<boolean>) => {
      console.log("inside updater function");
      state.active_user_status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserApi.fulfilled, (state, action) => {
      state.fetch_user.fetched_user_result = [
        ...state.fetch_user.fetched_user_result,
        ...action.payload.user_data.data,
      ];
      state.fetch_user.page = state.fetch_user.page + 1;
      state.fetch_user.is_request_pending = false;
      state.fetch_user.fetch_type = action.payload.fetch_type;
    });
    builder.addCase(fetchUserApi.pending, (state, action) => {
      state.fetch_user.is_request_pending = true;
    });
    builder.addCase(fetchDefaultUser.fulfilled, (state, action) => {
      state.default_users = action.payload.users;
      if (window.innerWidth >= 600) {
        state.active_user = action.payload.users[0];
      }
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.active_conversation = action.payload.conversation;
    });
    builder.addCase(sendMessageApi.fulfilled, (state, action) => {
      state.active_conversation.push(action.payload.conversation);
      state.send_message.is_request_pending = false;
      if (!action.payload.conversation.group_id) {
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
      }
    });
    builder.addCase(sendMessageApi.pending, (state, action) => {
      state.send_message.is_request_pending = true;
    });
    builder.addCase(sendMessageApi.rejected, (state, action) => {
      state.send_message.is_request_pending = false;
    });
    builder.addCase(updateView.fulfilled, (state, action) => {
      const updated_conversation = action.payload.conversation;
      state.active_conversation = state.active_conversation.map(
        (conversation) => {
          if (conversation.id == updated_conversation.id) {
            return updated_conversation;
          }
          return conversation;
        }
      );
      state.default_users = state.default_users.map((user) => {
        if (user.id == updated_conversation.sender_id) {
          return {
            ...user,
            not_viewed: user.not_viewed - 1,
          };
        }
        return user;
      });
    });
    builder.addCase(fetchGroupMessagesApi.fulfilled, (state, action) => {
      state.active_conversation = action.payload.conversation;
    });
  },
});

// reducer
export default chatSlice.reducer;

// selectors
export const page = (state: RootState) => state.chat.fetch_user.page;
export const fetchedUserResult = (state: RootState) =>
  state.chat.fetch_user.fetched_user_result;
export const fetchType = (state: RootState) => state.chat.fetch_user.fetch_type;
export const isRequestPending = (state: RootState) =>
  state.chat.fetch_user.is_request_pending;
export const defaultUsers = (state: RootState) => state.chat.default_users;

export const activeUser = (state: RootState) => state.chat.active_user;

export const active_conversation = (state: RootState) =>
  state.chat.active_conversation;
export const send_message_request_pending = (state: RootState) =>
  state.chat.send_message.is_request_pending;

export const showChat = (state: RootState) => state.chat.mobile.show_chat;

export const showSearchDialog = (state: RootState) =>
  state.chat.mobile.show_search_dialog;
export const showCognimatchInviteDialog = (state: RootState) =>
  state.chat.invites_dialog.show_cognimatch_invite_dialog;
export const showPokerInviteDialog = (state: RootState) =>
  state.chat.invites_dialog.show_poker_invite_dialog;
export const activeUserStatus = (state: RootState) =>
  state.chat.active_user_status;
export const typingUser = (state: RootState) => state.chat.typing_user;

// action creator
export const {
  resetChat,
  updatePage,
  updateFetchUserResult,
  updateIsRequestPending,
  updateDefaultUser,
  updateActiveUser,
  updateActiveUserConversation,
  updateDefaultUserConversation,
  updateConversationView,
  updateTypingUser,
  updateShowChat,
  updateShowSearch,
  updateInviteDialog,
  updateActiveUserStatus,
} = chatSlice.actions;
