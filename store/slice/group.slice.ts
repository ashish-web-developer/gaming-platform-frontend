import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// types
import type { IUser } from "@/types/store/slice/login";
import type { IConversation } from "@/types/store/slice/chat";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/rootReducer";
import type { IThunkApiConfig } from "@/types/store/slice/common";
import type IGroupInitialState from "@/types/store/slice/group";
import type {
  IGroup,
  IGetGroupsResponse,
  IGetGroupRecommendationResponse,
  IJoinGroupPayload,
  IJoinGroupResponse,
  IJoinRequestPayload,
  IJoinRequestResponse,
  IGroupCreationApiPayload,
  IGroupCreationApiResponse,
  IGroupAccessApiPayload,
  IGroupAccessApiResponse,
  IFetchGroupApiPayload,
  IFetchGroupApiResponse,
} from "@/types/store/slice/group";
import type { AxiosResponse } from "axios";

// thunk api
import { sendMessageApi, fetchDefaultUser } from "@/store/slice/chat.slice";

// helpers
import { Axios } from "@/helpers/axios";

/**
 * ========================= API ===========================
 */

export const getGroupsApi = createAsyncThunk<
  IGetGroupsResponse,
  undefined,
  IThunkApiConfig
>("api/chat/get-group", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response: AxiosResponse<IGetGroupsResponse> = await Axios.get(
      "/group/get-group"
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
>(
  "api/group/group-recommendation",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response: AxiosResponse<IGetGroupRecommendationResponse> =
        await Axios.get("/group/group-recommendation");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const joinGroupApi = createAsyncThunk<
  IJoinGroupResponse & {
    notification_id?: string;
  },
  IJoinGroupPayload,
  IThunkApiConfig
>(
  "api/group/join-group",
  async ({ notification_id, group_id }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IJoinGroupResponse> = await Axios.post(
        "/group/join-group",
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

export const joinGroupRequestApi = createAsyncThunk<
  IJoinRequestResponse & {
    group_id: number;
  },
  IJoinRequestPayload,
  IThunkApiConfig
>("api/group/join-request", async ({ group_id }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IJoinRequestResponse> = await Axios.post(
      "/group/join-request",
      {
        group_id,
      }
    );
    return {
      ...response.data,
      group_id,
    };
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
>("api/group/get-group-messages", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const response: AxiosResponse<{
      success: boolean;
      error: any;
      conversation: IConversation[];
    }> = await Axios.post("/group/get-group-messages", {
      group_id: state.group.active_group?.id,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

export const giveGroupAccess = createAsyncThunk<
  IGroupAccessApiResponse & {
    notification_id?: string;
  },
  IGroupAccessApiPayload,
  IThunkApiConfig
>(
  "api/group/group-access",
  async ({ user_id, group_id, notification_id }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IGroupAccessApiResponse> = await Axios.post(
        "/group/group-access",
        {
          user_id,
          group_id,
          notification_id,
        }
      );
      return {
        ...response.data,
        notification_id,
      };
    } catch (error: any) {
      return rejectWithValue(error.response.error);
    }
  }
);

export const createGroupApi = createAsyncThunk<
  IGroupCreationApiResponse,
  IGroupCreationApiPayload,
  IThunkApiConfig
>(
  "api/group/create-group",
  async ({ user_ids, group_name }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IGroupCreationApiResponse> =
        await Axios.post("/group/create-group", null, {
          params: {
            group_name,
            group_users: user_ids,
          },
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchGroupApi = createAsyncThunk<
  IFetchGroupApiResponse,
  IFetchGroupApiPayload,
  IThunkApiConfig
>(
  "api/group/group-search",
  async ({ query }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const response: AxiosResponse<IFetchGroupApiResponse> = await Axios.post(
        "/group/group-search",
        null,
        {
          params: {
            query,
            page: state.group.fetch_group.page,
            skip_ids: state.group.default_groups.map((group) => group.id),
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState: IGroupInitialState = {
  default_groups: [],
  recommended_groups: [],
  active_group: null,
  is_active_user_exist: true,
  show_group_search: false,
  fetch_group: {
    page: 1,
    fetched_group_results: [],
    is_request_pending: false,
  },
  typing_users: [],
};
const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    updateActiveGroup: (state, action: PayloadAction<IGroup | null>) => {
      state.active_group = action.payload;
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
    updateDefaultGroup: (state, action: PayloadAction<IGroup>) => {
      state.default_groups.push(action.payload);
    },
    updateGroupsUsers: (state, action: PayloadAction<IGroup>) => {
      state.default_groups = state.default_groups.map((group) => {
        if (group.id == action.payload.id) {
          return action.payload;
        }
        return group;
      });
    },
    updateShowGroupSearch: (state, action: PayloadAction<boolean>) => {
      state.show_group_search = action.payload;
    },
    updateFetchedGroupResult: (state, action: PayloadAction<IGroup[]>) => {
      state.fetch_group.fetched_group_results = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.fetch_group.page = action.payload;
    },
    updateTypingUsers: (
      state,
      action: PayloadAction<{
        user: IUser;
        action_type: "add" | "remove";
      }>
    ) => {
      if (
        action.payload.action_type == "add" &&
        !state.typing_users.some((user) => user.id == action.payload.user.id)
      ) {
        state.typing_users.push(action.payload.user);
      } else if (action.payload.action_type == "remove") {
        state.typing_users = state.typing_users.filter(
          (user) => user.id !== action.payload.user.id
        );
      }
    },
    resetTypingUsers: (state) => {
      state.typing_users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGroupsApi.fulfilled, (state, action) => {
      state.default_groups = action.payload.groups;
      if (!state.is_active_user_exist) {
        state.active_group = action.payload.groups[0];
      }
    });
    builder.addCase(getGroupRecommendationApi.fulfilled, (state, action) => {
      state.recommended_groups = action.payload.groups;
    });
    builder.addCase(joinGroupApi.fulfilled, (state, action) => {
      state.default_groups.push(action.payload.group);
      state.recommended_groups = state.recommended_groups.filter(
        (group) => group.id !== action.payload.group.id
      );
    });
    builder.addCase(joinGroupRequestApi.fulfilled, (state, action) => {
      state.recommended_groups = state.recommended_groups.filter((group) => {
        return group.id !== action.payload.group_id;
      });
      if (state.fetch_group.fetched_group_results.length) {
        state.fetch_group.fetched_group_results =
          state.fetch_group.fetched_group_results.filter(
            (group) => group.id !== action.payload.group_id
          );
      }
    });
    builder.addCase(sendMessageApi.fulfilled, (state, action) => {
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
      }
    });
    builder.addCase(createGroupApi.fulfilled, (state, action) => {
      state.default_groups.push(action.payload.group);
    });
    builder.addCase(fetchDefaultUser.fulfilled, (state, action) => {
      if (action.payload.users.length) {
        state.is_active_user_exist = true;
      } else {
        state.is_active_user_exist = false;
      }
    });
    builder.addCase(fetchGroupApi.fulfilled, (state, action) => {
      state.fetch_group.fetched_group_results = [
        ...state.fetch_group.fetched_group_results,
        ...action.payload.group.data,
      ];
      state.fetch_group.page = state.fetch_group.page + 1;
      state.fetch_group.is_request_pending = false;
    });
    builder.addCase(fetchGroupApi.pending, (state, action) => {
      state.fetch_group.is_request_pending = true;
    });
    builder.addCase(fetchGroupApi.rejected, (state, action) => {
      state.fetch_group.is_request_pending = false;
    });
    builder.addCase(giveGroupAccess.fulfilled, (state, action) => {
      state.default_groups = state.default_groups.map((group) => {
        if (group.id == action.payload.group.id) {
          return action.payload.group;
        }
        return group;
      });
    });
  },
});
// reducer
export default groupSlice.reducer;

// selectors
export const defaultGroups = (state: RootState) => state.group.default_groups;
export const recommendedGroups = (state: RootState) =>
  state.group.recommended_groups;
export const activeGroup = (state: RootState) => state.group.active_group;
export const is_active_user_exist = (state: RootState) =>
  state.group.is_active_user_exist;
export const showGroupSearch = (state: RootState) =>
  state.group.show_group_search;
export const isFetchGroupRequestPending = (state: RootState) =>
  state.group.fetch_group.is_request_pending;
export const fetchedGroupResults = (state: RootState) =>
  state.group.fetch_group.fetched_group_results;
export const typingUsers = (state: RootState) => state.group.typing_users;

// action creator
export const {
  updateActiveGroup,
  updateDefaultGroupLatestConversation,
  updateDefaultGroup,
  updateGroupsUsers,
  updateShowGroupSearch,
  updateFetchedGroupResult,
  updatePage,
  updateTypingUsers,
  resetTypingUsers,
} = groupSlice.actions;
