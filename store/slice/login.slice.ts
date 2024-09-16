import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// types
import type { IThunkApiConfig } from "@/types/store/slice/common";
import type { RootState } from "@/store/rootReducer";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  IValidationErrorType,
  ILoginInitialState,
  IVerifyUserNameApiRequest,
  IVerifyUserNameApiResponse,
  IRegisterUserApiRequest,
  IRegisterUserApiResponse,
  IRegisterUserApiRejectValue,
  IUpdateProfileApiRequest,
  IUpdateProfileApiResponse,
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

type LoginArgs = {
  username?: string;
  email?: string;
  password: string;
};

export const registerUserApi = createAsyncThunk<
  IRegisterUserApiResponse,
  IRegisterUserApiRequest,
  IThunkApiConfig<IRegisterUserApiRejectValue>
>("api/login/register", async ({ username, password }, { rejectWithValue }) => {
  try {
    const res: AxiosResponse<IRegisterUserApiResponse> = await Axios.post(
      "/register",
      {
        username,
        password,
      }
    );
    cookies.set("token", res.data.token);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axios_error = error as AxiosError<IRegisterUserApiResponse>;
      const messages = axios_error.response?.data.message;
      if (typeof messages == "object") {
        const error: IRegisterUserApiRejectValue = [];
        for (const [key, value] of Object.entries(messages)) {
          error.push({
            type: key as "password" | "username",
            error: value[0],
          });
        }
        return rejectWithValue(error);
      } else {
        return rejectWithValue(messages as string);
      }
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const loginHandler = createAsyncThunk<LoginResponse, LoginArgs>(
  "api/login/register",
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

export const updateProfileApi = createAsyncThunk<
  IUpdateProfileApiResponse,
  IUpdateProfileApiRequest,
  IThunkApiConfig<string>
>("api/login/update-profile", async ({ form_data }, { rejectWithValue }) => {
  try {
    const res: AxiosResponse<IUpdateProfileApiResponse> = await Axios.post(
      "/user/update-profile",
      form_data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue("Internal server error");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

export const verifyUserNameApi = createAsyncThunk<
  IVerifyUserNameApiResponse,
  IVerifyUserNameApiRequest,
  IThunkApiConfig<
    | {
        error: string;
        type: IValidationErrorType;
      }
    | string
  >
>("api/login/verify-username", async ({ username }, { rejectWithValue }) => {
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
      return rejectWithValue({
        error: error_message as string,
        type: "username",
      });
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const initialState: ILoginInitialState = {
  user: null,
  validation_error_list: [],
  is_typing: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateIsTyping: (state, action: PayloadAction<boolean>) => {
      state.is_typing = action.payload;
    },
    addValidationError: (
      state,
      action: PayloadAction<{
        error: string;
        type: IValidationErrorType;
      }>
    ) => {
      state.validation_error_list.push(action.payload);
    },
    removeValidationError: (
      state,
      action: PayloadAction<{
        type: IValidationErrorType;
      }>
    ) => {
      state.validation_error_list = state.validation_error_list.filter(
        (error) => error.type !== action.payload.type
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyUserNameApi.rejected, (state, action) => {
      if (action.payload && typeof action.payload == "object") {
        state.validation_error_list.push(action.payload);
      }
    });
    builder.addCase(verifyUserNameApi.fulfilled, (state) => {
      state.validation_error_list = state.validation_error_list.filter(
        (error) => {
          return error.type !== "username";
        }
      );
    });
    builder.addCase(registerUserApi.rejected, (state, action) => {
      if (action.payload && typeof action.payload == "object") {
        state.validation_error_list = [
          ...state.validation_error_list,
          ...action.payload,
        ];
      }
    });
    builder.addCase(registerUserApi.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.validation_error_list = [];
    });
  },
});

export default loginSlice.reducer;
export const validationErrorList = (state: RootState) =>
  state.login.validation_error_list;
export const isTyping = (state: RootState) => state.login.is_typing;

// action  creator
export const { updateIsTyping, addValidationError, removeValidationError } =
  loginSlice.actions;
