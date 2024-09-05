import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// types
import type { IThunkApiConfig } from "@/types/store/slice/common";
import type { RootState } from "@/store/rootReducer";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  ILoginInitialState,
  IVerifyUserNameApiRequest,
  IVerifyUserNameApiResponse,
} from "@/types/store/slice/login";
import type { User } from "@/types/user";
import type { AxiosResponse, AxiosError } from "axios";

// Axios
import axios from "axios";
import { Axios } from "@/helpers/axios";

// Cookie
import Cookies from "universal-cookie";

const cookies = new Cookies();

type LoginResponse = {
  success: boolean;
  user: User;
  token: string;
};
type RegisterArgs = {
  name: string;
  username: string;
  email: string;
  password: string;
};

type LoginArgs = {
  username?: string;
  email?: string;
  password: string;
};

export const signUpHandler = createAsyncThunk<LoginResponse, RegisterArgs>(
  "api/register",
  async (
    { name, username, email, password },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await Axios.post("/register", {
        name,
        username,
        email,
        password,
      });
      cookies.set("token", res.data.token);
      // dispatch(updateUser(res.data.user));
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const loginHandler = createAsyncThunk<LoginResponse, LoginArgs>(
  "api/register",
  async ({ username, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await Axios.post("/login", {
        username,
        email,
        password,
      });
      cookies.set("token", res.data.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
      // dispatch(updateUser(res.data.user));
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyUserNameApi = createAsyncThunk<
  IVerifyUserNameApiResponse,
  IVerifyUserNameApiRequest,
  IThunkApiConfig
>("api/verify-username", async ({ username }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IVerifyUserNameApiResponse> =
      await Axios.post("/verify-username", {
        username,
      });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      let axios_error = error as AxiosError<IVerifyUserNameApiResponse>;
      let error_message = axios_error.response?.data.message?.username[0];
      return rejectWithValue(error_message);
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const initialState: ILoginInitialState = {
  validator_error: null,
  is_typing: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateIsTyping: (state, action: PayloadAction<boolean>) => {
      state.is_typing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyUserNameApi.rejected, (state, action) => {
      state.validator_error = action.payload as string;
    });
    builder.addCase(verifyUserNameApi.fulfilled, (state) => {
      state.validator_error = null;
    });
  },
});

export default loginSlice.reducer;
export const validatorError = (state: RootState) => state.login.validator_error;
export const isTyping = (state: RootState) => state.login.is_typing;

// action  creator
export const { updateIsTyping } = loginSlice.actions;
