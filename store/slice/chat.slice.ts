import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// types
import { PayloadAction } from "@reduxjs/toolkit";
import type IChatInitialState from "@/types/store/slice/chat";
import type {
  IFetchUserResponse,
  IFetchDefaultUserResponse,
  IUsersWithConversation,
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

const initialState: IChatInitialState = {
  search_input_value: "",
  fetch_user: {
    page: 1,
    fetched_user_result: [],
    is_request_pending: false,
  },
  default_users: [],
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
export const {
  updateSearchInputValue,
  updatePage,
  updateFetchUserResult,
  updateIsRequestPending,
  updateDefaultUser,
} = chatSlice.actions;
