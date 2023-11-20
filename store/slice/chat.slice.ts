import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// types
import { PayloadAction } from "@reduxjs/toolkit";
import type IChatInitialState from "@/types/store/slice/chat";
import type { IFetchUserResponse } from "@/types/store/slice/chat";
import type { RootState } from "@/store/rootReducer";
import type { AxiosResponse } from "axios";
import type { User } from "@/types/user";

// helpers
import { Axios } from "@/helpers/axios";

// api calls
export const fetchUser = createAsyncThunk<
  IFetchUserResponse,
  undefined,
  { state: RootState }
>(
  "api/chat/search-user",
  async (_, { getState, rejectWithValue, dispatch }) => {
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
  }
);

const initialState: IChatInitialState = {
  search_input_value: "",
  fetch_user: {
    page: 1,
    fetched_user_result: [],
    is_request_pending: false,
  },
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
    updateFetchUserResult: (state, action: PayloadAction<User[]>) => {
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
export const {
  updateSearchInputValue,
  updatePage,
  updateFetchUserResult,
  updateIsRequestPending,
} = chatSlice.actions;
