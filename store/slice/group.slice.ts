import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// types
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
} from "@/types/store/slice/group";
import type { AxiosResponse } from "axios";

// thunk api
import { sendMessageApi } from "@/store/slice/chat.slice";

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

const initialState: IGroupInitialState = {
  default_groups: [],
  recommended_groups: [],
  active_group: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getGroupsApi.fulfilled, (state, action) => {
      state.default_groups = action.payload.groups;
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
  },
});

export const default_groups = (state: RootState) => state.group.default_groups;
export const recommended_groups = (state: RootState) =>
  state.group.recommended_groups;
export const active_group = (state: RootState) => state.group.active_group;

export const {
  updateActiveGroup,
  updateDefaultGroupLatestConversation,
  updateDefaultGroup,
} = groupSlice.actions;

export default groupSlice.reducer;
