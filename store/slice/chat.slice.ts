import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// types
import type { PayloadAction } from "@reduxjs/toolkit";
import type IChatInitialState from "@/types/store/slice/chat";
import type { IThunkApiConfig } from "@/types/store/slice/common";
import type {
  IConversation,
  IUsersWithConversation,
  IGroup,
  IJoinGroupPayload,
  IJoinGroupResponse,
  IFetchUserResponse,
  IFetchUserPayload,
  IFetchDefaultUserResponse,
  IFetchMessagesResponse,
  IUpdateViewRequest,
  IUpdateViewResponse,
  ISendInvitationApiRequest,
  ISendInvitationApiResponse,
  IAcceptInvitationApiRequest,
  IAcceptInvitationApiResponse,
  IGetGroupResponse,
  IGetGroupRecommendationResponse,
  ICreateGroupPayload,
  ICreateGroupResponse,
  INotificationResponse,
  IRemoveNotificationPayload,
  IRemoveNotificationResponse,
  ISendMessagePayload,
  ISendMessageResponse,
  INotification,
} from "@/types/store/slice/chat";
import type { RootState } from "@/store/rootReducer";
import type { AxiosResponse } from "axios";

// helpers
import { Axios } from "@/helpers/axios";

// api calls
export const fetchUserApi = createAsyncThunk<
  IFetchUserResponse & {
    fetch_type: "chat" | "group";
  },
  IFetchUserPayload,
  { state: RootState }
>(
  "api/chat/search-user",
  async ({ fetch_type, query }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response: AxiosResponse<IFetchUserResponse> = await Axios.post(
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
      return { fetch_type, ...response.data };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

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

export const fetchGroupMessagesApi = createAsyncThunk<
  {
    success: boolean;
    error: any;
    conversation: IConversation[];
  },
  undefined,
  {
    state: RootState;
  }
>("api/chat/get-group-messages", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const response: AxiosResponse<{
      success: boolean;
      error: any;
      conversation: IConversation[];
    }> = await Axios.post("/chat/get-group-messages", {
      group_id: state.chat.active_group?.id,
    });
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
>("api/game/invitation", async ({ game }, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const response: AxiosResponse<ISendInvitationApiResponse> =
      await Axios.post("game/game-invitation", {
        receiver_id: state.chat.active_user?.id,
        game,
        room_id: state.game.room_id,
      });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const getGroupsApi = createAsyncThunk<
  IGetGroupResponse,
  undefined,
  IThunkApiConfig
>("api/chat/get-group", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response: AxiosResponse<IGetGroupResponse> = await Axios.post(
      "/chat/get-group"
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const getGroupRecommendationApi = createAsyncThunk<
  IGetGroupRecommendationResponse,
  undefined,
  IThunkApiConfig
>("api/chat/group-recommendation", async (_, { getState, rejectWithValue }) => {
  try {
    const response: AxiosResponse<IGetGroupRecommendationResponse> =
      await Axios.get("/chat/group-recommendation");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});
export const joinGroupApi = createAsyncThunk<
  IJoinGroupResponse & {
    notification_id?: string;
  },
  IJoinGroupPayload,
  IThunkApiConfig
>(
  "api/chat/join-group",
  async ({ notification_id, group_id }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IJoinGroupResponse> = await Axios.post(
        "/chat/join-group",
        {
          notification_id,
          group_id,
        }
      );
      return {
        ...response.data,
        ...(notification_id
          ? {
              notification_id,
            }
          : {}),
      };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const acceptInvitationApi = createAsyncThunk<
  IAcceptInvitationApiResponse,
  IAcceptInvitationApiRequest,
  { state: RootState }
>(
  "api/game/accept-invitation",
  async ({ is_accepted }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response: AxiosResponse<IAcceptInvitationApiResponse> =
        await Axios.post("game/accept-invitation", {
          receiver_id: state.game.gaming_user?.id,
          is_accepted,
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
>(
  "api/chat/send-message",
  async ({ message }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response: AxiosResponse<ISendMessageResponse> = await Axios.post(
        "/chat/send-message",
        {
          sender_id: state.user.user.id,
          message,
          ...(state.chat.active_group
            ? {
                group_id: state.chat.active_group.id,
              }
            : {
                receiver_id: state.chat.active_user?.id,
              }),
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createGroupApi = createAsyncThunk<
  ICreateGroupResponse,
  ICreateGroupPayload,
  IThunkApiConfig
>(
  "api/chat/create-group",
  async ({ user_ids, group_name }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<ICreateGroupResponse> = await Axios.post(
        "/chat/create-group",
        null,
        {
          params: {
            group_name,
            group_users: user_ids,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getNotificationApi = createAsyncThunk<
  INotificationResponse,
  undefined,
  IThunkApiConfig
>("api/chat/get-notification", async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<INotificationResponse> = await Axios.get(
      "/chat/get-notification"
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});
export const removeNotificationApi = createAsyncThunk<
  IRemoveNotificationResponse & {
    notification_id: string;
  },
  IRemoveNotificationPayload,
  IThunkApiConfig
>(
  "api/chat/remove-notification",
  async ({ notification_id }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IRemoveNotificationResponse> =
        await Axios.post("/chat/remove-notification", {
          notification_id,
        });
      return {
        ...response.data,
        notification_id,
      };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState: IChatInitialState = {
  is_typing: false,
  fetch_user: {
    page: 1,
    fetched_user_result: [],
    fetch_type: null,
    is_request_pending: false,
  },
  notifications: [],
  default_users: [],
  default_groups: [],
  recommended_groups: [],
  active_user: null,
  active_group: null,
  active_conversation: [],
  send_message: {
    is_request_pending: false,
  },
  game_snackbar: {
    show_memory_game_snackbar: false,
  },
  mobile: {
    show_chat: false,
  },
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
    updateDefaultUser: (
      state,
      action: PayloadAction<IUsersWithConversation>
    ) => {
      state.default_users.push(action.payload);
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
        user: IUsersWithConversation;
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
    updateDefaultGroupLatestConversation: (
      state,
      action: PayloadAction<IConversation>
    ) => {
      state.default_groups = state.default_groups.map((group) => {
        if (group.id == action.payload.group_id) {
          return {
            ...group,
            latest_conversation: action.payload,
          };
        }
        return group;
      });
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
    updateIsTyping: (state, action: PayloadAction<boolean>) => {
      state.is_typing = action.payload;
    },
    updateShowMemoryGameSnackbar: (state, action: PayloadAction<boolean>) => {
      state.game_snackbar.show_memory_game_snackbar = action.payload;
    },
    updateShowChat: (state, action: PayloadAction<boolean>) => {
      state.mobile.show_chat = action.payload;
    },
    updateActiveGroup: (state, action: PayloadAction<IGroup | null>) => {
      state.active_group = action.payload;
    },
    updateNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications.push(action.payload);
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
      if (action.payload.conversation.group_id) {
        state.default_groups = state.default_groups.map((group) => {
          if (group.id == action.payload.conversation.group_id) {
            return {
              ...group,
              latest_conversation: action.payload.conversation,
            };
          }
          return group;
        });
      } else {
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
    builder.addCase(getGroupsApi.fulfilled, (state, action) => {
      state.default_groups = action.payload.groups;
    });
    builder.addCase(getGroupRecommendationApi.fulfilled, (state, action) => {
      state.recommended_groups = action.payload.groups;
    });
    builder.addCase(fetchGroupMessagesApi.fulfilled, (state, action) => {
      state.active_conversation = action.payload.conversation;
    });
    builder.addCase(getNotificationApi.fulfilled, (state, action) => {
      state.notifications = action.payload.notifications;
    });
    builder.addCase(joinGroupApi.fulfilled, (state, action) => {
      if (action.payload.notification_id) {
        state.notifications = state.notifications.filter(
          (notification) => notification.id !== action.payload.notification_id
        );
      }
      state.default_groups.push(action.payload.group);
      state.recommended_groups = state.recommended_groups.filter(
        (group) => group.id !== action.payload.group.id
      );
    });
    builder.addCase(removeNotificationApi.fulfilled, (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.notification_id
      );
    });
  },
});

export default chatSlice.reducer;
export const page = (state: RootState) => state.chat.fetch_user.page;
export const fetched_user_result = (state: RootState) =>
  state.chat.fetch_user.fetched_user_result;
export const fetch_type = (state: RootState) =>
  state.chat.fetch_user.fetch_type;
export const is_request_pending = (state: RootState) =>
  state.chat.fetch_user.is_request_pending;
export const default_users = (state: RootState) => state.chat.default_users;
export const default_groups = (state: RootState) => state.chat.default_groups;

export const active_user = (state: RootState) => state.chat.active_user;

export const active_conversation = (state: RootState) =>
  state.chat.active_conversation;
export const send_message_request_pending = (state: RootState) =>
  state.chat.send_message.is_request_pending;

export const is_typing = (state: RootState) => state.chat.is_typing;
export const show_memory_game_snackbar = (state: RootState) =>
  state.chat.game_snackbar.show_memory_game_snackbar;
export const show_chat = (state: RootState) => state.chat.mobile.show_chat;
export const active_group = (state: RootState) => state.chat.active_group;
export const recommended_groups = (state: RootState) =>
  state.chat.recommended_groups;

export const notifications = (state: RootState) => state.chat.notifications;

export const {
  resetChat,
  updatePage,
  updateFetchUserResult,
  updateIsRequestPending,
  updateDefaultUser,
  updateActiveUser,
  updateActiveUserConversation,
  updateDefaultUserConversation,
  updateDefaultGroupLatestConversation,
  updateConversationView,
  updateIsTyping,
  updateShowMemoryGameSnackbar,
  updateShowChat,
  updateActiveGroup,
  updateNotification,
} = chatSlice.actions;
