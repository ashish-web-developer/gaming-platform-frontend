import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// types
import { PayloadAction } from "@reduxjs/toolkit";
import type IChatInitialState from "@/types/store/slice/chat";
import type { IFetchUserResponse } from "@/types/store/slice/chat";
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
          page: state.chat.page,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data);
  }
});

const initialState: IChatInitialState = {
  search_input_value: "",
  page: 1,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateSearchInputValue: (state, action: PayloadAction<string>) => {
      state.search_input_value = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export default chatSlice.reducer;
export const search_input_value = (state: RootState) =>
  state.chat.search_input_value;
export const page = (state: RootState) => state.chat.page;
export const { updateSearchInputValue, updatePage } = chatSlice.actions;
